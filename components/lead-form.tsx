"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconCheck, IconArrow } from "./icons";

/* ── Percorso multi-step: prima il valore percepito, poi il contatto ──
   L'utente costruisce la propria valutazione una domanda alla volta;
   solo alla fine, per ricevere il risultato, lascia i propri dati. */

type Step = {
  key: string;
  question: string;
  options?: string[];
  multi?: boolean;
  placeholder?: string; // se presente, lo step è un input di testo
};

const steps: Step[] = [
  {
    key: "localita",
    question: "Dove si trova l'immobile?",
    placeholder: "Es. Torino Centro, Bordighera, Moncalieri…",
  },
  {
    key: "tipologia",
    question: "Che tipo di immobile è?",
    options: ["Appartamento", "Casa indipendente", "Attico / Loft", "Altro"],
  },
  {
    key: "metratura",
    question: "Quanto è grande?",
    options: ["Meno di 50 m²", "50–80 m²", "80–120 m²", "Oltre 120 m²"],
  },
  {
    key: "posti_letto",
    question: "Quanti posti letto?",
    options: ["1–2", "3–4", "5–6", "7 o più"],
  },
  {
    key: "spazi_esterni",
    question: "Ha spazi esterni?",
    options: ["Nessuno", "Balcone o terrazzo", "Giardino", "Terrazzo e giardino"],
  },
  {
    key: "caratteristiche",
    question: "Ha qualcosa che lo rende speciale?",
    options: [
      "Vista panoramica",
      "Parcheggio privato",
      "Aria condizionata",
      "Ristrutturato di recente",
      "Vicino al mare",
      "In pieno centro",
    ],
    multi: true,
  },
];

const CONTACT_STEP = steps.length; // ultimo passo: i dati di contatto

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
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
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

  const current = steps[step];
  const progress = Math.round((step / (steps.length + 1)) * 100);

  function pick(value: string) {
    setAnswers((a) => ({ ...a, [current.key]: value }));
    setStep((s) => s + 1);
  }

  function toggleMulti(value: string) {
    setAnswers((a) => {
      const prev = Array.isArray(a[current.key]) ? (a[current.key] as string[]) : [];
      const next = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      return { ...a, [current.key]: next };
    });
  }

  function submitText(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = String(fd.get(current.key) ?? "").trim();
    if (!v) return;
    pick(v);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const caratteristiche = answers.caratteristiche;
    const payload = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefono: String(fd.get("telefono") ?? ""),
      localita: String(answers.localita ?? ""),
      tipologia: String(answers.tipologia ?? ""),
      metratura: String(answers.metratura ?? ""),
      posti_letto: String(answers.posti_letto ?? ""),
      spazi_esterni: String(answers.spazi_esterni ?? ""),
      caratteristiche: Array.isArray(caratteristiche)
        ? caratteristiche.join(", ")
        : "",
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
          Stiamo preparando la tua valutazione: ti ricontatteremo a breve con
          una stima personalizzata di quanto può rendere il tuo immobile.
        </p>
      </div>
    );
  }

  const isContact = step === CONTACT_STEP;

  return (
    <div className="rounded-xl border border-line bg-paper p-6 text-ink sm:p-8">
      {/* header + progresso */}
      <p className="font-display text-xl font-semibold sm:text-2xl">
        Scopri quanto potresti guadagnare con il tuo immobile
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone">
          <div
            className="h-full rounded-full bg-brass transition-all duration-500"
            style={{ width: `${isContact ? 92 : Math.max(progress, 6)}%` }}
          />
        </div>
        <span className="tnum shrink-0 text-xs text-muted">
          {Math.min(step + 1, steps.length + 1)}/{steps.length + 1}
        </span>
      </div>

      {/* passi del percorso */}
      {!isContact && current.placeholder && (
        <form onSubmit={submitText} className="mt-7">
          <label htmlFor={current.key} className="block text-lg font-semibold">
            {current.question}
          </label>
          <input
            id={current.key}
            name={current.key}
            className={`${field} mt-4`}
            placeholder={current.placeholder}
            defaultValue={String(answers[current.key] ?? "")}
            autoComplete="off"
          />
          <NavRow
            onBack={step > 0 ? () => setStep((s) => s - 1) : undefined}
            nextLabel="Continua"
          />
        </form>
      )}

      {!isContact && current.options && !current.multi && (
        <div className="mt-7">
          <p className="text-lg font-semibold">{current.question}</p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {current.options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => pick(o)}
                className={`rounded-sm border px-4 py-3.5 text-left text-[0.95rem] font-medium transition-colors ${
                  answers[current.key] === o
                    ? "border-forest bg-forest text-paper"
                    : "border-line bg-paper hover:border-forest"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-5 text-sm text-muted underline-offset-4 hover:text-forest hover:underline"
            >
              ← Indietro
            </button>
          )}
        </div>
      )}

      {!isContact && current.options && current.multi && (
        <div className="mt-7">
          <p className="text-lg font-semibold">{current.question}</p>
          <p className="mt-1 text-sm text-muted">
            Seleziona tutte le voci che vuoi, poi continua.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {current.options.map((o) => {
              const sel =
                Array.isArray(answers[current.key]) &&
                (answers[current.key] as string[]).includes(o);
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => toggleMulti(o)}
                  aria-pressed={sel}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    sel
                      ? "border-forest bg-forest text-paper"
                      : "border-line bg-paper hover:border-forest"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          <NavRow
            onBack={() => setStep((s) => s - 1)}
            onNext={() => setStep((s) => s + 1)}
            nextLabel="Continua"
          />
        </div>
      )}

      {/* passo finale: contatto */}
      {isContact && (
        <form onSubmit={onSubmit} noValidate className="mt-7">
          {/* honeypot: nascosto agli umani */}
          <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label>
              Non compilare
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <p className="text-lg font-semibold">
            Ultimo passo: dove ti inviamo la valutazione?
          </p>

          <div className="mt-4 grid gap-4">
            <div>
              <label htmlFor="nome" className={labelCls}>
                Nome e cognome
              </label>
              <input id="nome" name="nome" className={field} placeholder="Mario Rossi" />
              {errors.nome && <FieldError>{errors.nome}</FieldError>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>
          </div>

          <label className="mt-5 flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              name="privacy"
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-forest)]"
            />
            <span>
              Acconsento al trattamento dei dati per essere ricontattato,
              secondo l&apos;informativa privacy.
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
            {status === "sending" ? "Invio in corso…" : "Ricevi la valutazione"}
            {status !== "sending" && <IconArrow className="h-4 w-4" />}
          </button>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="text-sm text-muted underline-offset-4 hover:text-forest hover:underline"
            >
              ← Indietro
            </button>
            <p className="text-xs text-muted">Nessun costo, nessun impegno.</p>
          </div>
        </form>
      )}
    </div>
  );
}

function NavRow({
  onBack,
  onNext,
  nextLabel,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel: string;
}) {
  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted underline-offset-4 hover:text-forest hover:underline"
        >
          ← Indietro
        </button>
      ) : (
        <span />
      )}
      {onNext ? (
        <button type="button" onClick={onNext} className="btn btn-primary">
          {nextLabel} <IconArrow className="h-4 w-4" />
        </button>
      ) : (
        <button type="submit" className="btn btn-primary">
          {nextLabel} <IconArrow className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-sm text-red-600">{children}</p>;
}
