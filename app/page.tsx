import Image from "next/image";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { Journey } from "@/components/journey";
import { LeadForm } from "@/components/lead-form";
import { Showcase } from "@/components/showcase";
import { Logo, OasiMark } from "@/components/logo";
import {
  IconShield,
  IconTrend,
  IconGuests,
  IconTax,
  IconUserCheck,
  IconChart,
  IconCamera,
  IconCalendar,
  IconArrow,
  IconStar,
  IconCheck,
  IconPin,
  IconExternal,
  IconChevronDown,
} from "@/components/icons";

// TODO: sostituire con l'URL reale del profilo host su Airbnb
const AIRBNB_URL = "https://www.airbnb.it/users/profile/1463443137810883322?previous_page_name=PdpHomeMarketplace";

/* ── Dati reali (profilo host) ──────────────────────────────────────── */
const trust = [
  { value: "7.000+", label: "prenotazioni gestite" },
  { value: "15+", label: "proprietari soddisfatti" },
  { value: "4,56", label: "valutazione media" },
  { value: "5 anni", label: "di esperienza" },
];

/* Annunci reali dal profilo host: foto, città e valutazione */
const listings = [
  { src: "/immobili/torino-1.jpg", place: "Torino", rating: "4,76" },
  { src: "/immobili/moncalieri-1.jpg", place: "Moncalieri", rating: "5,0" },
  { src: "/immobili/bordighera-1.jpg", place: "Bordighera", rating: "4,67" },
  { src: "/immobili/torino-2.jpg", place: "Torino", rating: "4,7" },
  { src: "/immobili/diano-marina-1.jpg", place: "Diano Marina", rating: null },
  { src: "/immobili/torino-3.jpg", place: "Torino", rating: "4,52" },
];

/* ── I due pilastri ─────────────────────────────────────────────────── */
const pillarQuality = [
  "Referente locale selezionato e formato sugli standard Oasi",
  "Controlli periodici documentati con foto e video",
  "Manutenzione e segnalazioni tempestive",
  "Standard costanti nel tempo, non solo al primo mese",
];

const pillarRevenue = [
  "Tariffe aggiornate su domanda, stagionalità e occupazione",
  "Calendario ottimizzato, non semplicemente pieno",
  "Distribuzione curata su un ecosistema di canali",
  "Report mensili chiari su ricavi e performance",
];

const formula = ["Prezzo corretto", "Calendario ottimizzato", "Qualità dell'asset"];

const steps = [
  {
    n: "01",
    title: "Analisi e stima gratuita",
    text: "Studiamo il tuo immobile e il mercato della tua zona e ti diciamo, numeri alla mano, quanto può rendere davvero. Senza costi e senza impegno.",
  },
  {
    n: "02",
    title: "Attivazione chiavi in mano",
    text: "Foto professionali, annuncio, pubblicazione sui canali, pratiche e fiscalità: prepariamo tutto noi. Tu non devi occuparti di nulla.",
  },
  {
    n: "03",
    title: "Gestione senza pensieri",
    text: "Prezzi, prenotazioni, ospiti, pulizie e imprevisti gestiti 7 giorni su 7. Il tuo immobile lavora mentre tu ti riprendi il tuo tempo.",
  },
  {
    n: "04",
    title: "Guadagni e report trasparenti",
    text: "Ogni mese incassi i tuoi guadagni e vedi ricavi, occupazione e stato dell'immobile in un report chiaro, sempre a portata di mano.",
  },
];

/* Quattro promesse, non otto voci: ogni card riassume un'area completa */
const services = [
  {
    icon: IconGuests,
    title: "Ospiti seguiti come in hotel",
    text: "Selezione, comunicazioni, accoglienza e assistenza 7 giorni su 7, prima, durante e dopo ogni soggiorno.",
    chips: ["Gestione ospiti", "Check-in", "Customer care 7/7"],
  },
  {
    icon: IconTrend,
    title: "Un calendario che rende",
    text: "Tariffe aggiornate su domanda e stagionalità, annunci curati e distribuzione sui canali giusti.",
    chips: ["Pricing dinamico", "Marketing", "Distribuzione"],
  },
  {
    icon: IconTax,
    title: "Zero burocrazia per te",
    text: "Pratiche, comunicazioni obbligatorie, scadenze e versamenti delle imposte: gestiti interamente per tuo conto.",
    chips: ["Adempimenti", "Fiscalità", "Versamenti"],
  },
  {
    icon: IconUserCheck,
    title: "Un immobile sempre curato",
    text: "Un referente locale dedicato vicino al tuo immobile, controlli documentati e report mensili chiari.",
    chips: ["Referente locale", "Controlli qualità", "Report"],
  },
];

/* ── Trasparenza: cosa vede il proprietario ─────────────────────────── */
const visibility = [
  {
    icon: IconCamera,
    title: "Controlli qualità documentati",
    text: "Check periodici con foto e video, segnalazioni e interventi sempre tracciati.",
  },
  {
    icon: IconChart,
    title: "Report economico e qualitativo",
    text: "Ricavi, occupazione e stato dell'immobile, ogni mese, senza doverli chiedere.",
  },
  {
    icon: IconTax,
    title: "Fiscalità e versamenti gestiti",
    text: "Scadenze calcolate e imposte versate per tuo conto: nessun calcolo, nessun F24 da ricordare.",
  },
];

/* Barre del mini-grafico nel mock dell'app (dati illustrativi) */
const mockBars = [38, 52, 44, 60, 48, 66, 58, 72, 64, 78, 70, 86];

const reviews = [
  {
    text: "Appartamento bellissimo situato a pochi chilometri da Torino, in una borgata molto tranquilla e silenziosa. Merita tantissimo.",
    author: "Angelo",
    place: "Rimini, Italia",
  },
  {
    text: "Un des meilleurs rapports qualité-prix trouvés à Turin. Tout était impeccable.",
    author: "Gaël",
    place: "Valleiry, Francia",
  },
  {
    text: "Mieszkanie czyste, dobrze wyposażone, bardzo ciche. Świetna lokalizacja.",
    author: "Artur",
    place: "Tomaszów, Polonia",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
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
          <div className="shell relative grid items-center gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
            <div>
              <Reveal as="p" className="eyebrow inline-flex items-center gap-2 text-brass">
                <span className="h-px w-8 bg-brass/60" />
                Gestione affitti brevi a 360°
              </Reveal>
              <Reveal
                as="h1"
                delay={80}
                className="font-display mt-6 text-[clamp(2.6rem,5vw,4rem)] font-semibold text-paper"
              >
                Il tuo immobile,
                <br />
                gestito come un{" "}
                <em className="not-italic text-brass">asset.</em>
              </Reveal>
              <Reveal as="p" delay={140} className="mt-5 text-xl font-semibold text-paper sm:text-2xl">
                Specialisti in{" "}
                <span className="rounded-md bg-brass px-2 py-0.5 text-forest-3">
                  affitti brevi
                </span>
              </Reveal>
              <Reveal as="p" delay={190} className="mt-5 max-w-md text-lg text-paper/70">
                Ospiti, burocrazia e fiscalità: pensiamo a tutto noi. Tu
                mantieni visibilità, controllo e risultati.
              </Reveal>
              <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#valutazione" className="btn btn-brass">
                  Richiedi una valutazione <IconArrow className="h-4 w-4" />
                </a>
                <a href="#metodo" className="btn btn-on-dark">
                  Scopri il metodo
                </a>
              </Reveal>
              <Reveal delay={320} className="mt-8 flex items-center gap-3 text-sm text-paper/60">
                <span className="flex text-brass">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="h-4 w-4" />
                  ))}
                </span>
                <span>
                  <span className="tnum text-paper">4,56</span> su 358 recensioni ospiti
                </span>
              </Reveal>
            </div>

            {/* Gli immobili in gestione, a rotazione automatica */}
            <Reveal delay={200}>
              <Showcase slides={listings.slice(0, 5)} />
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

          {/* cue: scopri il metodo */}
          <div className="shell relative mt-12 flex justify-center">
            <a
              href="#metodo"
              className="scroll-cue group inline-flex flex-col items-center gap-2 text-paper/45 transition-colors hover:text-brass"
            >
              <span className="eyebrow">Il metodo Oasi</span>
              <IconChevronDown className="h-5 w-5" />
            </a>
          </div>
        </section>

        {/* ══════════════════ IL METODO — i due pilastri + la formula ══════════════════ */}
        <section id="metodo" className="bg-stone py-24 lg:py-32">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <p className="eyebrow text-brass-ink">Il metodo Oasi</p>
              <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
                La precisione dei grandi operatori.
                <br />
                La cura di una gestione dedicata.
              </h2>
              <p className="mt-5 text-lg text-muted">
                Abbiamo conosciuto dall&apos;interno i processi delle principali realtà
                del settore. Ne abbiamo preso la solidità operativa e aggiunto ciò
                che spesso manca nei modelli standardizzati: attenzione al singolo
                immobile, controllo diretto e qualità costante.
              </p>
            </Reveal>

            {/* I due pilastri: verde = protezione, ottone = rendimento */}
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              <Reveal className="relative overflow-hidden rounded-2xl bg-forest p-8 text-paper sm:p-10">
                <div
                  className="glow"
                  style={{ background: "rgba(111,140,123,0.25)", width: 260, height: 260, top: -80, right: -60 }}
                />
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-paper">
                    <IconShield className="h-6 w-6" />
                  </span>
                  <p className="eyebrow mt-6 text-paper/50">Primo pilastro</p>
                  <h3 className="font-display mt-3 text-2xl font-semibold sm:text-3xl">
                    Qualità dell&apos;immobile
                  </h3>
                  <p className="mt-3 max-w-md text-paper/70">
                    Un asset da proteggere nel tempo, non solo un annuncio da
                    pubblicare.
                  </p>
                  <ul className="mt-7 space-y-3">
                    {pillarQuality.map((x) => (
                      <li key={x} className="flex items-start gap-3 text-[0.95rem] text-paper/85">
                        <IconCheck className="mt-1 h-4 w-4 shrink-0 text-sage" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={120} className="relative overflow-hidden rounded-2xl border border-brass/35 bg-paper p-8 sm:p-10">
                <div
                  className="glow"
                  style={{ background: "rgba(198,161,91,0.16)", width: 260, height: 260, top: -80, right: -60 }}
                />
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brass/15 text-brass-ink">
                    <IconTrend className="h-6 w-6" />
                  </span>
                  <p className="eyebrow mt-6 text-brass-ink/70">Secondo pilastro</p>
                  <h3 className="font-display mt-3 text-2xl font-semibold text-ink sm:text-3xl">
                    Redditività dell&apos;immobile
                  </h3>
                  <p className="mt-3 max-w-md text-muted">
                    Un processo strutturato, non una promessa generica di maggiori
                    ricavi.
                  </p>
                  <ul className="mt-7 space-y-3">
                    {pillarRevenue.map((x) => (
                      <li key={x} className="flex items-start gap-3 text-[0.95rem] text-ink/85">
                        <IconCheck className="mt-1 h-4 w-4 shrink-0 text-brass-ink" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* La formula */}
            <Reveal delay={100} className="mt-6 rounded-2xl bg-forest-2 px-6 py-8 text-center sm:px-10">
              <p className="eyebrow text-brass">La formula</p>
              <p className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
                {formula.map((term, i) => (
                  <span key={term} className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                    {i > 0 && <span className="tnum text-lg text-brass" aria-hidden>×</span>}
                    <span className="font-display text-xl font-semibold text-paper sm:text-2xl">{term}</span>
                  </span>
                ))}
              </p>
              <p className="mx-auto mt-4 max-w-lg text-sm text-paper/60">
                Ogni decisione viene presa per migliorare il rendimento del tuo
                immobile senza comprometterne il valore e la qualità.{" "}
                <a href="#valutazione" className="text-brass underline-offset-4 hover:underline">
                  Scopri quanto può rendere il tuo →
                </a>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ COSA GESTIAMO ══════════════════ */}
        <section id="servizi" className="bg-paper py-24 lg:py-32">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <p className="eyebrow text-brass-ink">Cosa gestiamo per te</p>
              <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
                Una gestione completa. Nessun carico operativo per te.
              </h2>
              <p className="mt-5 text-lg text-muted">
                Dall&apos;accoglienza degli ospiti alla fiscalità: prendiamo in carico
                l&apos;intero ciclo, lasciandoti visibilità e risultati.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {services.map((s, i) => (
                <Reveal
                  key={s.title}
                  delay={(i % 2) * 80}
                  className="group rounded-2xl border border-line bg-paper p-8 transition-all hover:border-forest/30 hover:shadow-[0_35px_60px_-45px_rgba(16,61,48,0.45)] sm:p-9"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-mist text-forest transition-colors group-hover:bg-forest group-hover:text-paper">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display mt-6 text-2xl font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-md text-muted">{s.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-line bg-stone px-3 py-1 text-xs font-medium text-muted"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120} className="mt-10 flex justify-center">
              <a href="#valutazione" className="btn btn-primary">
                Scopri quanto può rendere il tuo immobile <IconArrow className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ COME FUNZIONA — Il percorso ══════════════════ */}
        <section
          id="come-funziona"
          className="relative overflow-hidden py-24 text-paper lg:py-32"
          style={{ background: "linear-gradient(180deg,#082019,#0b2a21 26%,#0e3529 60%,#0b2a21)" }}
        >
          {/* seam: entra dal chiaro della sezione precedente */}
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
                <p className="eyebrow text-brass">Il percorso</p>
                <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold">
                  Dalla prima analisi alla gestione completa.
                </h2>
                <p className="mt-5 max-w-md text-lg text-paper/70">
                  Quattro passaggi. Dopo il primo, non devi più pensare a nulla:
                  al resto pensiamo noi.
                </p>
              </Reveal>
              <Reveal delay={120} className="mt-8 hidden lg:block">
                <a href="#valutazione" className="btn btn-brass">
                  Inizia dal primo passo <IconArrow className="h-4 w-4" />
                </a>
                <p className="mt-4 text-sm text-paper/50">
                  L&apos;analisi iniziale è gratuita e senza impegno.
                </p>
              </Reveal>
            </div>

            <Reveal delay={120} className="lg:pt-2">
              <Journey steps={steps} />
            </Reveal>
          </div>

          {/* seam: dissolve nel chiaro della sezione successiva */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{ background: "linear-gradient(180deg, transparent, var(--color-paper))" }}
          />
        </section>

        {/* ══════════════════ TRASPARENZA — tu vedi tutto ══════════════════ */}
        <section id="trasparenza" className="bg-paper py-24 lg:py-32">
          <div className="shell grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal as="p" className="eyebrow text-brass-ink">
                Tecnologia e trasparenza
              </Reveal>
              <Reveal as="h2" delay={80} className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
                Noi ci occupiamo di tutto.
                <br />
                Tu vedi tutto.
              </Reveal>
              <Reveal as="p" delay={140} className="mt-5 max-w-lg text-lg text-muted">
                Delegare non significa perdere il controllo. Dalla tua area
                dedicata segui prenotazioni, ricavi, controlli qualità e
                adempimenti fiscali — in ogni momento, da qualsiasi dispositivo.
              </Reveal>
              <Reveal delay={200} className="mt-9 space-y-6">
                {visibility.map((v) => (
                  <div key={v.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mist text-forest">
                      <v.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">{v.title}</h3>
                      <p className="mt-1 max-w-md text-sm text-muted">{v.text}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>

            {/* Mock dell'area proprietario (dati illustrativi) */}
            <Reveal delay={160}>
              <div className="mx-auto w-full max-w-sm">
                <div className="overflow-hidden rounded-2xl bg-forest-2 text-paper shadow-[0_50px_90px_-45px_rgba(8,32,25,0.75)]">
                  <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-paper">
                        <OasiMark className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-medium">Area proprietario</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-paper/55">
                      Oasi corallo <IconChevronDown className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <div className="px-6 pt-5">
                    <p className="eyebrow text-paper/45">Ricavi del mese</p>
                    <p className="mt-1 flex items-baseline gap-2">
                      <span className="font-display tnum text-3xl font-semibold">€ 2.480</span>
                      <span className="text-xs text-paper/50">occupazione 84%</span>
                    </p>
                    <div className="mt-4 flex h-16 items-end gap-1.5" aria-hidden>
                      {mockBars.map((h, i) => (
                        <span
                          key={i}
                          className={`flex-1 rounded-t-sm ${i === mockBars.length - 1 ? "bg-brass" : "bg-white/15"}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-px bg-white/5">
                    {[
                      { icon: IconCamera, text: "Controllo qualità completato", meta: "12 foto" },
                      { icon: IconTax, text: "Imposte versate per tuo conto", meta: "F24" },
                      { icon: IconCalendar, text: "Nuova prenotazione", meta: "4 notti" },
                    ].map((r) => (
                      <div key={r.text} className="flex items-center gap-3 bg-forest-2 px-6 py-3.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-brass">
                          <r.icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 text-sm text-paper/85">{r.text}</span>
                        <span className="tnum text-xs text-paper/45">{r.meta}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 border-t border-white/10 px-6 py-3.5 text-xs text-paper/50">
                    <IconCheck className="h-3.5 w-3.5 text-sage" />
                    Tutto in regola: nessuna azione richiesta da parte tua
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-muted/70">
                  Anteprima illustrativa dell&apos;area proprietario.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ RECENSIONI — anteprima profilo Airbnb ══════════════════ */}
        <section id="recensioni" className="bg-stone py-24 lg:py-32">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <p className="eyebrow text-brass-ink">La voce degli ospiti</p>
              <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
                Il nostro profilo host, in anteprima.
              </h2>
              <p className="mt-5 text-lg text-muted">
                Annunci, valutazioni e recensioni sono quelli reali del nostro
                profilo verificato su Airbnb. Puoi controllare tutto, quando vuoi.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-12">
              <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_50px_90px_-55px_rgba(16,61,48,0.5)]">
                <div className="grid md:grid-cols-[280px_1fr]">
                  {/* colonna profilo, come su Airbnb */}
                  <div className="flex flex-col items-center border-b border-line bg-stone/40 px-8 py-9 text-center md:border-b-0 md:border-r">
                    <div className="relative">
                      <span className="block h-24 w-24 overflow-hidden rounded-full ring-1 ring-line">
                        <Image
                          src="/immobili/avatar.jpg"
                          alt="Avatar del profilo host Oasi Properties"
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="absolute -right-1 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-forest text-paper ring-2 ring-paper">
                        <IconCheck className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <p className="font-display mt-4 text-xl font-semibold text-ink">
                      Oasi Properties
                    </p>
                    <p className="mt-0.5 text-sm text-muted">Host verificato su Airbnb</p>

                    <dl className="mt-7 w-full divide-y divide-line border-y border-line text-left">
                      <div className="flex items-baseline justify-between py-3">
                        <dd className="font-display tnum text-lg font-semibold text-ink">358</dd>
                        <dt className="text-xs text-muted">Recensioni</dt>
                      </div>
                      <div className="flex items-baseline justify-between py-3">
                        <dd className="flex items-center gap-1 font-display text-lg font-semibold text-ink">
                          <span className="tnum">4,56</span>
                          <IconStar className="h-3.5 w-3.5 text-brass" />
                        </dd>
                        <dt className="text-xs text-muted">Valutazione media</dt>
                      </div>
                      <div className="flex items-baseline justify-between py-3">
                        <dd className="font-display tnum text-lg font-semibold text-ink">3</dd>
                        <dt className="text-xs text-muted">Anni da host</dt>
                      </div>
                    </dl>

                    <a
                      href={AIRBNB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost mt-7 w-full text-sm"
                    >
                      Vedi il profilo su Airbnb <IconExternal className="h-4 w-4" />
                    </a>
                  </div>

                  {/* recensioni */}
                  <div className="flex flex-col">
                    <div className="grid flex-1 divide-y divide-line">
                      {reviews.map((r) => (
                        <figure key={r.author} className="flex flex-col justify-center px-6 py-6 sm:px-8">
                          <span className="flex text-brass" aria-label="Valutazione 5 su 5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <IconStar key={i} className="h-3.5 w-3.5" />
                            ))}
                          </span>
                          <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-ink">
                            {r.text}
                          </blockquote>
                          <figcaption className="mt-4 flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist font-display text-sm text-forest">
                              {r.author[0]}
                            </span>
                            <span>
                              <span className="block text-sm font-medium text-ink">{r.author}</span>
                              <span className="flex items-center gap-1 text-xs text-muted">
                                <IconPin className="h-3 w-3" /> {r.place}
                              </span>
                            </span>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                </div>

                {/* gli annunci, con le foto reali */}
                <div className="border-t border-line bg-stone/50 px-6 py-6 sm:px-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="eyebrow text-muted/70">Gli annunci in gestione</p>
                    <p className="text-xs text-muted">
                      10 annunci attivi · Torino, Moncalieri e Riviera ligure
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {listings.map((l) => (
                      <a
                        key={l.src}
                        href={AIRBNB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <span className="block aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={l.src}
                            alt={`Annuncio a ${l.place}`}
                            width={220}
                            height={220}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </span>
                        <span className="mt-1.5 flex items-center justify-between text-xs">
                          <span className="truncate font-medium text-ink/80">{l.place}</span>
                          <span className="flex shrink-0 items-center gap-0.5 text-muted">
                            {l.rating ? (
                              <>
                                <IconStar className="h-3 w-3 text-brass" />
                                <span className="tnum">{l.rating}</span>
                              </>
                            ) : (
                              "Novità"
                            )}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ CTA + FORM ══════════════════ */}
        <section
          id="valutazione"
          className="relative overflow-hidden py-24 text-paper lg:py-32"
          style={{ background: "radial-gradient(120% 90% at 15% 10%, #14493a, #0b2a21 55%, #082019)" }}
        >
          {/* seam: entra dal chiaro della sezione precedente */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40"
            style={{ background: "linear-gradient(180deg, var(--color-stone), transparent)" }}
          />
          <div className="glow" style={{ background: "rgba(198,161,91,0.14)", width: 400, height: 400, top: -60, right: -40 }} />
          <div className="shell relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <Reveal as="p" className="eyebrow text-brass">Scopri il potenziale del tuo immobile</Reveal>
              <Reveal as="h2" delay={80} className="font-display mt-4 text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold">
                Lascia i tuoi dati.
                <br />
                Ricevi una valutazione personalizzata.
              </Reveal>
              <Reveal as="p" delay={140} className="mt-6 max-w-md text-lg text-paper/70">
                In pochi minuti capiamo insieme quanto può rendere il tuo immobile e
                qual è il modello di gestione più adatto. Senza impegno.
              </Reveal>
              <Reveal delay={220} className="mt-8 space-y-3">
                {[
                  "Risposta da un consulente Oasi Properties",
                  "Analisi del potenziale, non una stima automatica",
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
              <LeadForm />
            </Reveal>
          </div>
        </section>
      </main>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="bg-forest-3 py-14 text-paper/60">
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 md:flex-row">
            <div className="max-w-sm">
              <Logo tone="light" />
              <p className="mt-4 text-sm text-paper/55">
                Gestione affitti brevi a 360°. Redditività e qualità in un&apos;unica
                gestione, con la precisione dei grandi modelli e la cura di una
                gestione dedicata.
              </p>
            </div>
            <div className="flex gap-14">
              <nav className="flex flex-col gap-2.5 text-sm">
                <span className="eyebrow mb-1 text-paper/40">Sito</span>
                <a href="#metodo" className="hover:text-brass">Il metodo</a>
                <a href="#servizi" className="hover:text-brass">Servizi</a>
                <a href="#come-funziona" className="hover:text-brass">Come funziona</a>
                <a href="#recensioni" className="hover:text-brass">Recensioni</a>
              </nav>
              <div className="flex flex-col gap-2.5 text-sm">
                <span className="eyebrow mb-1 text-paper/40">Contatti</span>
                <a href="#valutazione" className="hover:text-brass">Richiedi una valutazione</a>
                <span>Torino e Nord Italia</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-8 text-xs text-paper/40 sm:flex-row">
            <p>© {new Date().getFullYear()} Oasi Properties. Tutti i diritti riservati.</p>
            <p>Dati e recensioni dal profilo host verificato.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
