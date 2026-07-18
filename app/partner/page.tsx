import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { Journey } from "@/components/journey";
import { Footer } from "@/components/footer";
import { PartnerForm } from "@/components/partner-form";
import {
  IconShield,
  IconTrend,
  IconGuests,
  IconDoc,
  IconTax,
  IconMarketing,
  IconApp,
  IconCalendar,
  IconArrow,
  IconCheck,
  IconChevronDown,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Oasi Properties — Programma Partner per property manager e agenzie",
  description:
    "Porta il tuo portfolio dentro un'infrastruttura già pronta: contrattualistica, fiscalità, pricing dinamico e customer care. Partnership a percentuale per property manager e agenzie immobiliari.",
};

/* ── Dati (dalla presentazione partner) ─────────────────────────────── */
const trust = [
  { value: "7.000+", label: "prenotazioni gestite" },
  { value: "15+", label: "proprietari gestiti" },
  { value: "5 anni", label: "di esperienza" },
  { value: "4,56", label: "valutazione media" },
];

/* Dove mettiamo la cura: cosa intendiamo per qualità */
const cure = [
  {
    icon: IconMarketing,
    title: "Cura dell'annuncio",
    text: "Testi, foto e presentazione curati come un vero prodotto: un annuncio che comunica valore, non solo metri quadri.",
  },
  {
    icon: IconGuests,
    title: "Cura di ospiti e recensioni",
    text: "Ogni ospite seguito prima, durante e dopo il soggiorno. Le recensioni sono il termometro della qualità: le monitoriamo una a una.",
  },
  {
    icon: IconTrend,
    title: "Cura del revenue",
    text: "Tariffe aggiornate ogni giorno su domanda, stagionalità, eventi e competitor: non un calendario pieno, un calendario che rende.",
  },
];

/* Due percorsi, un solo programma */
const percorsi = [
  {
    title: "Hai già immobili in gestione?",
    text: "Mantieni la relazione con i tuoi proprietari: noi ci occupiamo di struttura, fiscalità e revenue, liberando tempo e margine.",
  },
  {
    title: "Sei un'agenzia immobiliare?",
    text: "Amplia la tua vetrina e i tuoi servizi, senza aprire una nuova linea di business e senza nuove competenze da assumere.",
  },
];

/* Le responsabilità che crescono col portfolio */
const rischi = [
  "Comunicazioni e adempimenti obbligatori verso Comuni e autorità",
  "Scadenze fiscali, versamenti e dichiarazioni per conto della proprietà",
  "Responsabilità civili e, in caso di errore, anche penali",
  "Una struttura societaria solida per operare in sicurezza e in scala",
];

/* L'infrastruttura già pronta */
const infrastruttura = [
  {
    icon: IconShield,
    title: "Struttura aziendale completa",
    text: "Un'azienda già operativa che si occupa di contrattualistica, adempimenti e fiscalità per conto tuo e dei proprietari.",
  },
  {
    icon: IconTax,
    title: "Ottimizzazione fiscale",
    text: "Una struttura fiscale ottimizzata che protegge la marginalità della tua gestione.",
  },
  {
    icon: IconDoc,
    title: "Contratto blindato",
    text: "Contrattualistica redatta da legali: solidità percepita per il proprietario, tutele solide per il partner.",
  },
  {
    icon: IconApp,
    title: "App dedicata per i resoconti",
    text: "Tu e il proprietario vedete ogni prenotazione, flussi e guadagni in tempo reale: zero fraintendimenti.",
  },
  {
    icon: IconCalendar,
    title: "Online in 24 ore",
    text: "Comunicazioni obbligatorie automatizzate e multi-scheda aziendale: l'immobile incassa dal giorno della firma.",
  },
];

/* Confronto: da solo vs con Oasi */
const confronto = [
  {
    ambito: "Contrattualistica",
    solo: "La scrivi caso per caso.",
    oasi: "Contratti pronti, chiari fin dal primo giorno.",
  },
  {
    ambito: "Fiscalità",
    solo: "Scadenze da seguire a mano, rischio di errore.",
    oasi: "Scadenze calcolate, versamenti gestiti per conto del proprietario.",
  },
  {
    ambito: "Prezzo",
    solo: "Aggiornamento manuale, spesso a intuito.",
    oasi: "Pricing dinamico su benchmark reali.",
  },
  {
    ambito: "Distribuzione",
    solo: "Pochi canali gestiti singolarmente.",
    oasi: "Pubblicazione su 15+ portali, gestione centralizzata.",
  },
  {
    ambito: "Assistenza ospiti",
    solo: "A orario, spesso in autonomia.",
    oasi: "Customer care 24/7.",
  },
  {
    ambito: "Controllo qualità",
    solo: "Saltuario.",
    oasi: "Check periodici documentati con foto e video.",
  },
  {
    ambito: "Crescita",
    solo: "Limitata dal tempo disponibile.",
    oasi: "Strutturata per scalare senza aumentare il carico operativo.",
  },
];

const team = [
  "Commerciale",
  "Preparazione immobile",
  "Revenue",
  "Guest care",
  "Fiscale e amministrativo",
];

const steps = [
  {
    n: "01",
    title: "Prima call conoscitiva",
    text: "Ci racconti il tuo portfolio e i tuoi obiettivi: capiamo insieme se e come possiamo collaborare.",
  },
  {
    n: "02",
    title: "Incontro e proposta",
    text: "Ci vediamo di persona per definire il modello di collaborazione e la percentuale di partnership.",
  },
  {
    n: "03",
    title: "Attivazione",
    text: "Prendiamo in carico gli immobili: contratti, staging, foto e pubblicazione su 15+ portali.",
  },
  {
    n: "04",
    title: "Gestione e crescita condivisa",
    text: "Report trasparenti, fiscalità gestita e un portfolio che cresce senza aumentare il carico operativo.",
  },
];

const faq = [
  {
    q: "Quanto costa la partnership?",
    a: "Lavoriamo a percentuale, definita caso per caso in base al numero di immobili, alla zona e ai servizi attivati. Se ne parla nella prima call.",
  },
  {
    q: "Devo avere già un certo numero di immobili?",
    a: "Sì: il percorso è pensato per chi ha già almeno un immobile da gestire, in autonomia o tramite agenzia.",
  },
  {
    q: "Chi si occupa del check-in e delle pulizie?",
    a: "Le attività fisiche sul territorio si organizzano insieme, in base al modello scelto. Noi ci occupiamo di contrattualistica, pubblicazione, revenue, fiscalità e customer care.",
  },
  {
    q: "Come funziona la pubblicazione degli annunci?",
    a: "Gli immobili vengono pubblicati su 15+ portali, con pricing dinamico aggiornato su domanda, stagionalità, eventi e competitor di zona.",
  },
  {
    q: "Chi si occupa della fiscalità?",
    a: "Gestiamo scadenze e versamenti delle imposte per conto del proprietario, con piena trasparenza attraverso i report periodici.",
  },
  {
    q: "Come si avvia la collaborazione?",
    a: "Con una prima call conoscitiva, seguita da un incontro in presenza per definire insieme percentuale e modello di collaborazione.",
  },
];

export default function Partner() {
  return (
    <>
      <Nav
        links={[
          { href: "#partnership", label: "La partnership" },
          { href: "#confronto", label: "Cosa cambia" },
          { href: "#faq", label: "FAQ" },
          { href: "/", label: "Per i proprietari" },
        ]}
        cta={{ href: "#call", label: "Prenota una call" }}
      />
      <main id="top">
        {/* ══════════════════ HERO ══════════════════ */}
        <section
          className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pb-20"
          style={{
            background:
              "radial-gradient(120% 90% at 80% -10%, #14493a 0%, #0b2a21 45%, #082019 100%)",
          }}
        >
          <div
            className="glow"
            style={{ background: "rgba(198,161,91,0.14)", width: 420, height: 420, top: -80, right: 40 }}
          />
          <div
            className="glow"
            style={{ background: "rgba(111,140,123,0.22)", width: 360, height: 360, bottom: -120, left: -60 }}
          />
          <div className="shell relative max-w-4xl">
            <Reveal
              as="h1"
              className="font-display text-[clamp(2.4rem,4.8vw,3.8rem)] font-semibold text-paper"
            >
              Il tuo portfolio, gestito con la cura
              <br className="hidden sm:block" /> di chi lo vive{" "}
              <em className="not-italic text-brass">ogni giorno.</em>
            </Reveal>
            <Reveal as="p" delay={120} className="mt-6 max-w-2xl text-lg text-paper/70 sm:text-xl">
              Anni di esperienza sul campo nella cura dell&apos;immobile, della
              relazione con gli ospiti e del revenue management: lo stesso
              metodo, al servizio del tuo portfolio.
            </Reveal>
            <Reveal delay={200} className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#call" className="btn btn-brass">
                Prenota una call <IconArrow className="h-4 w-4" />
              </a>
              <a href="#partnership" className="btn btn-on-dark">
                Scopri la partnership
              </a>
            </Reveal>
            <Reveal delay={280} className="mt-8 text-sm text-paper/60">
              Percorso dedicato a property manager e agenzie immobiliari con
              immobili già in gestione o in vetrina.
            </Reveal>
          </div>

          {/* trust strip */}
          <div className="shell relative mt-16 lg:mt-20">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:grid-cols-4">
              {trust.map((t) => (
                <div key={t.label} className="bg-forest-2/40 px-6 py-6 text-center backdrop-blur-sm">
                  <p className="font-display text-3xl font-semibold text-paper">{t.value}</p>
                  <p className="mt-1 text-xs text-paper/55">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ METODO + LE TRE CURE ══════════════════ */}
        <section className="bg-paper py-24 lg:py-32">
          <div className="shell">
            <Reveal className="max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
                Un metodo nato sul campo,
                <br />
                non in teoria.
              </h2>
              <p className="mt-5 text-lg text-muted">
                Il metodo Oasi nasce da anni di affiancamento diretto a realtà
                già strutturate degli affitti brevi: abbiamo assorbito processi
                ed errori che un grande operatore impara solo dopo anni, e li
                abbiamo affinati sul campo — con la cura del dettaglio che solo
                un property manager focalizzato può garantire.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {cure.map((c, i) => (
                <Reveal key={c.title} delay={i * 90}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-mist text-forest">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display mt-5 text-xl font-semibold text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] text-muted">{c.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ DUE PERCORSI ══════════════════ */}
        <section id="partnership" className="bg-stone py-24 lg:py-32">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
                Non conta da dove parti,
                <br />
                conta dove arrivi.
              </h2>
              <p className="mt-5 text-lg text-muted">
                La partnership è pensata per chi ha già immobili da
                valorizzare, che tu li gestisca in autonomia o tramite
                un&apos;agenzia.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {percorsi.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={i * 100}
                  className="rounded-2xl border border-line bg-paper p-8 sm:p-10"
                >
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-md text-muted">{p.text}</p>
                  <a
                    href="#call"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest underline-offset-4 hover:underline"
                  >
                    Parliamone in una call <IconArrow className="h-4 w-4" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ DIETRO LE QUINTE + INFRASTRUTTURA ══════════════════ */}
        <section
          className="relative overflow-hidden py-24 text-paper lg:py-32"
          style={{ background: "linear-gradient(180deg,#082019,#0b2a21 26%,#0e3529 60%,#0b2a21)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            style={{ background: "linear-gradient(180deg, var(--color-stone), transparent)" }}
          />
          <div
            className="glow"
            style={{ background: "rgba(198,161,91,0.10)", width: 360, height: 360, top: 120, right: -80 }}
          />
          <div className="shell relative">
            <Reveal className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold">
                Gestire non è solo accoglienza.
              </h2>
              <p className="mt-5 text-lg text-paper/70">
                Chi ha immobili in gestione si assume responsabilità che vanno
                oltre le chiavi e il check-in:
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-8 max-w-2xl space-y-3">
              {rischi.map((r) => (
                <div key={r} className="flex items-start gap-3 text-paper/80">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" aria-hidden />
                  {r}
                </div>
              ))}
              <p className="pt-3 font-medium text-paper">
                Continuare a crescere senza questa struttura significa far
                crescere il rischio insieme al portfolio.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-20 max-w-2xl">
              <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold">
                L&apos;infrastruttura è già pronta.
                <br />
                <span className="text-brass">Non devi costruirla da solo.</span>
              </h2>
              <p className="mt-5 text-paper/70">
                Pricing dinamico, PMS, contrattualistica, adempimenti: strumenti
                che usiamo ogni giorno, a disposizione del tuo portfolio da
                subito, senza costi né configurazioni a tuo carico.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {infrastruttura.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 80}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-brass">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display mt-4 text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 max-w-sm text-[0.95rem] text-paper/65">{f.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{ background: "linear-gradient(180deg, transparent, var(--color-paper))" }}
          />
        </section>

        {/* ══════════════════ CONFRONTO ══════════════════ */}
        <section id="confronto" className="bg-paper py-24 lg:py-32">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
                Cosa cambia, in pratica.
              </h2>
            </Reveal>

            <Reveal delay={100} className="mt-12 overflow-hidden rounded-2xl border border-line">
              <div className="hidden grid-cols-[170px_1fr_1fr] gap-x-8 border-b border-line bg-stone/60 px-6 py-3 text-xs text-muted md:grid lg:px-8">
                <span>Ambito</span>
                <span>Da solo</span>
                <span className="font-medium text-forest">Con Oasi</span>
              </div>
              {confronto.map((row, i) => (
                <div
                  key={row.ambito}
                  className={`grid gap-2 px-6 py-5 md:grid-cols-[170px_1fr_1fr] md:gap-x-8 md:py-4 lg:px-8 ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <p className="font-semibold text-ink">{row.ambito}</p>
                  <p className="text-sm text-muted md:self-center">
                    <span className="mr-2 text-xs text-muted/70 md:hidden">Da solo:</span>
                    {row.solo}
                  </p>
                  <p className="flex items-start gap-2 text-sm font-medium text-ink md:self-center">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brass-ink" />
                    {row.oasi}
                  </p>
                </div>
              ))}
            </Reveal>

            {/* Il team dietro ogni fase */}
            <Reveal delay={120} className="mt-6 rounded-2xl bg-forest-2 px-6 py-9 text-center sm:px-10">
              <p className="font-display text-xl font-semibold text-paper sm:text-2xl">
                Non lavori con un fornitore. Lavori con un team.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm text-paper/60">
                Ogni fase ha un referente dedicato, non un centralino — e ogni
                immobile una persona vicina, formata sugli standard Oasi.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                {team.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-paper/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ IL PERCORSO ══════════════════ */}
        <section
          id="percorso"
          className="relative overflow-hidden py-24 text-paper lg:py-32"
          style={{ background: "linear-gradient(180deg,#082019,#0b2a21 26%,#0e3529 60%,#0b2a21)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            style={{ background: "linear-gradient(180deg, var(--color-paper), transparent)" }}
          />
          <div
            className="glow"
            style={{ background: "rgba(198,161,91,0.10)", width: 360, height: 360, top: 120, right: -80 }}
          />
          <div className="shell relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold">
                  Dalla prima call alla crescita condivisa.
                </h2>
                <p className="mt-5 max-w-md text-lg text-paper/70">
                  Quattro passaggi, a partire da una semplice call conoscitiva.
                </p>
              </Reveal>
              <Reveal delay={120} className="mt-8 hidden lg:block">
                <a href="#call" className="btn btn-brass">
                  Prenota la prima call <IconArrow className="h-4 w-4" />
                </a>
                <p className="mt-4 text-sm text-paper/50">
                  Senza impegno: serve solo a conoscerci.
                </p>
              </Reveal>
            </div>

            <Reveal delay={120} className="lg:pt-2">
              <Journey steps={steps} />
            </Reveal>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{ background: "linear-gradient(180deg, transparent, var(--color-paper))" }}
          />
        </section>

        {/* ══════════════════ FAQ ══════════════════ */}
        <section id="faq" className="bg-paper py-24 lg:py-32">
          <div className="shell max-w-3xl">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
                Le domande che ci fanno più spesso.
              </h2>
            </Reveal>
            <Reveal delay={100} className="mt-10 border-t border-line">
              {faq.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <IconChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="max-w-2xl pb-6 text-muted">{f.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ CTA + FORM ══════════════════ */}
        <section
          id="call"
          className="relative overflow-hidden py-24 text-paper lg:py-32"
          style={{ background: "radial-gradient(120% 90% at 15% 10%, #14493a, #0b2a21 55%, #082019)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40"
            style={{ background: "linear-gradient(180deg, var(--color-paper), transparent)" }}
          />
          <div className="glow" style={{ background: "rgba(198,161,91,0.14)", width: 400, height: 400, top: -60, right: -40 }} />
          <div className="shell relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <Reveal as="h2" className="font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold">
                Iniziamo da una call conoscitiva.
              </Reveal>
              <Reveal as="p" delay={140} className="mt-6 max-w-md text-lg text-paper/70">
                Non è una valutazione immobiliare: è un incontro dedicato a chi
                vuole strutturare la propria attività con Oasi. Ci racconti il
                tuo portfolio e i tuoi obiettivi, e capiamo insieme se e come
                collaborare.
              </Reveal>
              <Reveal delay={220} className="mt-8 space-y-3">
                {[
                  "Percentuale definita insieme, caso per caso",
                  "Si parte dal tuo portfolio e dai tuoi obiettivi",
                  "Nessun costo, nessun vincolo",
                ].map((x) => (
                  <div key={x} className="flex items-center gap-3 text-paper/80">
                    <IconCheck className="h-5 w-5 shrink-0 text-brass" />
                    {x}
                  </div>
                ))}
              </Reveal>
            </div>

            <Reveal delay={160}>
              <PartnerForm />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
