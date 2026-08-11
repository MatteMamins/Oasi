"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { IconCheck, IconArrow } from "@/components/ui/icons";

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
    key: "caratteristiche",
    question: "Quali caratteristiche ha?",
    options: [
      "Balcone o terrazzo",
      "Giardino",
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

const OUTDOOR_FEATURES = new Set(["Balcone o terrazzo", "Giardino"]);

/* Le risposte restano salvate nella sessione: chi abbandona a metà percorso
   e torna sulla pagina riparte da dove era rimasto. */
const STORAGE_KEY = "oasi-lead-form";

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
  "w-full rounded-sm border border-line bg-stone/40 px-4 py-3 text-base text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-forest focus:bg-paper sm:text-[0.95rem]";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";
const cardChrome =
  "rounded-sm border border-line bg-paper shadow-[0_32px_64px_-36px_rgba(8,32,25,0.55)] ring-1 ring-white/10";
const optionBase =
  "min-h-11 rounded-sm border px-4 py-3.5 text-left text-[0.95rem] font-medium transition-colors duration-200";
const optionIdle =
  "border-line bg-paper hover:border-forest/40 hover:bg-stone";
const optionActive = "border-forest bg-forest text-paper";
const chipBase =
  "min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200";

export function LeadForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState("");
  const utm = useRef<Record<string, string>>({});
  const questionRef = useRef<HTMLElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const prevStep = useRef(0);
  const restoredStep = useRef(false);

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

  // Riprende un percorso lasciato a metà nella stessa sessione
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as {
        step?: number;
        answers?: Record<string, string | string[]>;
      };
      if (parsed.answers && typeof parsed.answers === "object") {
        // Il ripristino può avvenire solo dopo il mount: con SSR lo stato
        // iniziale deve combaciare con l'HTML del server (percorso da zero).
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
      // storage non disponibile: pazienza, il form funziona comunque
    }
  }, [step, answers]);

  // Al cambio di passo porta il focus sulla nuova domanda, così anche
  // chi usa screen reader o tastiera sa che il contenuto è cambiato.
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    if (restoredStep.current) {
      restoredStep.current = false; // ripristino al load: niente furto di focus
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
    const caratteristiche = answers.caratteristiche;
    const selectedFeatures = Array.isArray(caratteristiche)
      ? caratteristiche
      : [];
    const payload = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefono: String(fd.get("telefono") ?? ""),
      localita: String(answers.localita ?? ""),
      tipologia: String(answers.tipologia ?? ""),
      metratura: String(answers.metratura ?? ""),
      posti_letto: "",
      spazi_esterni: selectedFeatures
        .filter((feature) => OUTDOOR_FEATURES.has(feature))
        .join(", "),
      caratteristiche: selectedFeatures
        .filter((feature) => !OUTDOOR_FEATURES.has(feature))
        .join(", "),
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
        className={`flex flex-col items-center px-6 py-14 text-center ${cardChrome}`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-paper ring-1 ring-brass/30">
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ink">Richiesta ricevuta</h3>
        <p className="mt-2 max-w-sm text-muted">
          Ti ricontatteremo usando i recapiti indicati per preparare insieme una
          stima personalizzata del potenziale del tuo immobile.
        </p>
        <a href="#come-funziona" className="btn btn-ghost mt-6">
          Scopri il metodo Oasi <IconArrow className="h-4 w-4" />
        </a>
      </div>
    );
  }

  const isContact = step === CONTACT_STEP;

  return (
    <div className={`${cardChrome} p-6 text-ink sm:p-8`}>
      {/* header + progresso */}
      <p className="font-display text-xl font-semibold sm:text-2xl">
        Prepariamo la valutazione del tuo immobile
      </p>
      <p className="mt-2 text-sm text-muted">5 passaggi · nessun impegno</p>
      <div className="mt-5 flex items-center gap-3">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-forest/15"
          role="progressbar"
          aria-label="Avanzamento della valutazione"
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

      {/* passi del percorso */}
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
            autoComplete="address-level2"
            enterKeyHint="next"
            required
            aria-invalid={Boolean(stepError)}
            aria-describedby={stepError ? `${current.key}-error` : undefined}
            onChange={() => stepError && setStepError("")}
          />
          {stepError && (
            <FieldError id={`${current.key}-error`}>{stepError}</FieldError>
          )}
          <NavRow onBack={step > 0 ? goBack : undefined} nextLabel="Continua" />
        </form>
      )}

      {!isContact && current.options && !current.multi && (
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
                className={`${optionBase} ${
                  answers[current.key] === o ? optionActive : optionIdle
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
              className="mt-3 inline-flex min-h-11 items-center text-sm text-muted underline-offset-4 hover:text-forest hover:underline"
            >
              ← Indietro
            </button>
          )}
        </div>
      )}

      {!isContact && current.options && current.multi && (
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
                  className={`${chipBase} ${
                    sel ? optionActive : optionIdle
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          <NavRow
            onBack={goBack}
            onNext={() => setStep((s) => s + 1)}
            nextLabel="Continua"
          />
        </div>
      )}

      {/* passo finale: contatto */}
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
            Ultimo passo: dove ti ricontattiamo per prepararla?
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
                aria-describedby={errors.nome ? "nome-error" : undefined}
              />
              {errors.nome && <FieldError id="nome-error">{errors.nome}</FieldError>}
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
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <FieldError id="email-error">{errors.email}</FieldError>}
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
                  aria-describedby={errors.telefono ? "telefono-error" : undefined}
                />
                {errors.telefono && (
                  <FieldError id="telefono-error">{errors.telefono}</FieldError>
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
              aria-describedby={errors.privacy ? "privacy-error" : undefined}
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
            <FieldError id="privacy-error">{errors.privacy}</FieldError>
          )}

          {errors.form && (
            <p
              role="alert"
              className="mt-4 rounded-sm border border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700"
            >
              {errors.form}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn btn-brass mt-6 w-full disabled:opacity-70"
          >
            {status === "sending"
              ? "Invio in corso…"
              : "Richiedi la valutazione gratuita"}
            {status !== "sending" && <IconArrow className="h-4 w-4" />}
          </button>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-11 items-center text-sm text-muted underline-offset-4 hover:text-forest hover:underline"
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

function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {children}
    </p>
  );
}
