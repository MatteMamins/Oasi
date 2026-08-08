import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/** Max body size accepted by POST /api/lead (bytes). */
export const MAX_BODY_BYTES = 20 * 1024; // 20 KB

/** Max length per string field (chars). */
export const FIELD_LIMITS = {
  nome: 100,
  email: 254,
  telefono: 40,
  localita: 200,
  tipologia: 100,
  metratura: 50,
  posti_letto: 50,
  spazi_esterni: 100,
  caratteristiche: 500,
  ruolo: 100,
  portfolio: 500,
  tipo: 32,
} as const;

export type LimitedField = keyof typeof FIELD_LIMITS;

/** 5 submissions per IP every 10 minutes. */
const WINDOW = "10 m";
const MAX_REQUESTS = 5;

let ratelimit: Ratelimit | null | undefined;

/**
 * Lazy-init Upstash rate limiter.
 * Returns null when Redis env is missing (local dev / preview without secrets).
 */
function getRatelimit(): Ratelimit | null {
  if (ratelimit !== undefined) return ratelimit;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    ratelimit = null;
    return null;
  }

  ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS, WINDOW),
    analytics: false,
    prefix: "oasi:lead",
  });
  return ratelimit;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

/**
 * Short non-reversible-ish fingerprint for logs (not a security hash).
 * Avoids writing raw IPs next to operational events when not needed.
 */
export function ipFingerprint(ip: string): string {
  let h = 0;
  for (let i = 0; i < ip.length; i++) {
    h = (Math.imul(31, h) + ip.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export type RateLimitResult =
  | { ok: true; limited: false; skipped: boolean }
  | { ok: false; limited: true; skipped: false };

export async function checkLeadRateLimit(ip: string): Promise<RateLimitResult> {
  const rl = getRatelimit();
  if (!rl) {
    return { ok: true, limited: false, skipped: true };
  }

  const { success } = await rl.limit(ip);
  if (!success) {
    return { ok: false, limited: true, skipped: false };
  }
  return { ok: true, limited: false, skipped: false };
}

/** Trim and enforce max length; empty → undefined. */
export function clipField(
  value: string | undefined,
  max: number,
): string | undefined {
  if (value == null) return undefined;
  const t = value.trim();
  if (!t) return undefined;
  return t.length > max ? t.slice(0, max) : t;
}

/**
 * Validate optional string fields against max lengths.
 * Required fields (nome/email/telefono) are checked separately after clip.
 */
export function fieldLengthErrors(
  fields: Partial<Record<LimitedField, string | undefined>>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const [key, max] of Object.entries(FIELD_LIMITS) as [
    LimitedField,
    number,
  ][]) {
    const raw = fields[key];
    if (raw != null && raw.trim().length > max) {
      errors[key] = "Valore troppo lungo.";
    }
  }
  return errors;
}

/** Ops-safe lead event: no nome / email / telefono / userAgent. */
export function logLeadEvent(
  event: string,
  data: Record<string, unknown> = {},
): void {
  console.log(
    "[LEAD]",
    JSON.stringify({
      event,
      at: new Date().toISOString(),
      ...data,
    }),
  );
}

export function logLeadError(
  event: string,
  data: Record<string, unknown> = {},
): void {
  console.error(
    "[LEAD]",
    JSON.stringify({
      event,
      at: new Date().toISOString(),
      ...data,
    }),
  );
}
