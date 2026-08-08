import { NextResponse } from "next/server";
import {
  MAX_BODY_BYTES,
  FIELD_LIMITS,
  checkLeadRateLimit,
  clipField,
  fieldLengthErrors,
  getClientIp,
  ipFingerprint,
  logLeadError,
  logLeadEvent,
} from "@/lib/lead-security";

export const runtime = "nodejs";

type LeadPayload = {
  // "proprietario" (default) o "partner"
  tipo?: string;
  nome?: string;
  email?: string;
  telefono?: string;
  // risposte del percorso di valutazione (proprietari)
  localita?: string;
  tipologia?: string;
  metratura?: string;
  posti_letto?: string;
  spazi_esterni?: string;
  caratteristiche?: string;
  // risposte del percorso partner
  ruolo?: string;
  portfolio?: string;
  privacy?: boolean;
  // honeypot anti-spam
  website?: string;
  // tracking campagne
  utm?: Record<string, string>;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeUtm(
  raw: Record<string, string> | undefined,
): Record<string, string> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof k !== "string" || typeof v !== "string") continue;
    if (k.length > 64 || v.length > 256) continue;
    // solo chiavi alfanumeriche / underscore (utm_*, gclid, fbclid, …)
    if (!/^[a-zA-Z0-9_]{1,64}$/.test(k)) continue;
    out[k] = v.trim().slice(0, 256);
  }
  return out;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const ipTag = ipFingerprint(ip);

  // ── body size ─────────────────────────────────────────────────────────
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    logLeadEvent("rejected_body_size", { ip: ipTag });
    return NextResponse.json(
      { ok: false, error: "Richiesta troppo grande." },
      { status: 413 },
    );
  }

  // ── rate limit ────────────────────────────────────────────────────────
  try {
    const rl = await checkLeadRateLimit(ip);
    if (!rl.ok) {
      logLeadEvent("rate_limited", { ip: ipTag });
      return NextResponse.json(
        {
          ok: false,
          error: "Troppe richieste. Riprova tra qualche minuto.",
        },
        { status: 429 },
      );
    }
    if (rl.skipped) {
      // Solo in ambienti senza Upstash (es. dev locale): non bloccare.
      // In produzione va configurato UPSTASH_REDIS_REST_*.
    }
  } catch (err) {
    // Fail-open: se Redis è giù non perdiamo lead; loggiamo l'anomalia.
    logLeadError("rate_limit_error", {
      ip: ipTag,
      message: err instanceof Error ? err.message : "unknown",
    });
  }

  let body: LeadPayload;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      logLeadEvent("rejected_body_size", { ip: ipTag });
      return NextResponse.json(
        { ok: false, error: "Richiesta troppo grande." },
        { status: 413 },
      );
    }
    body = JSON.parse(text) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Richiesta non valida." },
      { status: 400 },
    );
  }

  // Honeypot: se compilato, è un bot. Rispondiamo ok senza fare nulla.
  if (body.website) {
    logLeadEvent("honeypot", { ip: ipTag });
    return NextResponse.json({ ok: true });
  }

  // ── max length (prima di accettare) ───────────────────────────────────
  const lengthErrors = fieldLengthErrors({
    nome: body.nome,
    email: body.email,
    telefono: body.telefono,
    localita: body.localita,
    tipologia: body.tipologia,
    metratura: body.metratura,
    posti_letto: body.posti_letto,
    spazi_esterni: body.spazi_esterni,
    caratteristiche: body.caratteristiche,
    ruolo: body.ruolo,
    portfolio: body.portfolio,
    tipo: body.tipo,
  });
  if (Object.keys(lengthErrors).length > 0) {
    logLeadEvent("rejected_field_length", { ip: ipTag });
    return NextResponse.json({ ok: false, errors: lengthErrors }, { status: 422 });
  }

  const nome = clipField(body.nome, FIELD_LIMITS.nome);
  const email = clipField(body.email, FIELD_LIMITS.email);
  const telefono = clipField(body.telefono, FIELD_LIMITS.telefono);

  const errors: Record<string, string> = {};
  if (!nome || nome.length < 2) errors.nome = "Inserisci il tuo nome.";
  if (!email || !emailRe.test(email)) errors.email = "Inserisci un'email valida.";
  if (!telefono || telefono.replace(/\D/g, "").length < 6)
    errors.telefono = "Inserisci un numero di telefono.";
  if (!body.privacy)
    errors.privacy = "Conferma di aver letto l'informativa privacy.";

  if (Object.keys(errors).length > 0) {
    logLeadEvent("validation_failed", {
      ip: ipTag,
      fields: Object.keys(errors),
    });
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const tipo = body.tipo === "partner" ? "partner" : "proprietario";
  const utm = sanitizeUtm(body.utm);

  // Payload completo: solo in memoria / verso webhook — mai nei log.
  const lead = {
    receivedAt: new Date().toISOString(),
    tipo,
    ruolo: clipField(body.ruolo, FIELD_LIMITS.ruolo) || null,
    portfolio: clipField(body.portfolio, FIELD_LIMITS.portfolio) || null,
    nome,
    email,
    telefono,
    localita: clipField(body.localita, FIELD_LIMITS.localita) || null,
    tipologia: clipField(body.tipologia, FIELD_LIMITS.tipologia) || null,
    metratura: clipField(body.metratura, FIELD_LIMITS.metratura) || null,
    posti_letto: clipField(body.posti_letto, FIELD_LIMITS.posti_letto) || null,
    spazi_esterni:
      clipField(body.spazi_esterni, FIELD_LIMITS.spazi_esterni) || null,
    caratteristiche:
      clipField(body.caratteristiche, FIELD_LIMITS.caratteristiche) || null,
    utm,
  };

  // Log ops-safe: nessuna PII (nome, email, telefono, UA).
  logLeadEvent("accepted", {
    ip: ipTag,
    tipo,
    hasUtm: Object.keys(utm).length > 0,
    utm_source: utm.utm_source ?? null,
    localita: lead.localita,
  });

  // ── DOVE ARRIVANO I LEAD ──────────────────────────────────────────────
  // Per ora, se impostata, inoltro al webhook. Persistenza dedicata: dopo.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        logLeadError("forward_http_error", {
          ip: ipTag,
          status: res.status,
        });
      } else {
        logLeadEvent("forwarded", { ip: ipTag });
      }
    } catch (err) {
      // Non blocchiamo l'utente se il forward fallisce (pipeline da rafforzare).
      logLeadError("forward_failed", {
        ip: ipTag,
        message: err instanceof Error ? err.message : "unknown",
      });
    }
  }

  return NextResponse.json({ ok: true });
}
