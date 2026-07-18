import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Richiesta non valida." }, { status: 400 });
  }

  // Honeypot: se compilato, è un bot. Rispondiamo ok senza fare nulla.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  if (!body.nome || body.nome.trim().length < 2) errors.nome = "Inserisci il tuo nome.";
  if (!body.email || !emailRe.test(body.email)) errors.email = "Inserisci un'email valida.";
  if (!body.telefono || body.telefono.replace(/\D/g, "").length < 6)
    errors.telefono = "Inserisci un numero di telefono.";
  if (!body.privacy) errors.privacy = "È necessario accettare l'informativa.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    tipo: body.tipo === "partner" ? "partner" : "proprietario",
    ruolo: body.ruolo || null,
    portfolio: body.portfolio || null,
    nome: body.nome?.trim(),
    email: body.email?.trim(),
    telefono: body.telefono?.trim(),
    localita: body.localita?.trim() || null,
    tipologia: body.tipologia || null,
    metratura: body.metratura || null,
    posti_letto: body.posti_letto || null,
    spazi_esterni: body.spazi_esterni || null,
    caratteristiche: body.caratteristiche?.trim() || null,
    utm: body.utm ?? {},
    userAgent: request.headers.get("user-agent"),
  };

  // ── DOVE ARRIVANO I LEAD ──────────────────────────────────────────────
  // Per ora il lead viene registrato nei log del server. Quando definirai
  // il canale (email, Formspree, HubSpot, Notion, Google Sheet…), collega
  // qui l'invio. Esempi:
  //   • Email:     await sendEmail(process.env.LEAD_TO, lead)
  //   • Webhook:   await fetch(process.env.LEAD_WEBHOOK_URL, { method: "POST", body: JSON.stringify(lead) })
  //   • CRM:       await crm.contacts.create(lead)
  console.log("[LEAD]", JSON.stringify(lead));

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      // Non blocchiamo l'utente se il forward fallisce: il lead è già nei log.
      console.error("[LEAD] forward fallito:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
