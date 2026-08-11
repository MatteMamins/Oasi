"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { IconArrow, IconCheck } from "@/components/ui/icons";

const STORAGE_KEY = "oasi-partner-form";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

/* 16px sotto `sm` non è estetica: sotto quella soglia Safari iOS zooma la
   pagina al focus del campo e non torna più indietro. */
const field =
  "w-full rounded-sm border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-forest sm:text-[0.95rem]";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";
const cardChrome =
  "rounded-sm border border-line bg-stone shadow-[0_24px_48px_-40px_rgba(16,61,48,0.22)] ring-1 ring-forest/5";

export function PartnerForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const utm = useRef<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) captured[key] = value;
    });
    if (document.referrer) captured.referrer = document.referrer;
    captured.landing_path = window.location.pathname;
    utm.current = captured;

    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved && formRef.current) {
        const values = JSON.parse(saved) as Record<string, string>;
        Object.entries(values).forEach(([name, value]) => {
          const control = formRef.current?.elements.namedItem(name);
          if (
            control instanceof HTMLInputElement ||
            control instanceof HTMLSelectElement
          ) {
            control.value = value;
          }
        });
      }
    } catch {
      // Storage non disponibile o dati corrotti: il form resta utilizzabile.
    }

    const syncRole = (event: Event) => {
      const role = (event as CustomEvent<string>).detail;
      const control = formRef.current?.elements.namedItem("ruolo");
      if (!(control instanceof HTMLSelectElement)) return;
      control.value = role;
      saveDraft();
      window.setTimeout(() => control.focus(), 350);
    };
    window.addEventListener("oasi:partner-role", syncRole);
    return () => window.removeEventListener("oasi:partner-role", syncRole);
  }, []);

  useEffect(() => {
    if (status !== "done") return;
    resultRef.current?.scrollIntoView({ block: "center" });
    resultRef.current?.focus();
  }, [status]);

  function saveDraft() {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ruolo: String(data.get("ruolo") ?? ""),
          localita: String(data.get("localita") ?? ""),
          nome: String(data.get("nome") ?? ""),
          email: String(data.get("email") ?? ""),
          telefono: String(data.get("telefono") ?? ""),
        }),
      );
    } catch {
      // Il salvataggio è un miglioramento progressivo, non un requisito.
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});

    const data = new FormData(event.currentTarget);
    const payload = {
      tipo: "partner",
      ruolo: String(data.get("ruolo") ?? ""),
      localita: String(data.get("localita") ?? ""),
      nome: String(data.get("nome") ?? ""),
      email: String(data.get("email") ?? ""),
      telefono: String(data.get("telefono") ?? ""),
      portfolio: "",
      privacy: data.get("privacy") === "on",
      website: String(data.get("website") ?? ""),
      utm: utm.current,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 429) {
          setErrors({
            form:
              typeof responseData.error === "string"
                ? responseData.error
                : "Troppe richieste. Riprova tra qualche minuto.",
          });
        } else {
          setErrors(
            responseData.errors ?? {
              form:
                typeof responseData.error === "string"
                  ? responseData.error
                  : "Si è verificato un errore. Riprova.",
            },
          );
        }
        setStatus("error");
        return;
      }

      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {}
      setStatus("done");
    } catch {
      setErrors({ form: "Connessione non riuscita. Riprova tra poco." });
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        ref={resultRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className={`flex flex-col items-center px-6 py-14 text-center ${cardChrome}`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-paper ring-1 ring-brass/30">
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="font-display mt-5 text-2xl text-ink">
          Richiesta ricevuta
        </h3>
        <p className="mt-2 max-w-sm text-muted">
          Useremo i recapiti indicati per conoscerci e approfondire il tuo
          contesto professionale.
        </p>
        <a href="#benefici" className="btn btn-ghost mt-6">
          Rivedi i benefici
          <IconArrow className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onChange={saveDraft}
      aria-busy={status === "sending"}
      className={`grid gap-5 p-6 text-ink sm:p-8 lg:p-10 ${cardChrome}`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="partner-ruolo" className={labelCls}>
            Professione
          </label>
          <select
            id="partner-ruolo"
            name="ruolo"
            required
            defaultValue=""
            className={field}
            aria-invalid={Boolean(errors.ruolo)}
            aria-describedby={errors.ruolo ? "partner-ruolo-error" : undefined}
          >
            <option value="" disabled>
              Seleziona il tuo profilo
            </option>
            <option>Property manager</option>
            <option>Agenzia immobiliare</option>
            <option>Agente o segnalatore</option>
            <option>Altro professionista</option>
          </select>
          {errors.ruolo && (
            <FieldError id="partner-ruolo-error">{errors.ruolo}</FieldError>
          )}
        </div>
        <div>
          <label htmlFor="partner-localita" className={labelCls}>
            Zona operativa
          </label>
          <input
            id="partner-localita"
            name="localita"
            required
            className={field}
            placeholder="Es. Torino e provincia"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.localita)}
            aria-describedby={
              errors.localita ? "partner-localita-error" : undefined
            }
          />
          {errors.localita && (
            <FieldError id="partner-localita-error">
              {errors.localita}
            </FieldError>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="partner-nome" className={labelCls}>
          Nome e cognome
        </label>
        <input
          id="partner-nome"
          name="nome"
          required
          className={field}
          placeholder="Mario Rossi"
          autoComplete="name"
          aria-invalid={Boolean(errors.nome)}
          aria-describedby={errors.nome ? "partner-nome-error" : undefined}
        />
        {errors.nome && (
          <FieldError id="partner-nome-error">{errors.nome}</FieldError>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="partner-email" className={labelCls}>
            Email
          </label>
          <input
            id="partner-email"
            name="email"
            type="email"
            inputMode="email"
            required
            className={field}
            placeholder="mario@email.it"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "partner-email-error" : undefined}
          />
          {errors.email && (
            <FieldError id="partner-email-error">{errors.email}</FieldError>
          )}
        </div>
        <div>
          <label htmlFor="partner-telefono" className={labelCls}>
            Telefono
          </label>
          <input
            id="partner-telefono"
            name="telefono"
            type="tel"
            inputMode="tel"
            required
            className={field}
            placeholder="+39 333 123 4567"
            autoComplete="tel"
            aria-invalid={Boolean(errors.telefono)}
            aria-describedby={
              errors.telefono ? "partner-telefono-error" : undefined
            }
          />
          {errors.telefono && (
            <FieldError id="partner-telefono-error">
              {errors.telefono}
            </FieldError>
          )}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Non compilare
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          name="privacy"
          required
          aria-invalid={Boolean(errors.privacy)}
          aria-describedby={errors.privacy ? "partner-privacy-error" : undefined}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-forest)]"
        />
        <span>
          Ho letto l&apos;{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-forest underline underline-offset-2 hover:text-brass-ink"
          >
            informativa privacy
          </Link>
          .
        </span>
      </label>
      {errors.privacy && (
        <FieldError id="partner-privacy-error">{errors.privacy}</FieldError>
      )}

      {errors.form && (
        <p
          role="alert"
          className="rounded-sm border border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700"
        >
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-brass mt-1 w-full disabled:opacity-70"
      >
        {status === "sending"
          ? "Invio in corso…"
          : "Valutiamo una collaborazione"}
        {status !== "sending" && <IconArrow className="h-4 w-4" />}
      </button>
      <p className="text-center text-xs text-muted">
        Nessun costo, nessun impegno.
      </p>
    </form>
  );
}

function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {children}
    </p>
  );
}
