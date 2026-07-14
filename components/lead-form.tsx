"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconCheck, IconArrow } from "./icons";

const objectives = [
  "Aumentare la redditività",
  "Delegare completamente la gestione",
  "Migliorare qualità e recensioni",
  "Ricevere supporto burocratico e fiscale",
  "Gestire più immobili",
];

const unitOptions = ["1", "2", "3–5", "6+"];
const typeOptions = [
  "Appartamento",
  "Bilocale / Trilocale",
  "Casa indipendente",
  "Attico / Loft",
  "Altro",
];

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

const field =
  "w-full rounded-sm border border-line bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-forest";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const utm = useRef<Record<string, string>>({});

  // Cattura i parametri della campagna al primo caricamento
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) captured[k] = v;
    });
    if (document.referrer) captured.referrer = document.referrer;
    captured.landing_path = window.location.pathname;
    utm.current = captured;
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const payload = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefono: String(fd.get("telefono") ?? ""),
      localita: String(fd.get("localita") ?? ""),
      immobili: String(fd.get("immobili") ?? ""),
      tipologia: String(fd.get("tipologia") ?? ""),
      obiettivo: String(fd.get("obiettivo") ?? ""),
      messaggio: String(fd.get("messaggio") ?? ""),
      privacy: fd.get("privacy") === "on",
      website: String(fd.get("website") ?? ""),
      utm: utm.current,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors ?? { form: "Si è verificato un errore. Riprova." });
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setErrors({ form: "Connessione non riuscita. Riprova tra poco." });
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center rounded-xl border border-line bg-paper px-6 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-paper">
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ink">Richiesta ricevuta</h3>
        <p className="mt-2 max-w-sm text-muted">
          Ti ricontatteremo per comprendere le caratteristiche dell&apos;immobile e
          valutare insieme il modello di gestione più adatto.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-line bg-paper p-6 sm:p-8"
    >
      {/* honeypot: nascosto agli umani */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Non compilare
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="nome" className={labelCls}>
            Nome e cognome
          </label>
          <input id="nome" name="nome" className={field} placeholder="Mario Rossi" />
          {errors.nome && <FieldError>{errors.nome}</FieldError>}
        </div>

        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            className={field}
            placeholder="mario@email.it"
          />
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </div>

        <div>
          <label htmlFor="telefono" className={labelCls}>
            Telefono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            inputMode="tel"
            className={field}
            placeholder="+39 333 123 4567"
          />
          {errors.telefono && <FieldError>{errors.telefono}</FieldError>}
        </div>

        <div>
          <label htmlFor="localita" className={labelCls}>
            Località dell&apos;immobile
          </label>
          <input
            id="localita"
            name="localita"
            className={field}
            placeholder="Torino, centro"
          />
        </div>

        <div>
          <label htmlFor="immobili" className={labelCls}>
            Numero di immobili
          </label>
          <select id="immobili" name="immobili" defaultValue="1" className={field}>
            {unitOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="tipologia" className={labelCls}>
            Tipologia dell&apos;immobile
          </label>
          <select id="tipologia" name="tipologia" defaultValue="" className={field}>
            <option value="" disabled>
              Seleziona…
            </option>
            {typeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="obiettivo" className={labelCls}>
            Qual è il tuo obiettivo principale?
          </label>
          <select id="obiettivo" name="obiettivo" defaultValue="" className={field}>
            <option value="" disabled>
              Seleziona…
            </option>
            {objectives.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="messaggio" className={labelCls}>
            Messaggio <span className="font-normal text-muted">(facoltativo)</span>
          </label>
          <textarea
            id="messaggio"
            name="messaggio"
            rows={3}
            className={`${field} resize-none`}
            placeholder="Raccontaci qualcosa sul tuo immobile…"
          />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          name="privacy"
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-forest)]"
        />
        <span>
          Acconsento al trattamento dei dati per essere ricontattato, secondo
          l&apos;informativa privacy.
        </span>
      </label>
      {errors.privacy && <FieldError>{errors.privacy}</FieldError>}

      {errors.form && (
        <p className="mt-4 rounded-sm bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-brass mt-6 w-full disabled:opacity-70"
      >
        {status === "sending" ? "Invio in corso…" : "Richiedi la valutazione"}
        {status !== "sending" && <IconArrow className="h-4 w-4" />}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        Ti ricontatteremo per valutare insieme il modello di gestione più adatto.
        Nessun impegno.
      </p>
    </form>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-sm text-red-600">{children}</p>;
}
