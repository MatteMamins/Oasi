"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconCheck, IconArrow } from "./icons";

/* ── Percorso partner: prima il contesto, poi il contatto ──
   Stesso principio del form proprietari: poche domande leggere
   sul portfolio, i dati di contatto solo alla fine per la call. */

type Step = {
  key: string;
  question: string;
  options?: string[];
  placeholder?: string; // se presente, lo step è un input di testo
};

const steps: Step[] = [
  {
    key: "ruolo",
    question: "Come lavori oggi?",
    options: [
      "Property manager",
      "Agenzia immobiliare",
      "Altro operatore del settore",
    ],
  },
  {
    key: "portfolio",
    question: "Quanti immobili gestisci o hai in vetrina?",
    options: ["1–2", "3–5", "6–15", "Oltre 15"],
  },
  {
    key: "zona",
    question: "In che zona operi?",
    placeholder: "Es. Torino e provincia, Riviera ligure…",
  },
];

const CONTACT_STEP = steps.length;

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

const field =
  "w-full rounded-sm border border-line bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-forest";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function PartnerForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState("");
  const utm = useRef<Record<string, string>>({});
  const questionRef = useRef<HTMLElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const prevStep = useRef(0);
  const restoredStep = useRef(false);

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

  // Riprende un percorso lasciato a metà nella stessa sessione
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as {
        step?: number;
        answers?: Record<string, string>;
      };
      if (parsed.answers && typeof parsed.answers === "object") {
        // Ripristino solo dopo il mount: con SSR lo stato iniziale deve
        // combaciare con l'HTML del server (percorso da zero).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnswers(parsed.answers);
      }
      if (
        typeof parsed.step === "number" &&
        parsed.step > 0 &&
        parsed.step <= CONTACT_STEP
      ) {
        restoredStep.current = true;
        setStep(parsed.step);
      }
    } catch {
      // storage non disponibile o dati corrotti: si riparte dall'inizio
    }
  }, []);

  useEffect(() => {
    if (step === 0 && Object.keys(answers).length === 0) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }));
    } catch {
      // storage non disponibile: il form funziona comunque
    }
  }, [step, answers]);

  // Al cambio di passo porta il focus sulla nuova domanda
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    if (restoredStep.current) {
      restoredStep.current = false;
      return;
    }
    questionRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (status !== "done") return;
    resultRef.current?.scrollIntoView({ block: "center" });
    resultRef.current?.focus();
  }, [status]);

  const current = steps[step];
  const progress = Math.round(((step + 1) / (steps.length + 1)) * 100);

  function pick(value: string) {
    setAnswers((a) => ({ ...a, [current.key]: value }));
    setStepError("");
    setStep((s) => s + 1);
  }

  function goBack() {
    setStepError("");
    setStep((s) => s - 1);
  }

  function submitText(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = String(fd.get(current.key) ?? "").trim();
    if (!v) {
      setStepError("Scrivi una risposta per continuare.");
      return;
    }
    pick(v);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const payload = {
      tipo: "partner",
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefono: String(fd.get("telefono") ?? ""),
      ruolo: String(answers.ruolo ?? ""),
      portfolio: String(answers.portfolio ?? ""),
      localita: String(answers.zona ?? ""),
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
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 429) {
          setErrors({
            form:
              typeof data.error === "string"
                ? data.error
                : "Troppe richieste. Riprova tra qualche minuto.",
          });
        } else {
          setErrors(
            data.errors ?? {
              form:
                typeof data.error === "string"
                  ? data.error
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
        className="flex flex-col items-center rounded-xl border border-line bg-paper px-6 py-14 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-paper">
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ink">Richiesta ricevuta</h3>
        <p className="mt-2 max-w-sm text-muted">
          Ti ricontatteremo usando i recapiti indicati per fissare la prima call
          e capire insieme come valorizzare il tuo portfolio.
        </p>
        <a href="#partnership" className="btn btn-ghost mt-6">
          Rivedi la partnership <IconArrow className="h-4 w-4" />
        </a>
      </div>
    );
  }

  const isContact = step === CONTACT_STEP;

  return (
    <div className="rounded-xl border border-line bg-paper p-6 text-ink sm:p-8">
      <p className="font-display text-xl font-semibold sm:text-2xl">
        Prenota una prima call conoscitiva
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone"
          role="progressbar"
          aria-label="Avanzamento della richiesta partner"
          aria-valuemin={1}
          aria-valuemax={steps.length + 1}
          aria-valuenow={Math.min(step + 1, steps.length + 1)}
        >
          <div
            className="h-full rounded-full bg-brass transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="tnum shrink-0 text-xs text-muted">
          {Math.min(step + 1, steps.length + 1)}/{steps.length + 1}
        </span>
      </div>

      {!isContact && current.placeholder && (
        <form onSubmit={submitText} className="mt-7">
          <label
            htmlFor={current.key}
            ref={(el) => {
              questionRef.current = el;
            }}
            tabIndex={-1}
            className="block text-lg font-semibold outline-none"
          >
            {current.question}
          </label>
          <input
            id={current.key}
            name={current.key}
            className={`${field} mt-4`}
            placeholder={current.placeholder}
            defaultValue={String(answers[current.key] ?? "")}
            autoComplete="off"
            required
            aria-invalid={Boolean(stepError)}
            aria-describedby={stepError ? `${current.key}-error` : undefined}
            onChange={() => stepError && setStepError("")}
          />
          {stepError && (
            <FieldError id={`${current.key}-error`}>{stepError}</FieldError>
          )}
          <div className="mt-6 flex items-center justify-between gap-4">
            {step > 0 ? (
              <button
                type="button"
                onClick={goBack}
                className="text-sm text-muted underline-offset-4 hover:text-forest hover:underline"
              >
                ← Indietro
              </button>
            ) : (
              <span />
            )}
            <button type="submit" className="btn btn-primary">
              Continua <IconArrow className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}

      {!isContact && current.options && (
        <div className="mt-7">
          <p
            ref={(el) => {
              questionRef.current = el;
            }}
            tabIndex={-1}
            className="text-lg font-semibold outline-none"
          >
            {current.question}
          </p>
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
              onClick={goBack}
              className="mt-5 text-sm text-muted underline-offset-4 hover:text-forest hover:underline"
            >
              ← Indietro
            </button>
          )}
        </div>
      )}

      {isContact && (
        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-7"
          aria-busy={status === "sending"}
        >
          {/* honeypot: nascosto agli umani */}
          <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label>
              Non compilare
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <p
            ref={(el) => {
              questionRef.current = el;
            }}
            tabIndex={-1}
            className="text-lg font-semibold outline-none"
          >
            Ultimo passo: dove ti ricontattiamo per la call?
          </p>

          <div className="mt-4 grid gap-4">
            <div>
              <label htmlFor="nome" className={labelCls}>
                Nome e cognome
              </label>
              <input
                id="nome"
                name="nome"
                className={field}
                placeholder="Mario Rossi"
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.nome)}
                aria-describedby={errors.nome ? "partner-nome-error" : undefined}
              />
              {errors.nome && (
                <FieldError id="partner-nome-error">{errors.nome}</FieldError>
              )}
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
                  autoComplete="email"
                  className={field}
                  placeholder="mario@email.it"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "partner-email-error" : undefined}
                />
                {errors.email && (
                  <FieldError id="partner-email-error">{errors.email}</FieldError>
                )}
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
                  autoComplete="tel"
                  className={field}
                  placeholder="+39 333 123 4567"
                  required
                  aria-invalid={Boolean(errors.telefono)}
                  aria-describedby={errors.telefono ? "partner-telefono-error" : undefined}
                />
                {errors.telefono && (
                  <FieldError id="partner-telefono-error">{errors.telefono}</FieldError>
                )}
              </div>
            </div>
          </div>

          <label className="mt-5 flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              name="privacy"
              required
              aria-invalid={Boolean(errors.privacy)}
              aria-describedby={errors.privacy ? "partner-privacy-error" : undefined}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-forest)]"
            />
            <span>
              Acconsento al trattamento dei dati per essere ricontattato,
              secondo l&apos;informativa privacy.
            </span>
          </label>
          {errors.privacy && (
            <FieldError id="partner-privacy-error">{errors.privacy}</FieldError>
          )}

          {errors.form && (
            <p
              role="alert"
              className="mt-4 rounded-sm bg-red-50 px-4 py-2.5 text-sm text-red-700"
            >
              {errors.form}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn btn-brass mt-6 w-full disabled:opacity-70"
          >
            {status === "sending" ? "Invio in corso…" : "Prenota la call"}
            {status !== "sending" && <IconArrow className="h-4 w-4" />}
          </button>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
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

function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {children}
    </p>
  );
}
