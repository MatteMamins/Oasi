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
  IconTax,
  IconUserCheck,
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
  { value: "10", label: "annunci attivi" },
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

/* ── Perché l'affitto breve batte il lungo termine ────────────────────
   Manifesto tipografico: quattro titoli enormi che si leggono in uno
   sguardo (Più / Zero in ottone), con una micro-spiegazione accanto. */
const whyShortTerm = [
  {
    icon: IconTrend,
    lead: "Più",
    word: "guadagni",
    text: "Tariffe che seguono il mercato, non un canone fermo da anni.",
  },
  {
    icon: IconShield,
    lead: "Zero",
    word: "morosità",
    text: "Gli ospiti pagano sempre prima di entrare.",
  },
  {
    icon: IconCalendar,
    lead: "Zero",
    word: "vuoti",
    text: "Prezzi e calendario ottimizzati ogni giorno, tutto l'anno.",
  },
  {
    icon: IconUserCheck,
    lead: "Zero",
    word: "pensieri",
    text: "Ospiti, pulizie e fiscalità: ce ne occupiamo noi.",
  },
];

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
              <Reveal
                as="h1"
                className="font-display text-[clamp(2.6rem,5vw,4rem)] font-semibold text-paper"
              >
                Il tuo immobile,
                <br />
                gestito come un{" "}
                <em className="not-italic text-brass">asset.</em>
              </Reveal>
              <Reveal as="p" delay={120} className="mt-6 text-xl font-semibold text-paper sm:text-2xl">
                Specialisti in{" "}
                <span className="rounded-md bg-brass px-2 py-0.5 text-forest-3">
                  affitti brevi
                </span>
              </Reveal>
              <Reveal delay={200} className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#valutazione" className="btn btn-brass">
                  Richiedi una valutazione <IconArrow className="h-4 w-4" />
                </a>
                <a href="#come-funziona" className="btn btn-on-dark">
                  Scopri come funziona
                </a>
              </Reveal>
              <Reveal delay={280} className="mt-8 flex items-center gap-3 text-sm text-paper/60">
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

          {/* cue: continua */}
          <div className="shell relative mt-12 flex justify-center">
            <a
              href="#perche"
              className="scroll-cue group inline-flex flex-col items-center gap-2 text-paper/45 transition-colors hover:text-brass"
              aria-label="Continua a leggere"
            >
              <IconChevronDown className="h-5 w-5" />
            </a>
          </div>
        </section>

        {/* ══════════════════ PERCHÉ L'AFFITTO BREVE ══════════════════ */}
        <section id="perche" className="bg-paper py-24 lg:py-32">
          <div className="shell">
            <Reveal className="max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
                Molto più redditizio
                <br />
                dell&apos;affitto a lungo termine.
              </h2>
            </Reveal>

            <div className="mt-12 border-t border-line lg:mt-14">
              {whyShortTerm.map((w, i) => (
                <Reveal
                  key={w.word}
                  delay={i * 80}
                  className="group flex flex-col gap-4 border-b border-line py-7 sm:py-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
                >
                  <h3 className="font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-semibold leading-none text-ink transition-transform duration-300 lg:group-hover:translate-x-2">
                    <span className="text-brass">{w.lead}</span> {w.word}
                  </h3>
                  <p className="flex items-center gap-4 text-muted lg:max-w-sm lg:justify-end lg:text-right">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-paper lg:order-2">
                      <w.icon className="h-5 w-5" />
                    </span>
                    <span className="lg:order-1">{w.text}</span>
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120} className="mt-14 flex justify-center">
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
                <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold">
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
              <Reveal as="h2" className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
                Noi ci occupiamo di tutto.
                <br />
                Tu vedi tutto.
              </Reveal>
              <Reveal as="p" delay={140} className="mt-5 max-w-lg text-lg text-muted">
                Delegare non significa perdere il controllo. Dalla tua area
                dedicata segui prenotazioni, ricavi, controlli qualità e
                adempimenti fiscali — in ogni momento, da qualsiasi dispositivo.
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
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
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

        {/* ══════════════════ CHI C'È DIETRO ══════════════════ */}
        <section id="chi-sono" className="bg-paper py-24 lg:py-32">
          <div className="shell grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <Reveal>
              <div className="relative mx-auto w-full max-w-xs">
                <span className="block overflow-hidden rounded-2xl shadow-[0_45px_80px_-50px_rgba(16,61,48,0.6)]">
                  <Image
                    src="/ivano.jpg"
                    alt="Ivano, fondatore di Oasi Properties"
                    width={480}
                    height={480}
                    className="h-auto w-full object-cover"
                  />
                </span>
                <span className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-forest px-4 py-2 text-sm font-medium text-paper shadow-lg">
                  <IconCheck className="h-4 w-4 text-brass" />
                  Host verificato su Airbnb
                </span>
              </div>
            </Reveal>
            <div>
              <Reveal as="h2" className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-ink">
                Dietro ogni immobile,
                <br />
                una persona. Non un call center.
              </Reveal>
              <Reveal as="p" delay={100} className="mt-6 max-w-xl text-lg text-muted">
                Sono Ivano, fondatore di Oasi Properties. Gestisco affitti brevi
                da 5 anni tra Torino e la Riviera ligure: oltre 7.000
                prenotazioni, un metodo costruito ospite dopo ospite e
                proprietari che mi affidano il loro immobile da anni.
              </Reveal>
              <Reveal as="p" delay={160} className="mt-4 max-w-xl text-lg text-muted">
                Ogni proprietario lavora direttamente con me e con il mio team:
                conosco ogni immobile che gestiamo, e rispondo personalmente dei
                risultati.
              </Reveal>
              <Reveal delay={220} className="mt-8">
                <a href="#valutazione" className="btn btn-primary">
                  Parliamo del tuo immobile <IconArrow className="h-4 w-4" />
                </a>
              </Reveal>
            </div>
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
            style={{ background: "linear-gradient(180deg, var(--color-paper), transparent)" }}
          />
          <div className="glow" style={{ background: "rgba(198,161,91,0.14)", width: 400, height: 400, top: -60, right: -40 }} />
          <div className="shell relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <Reveal as="h2" className="font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold">
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
                <a href="#come-funziona" className="hover:text-brass">Come funziona</a>
                <a href="#recensioni" className="hover:text-brass">Recensioni</a>
                <a href="#chi-sono" className="hover:text-brass">Chi c&apos;è dietro</a>
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
