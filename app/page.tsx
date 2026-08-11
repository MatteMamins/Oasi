import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/layout/nav";
import { PageTransition } from "@/components/layout/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { HouseCinema } from "@/components/motion/house-cinema";
import { Journey } from "@/components/ui/journey";
import { LeadForm } from "@/components/forms/lead-form";
import { MobileCta } from "@/components/layout/mobile-cta";
import { Footer } from "@/components/layout/footer";
import { OasiMark } from "@/components/ui/logo";
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
} from "@/components/ui/icons";

// TODO: sostituire con l'URL reale del profilo host su Airbnb
const AIRBNB_URL = "https://www.airbnb.it/users/profile/1463443137810883322?previous_page_name=PdpHomeMarketplace";

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
    <PageTransition>
      <Nav />
      <main id="top" tabIndex={-1} className="relative">
        {/* Elevazione frontale: avanza con lo scroll (stadi 0→4). */}
        <HouseCinema />

        {/* ══════════════════ HERO — stadio 0 ══════════════════
            Solid dark, editorial two-column, .rise above-fold. */}
        <section
          data-cinema-stage="0"
          data-cinema-surface="dark"
          className="cinema-section overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-28 lg:pb-36"
        >
          <div className="cinema-section-bg bg-forest-2" />
          <div
            aria-hidden
            className="cinema-section-bg opacity-60"
            style={{
              background:
                "radial-gradient(90% 70% at 85% 0%, rgba(20,73,58,0.55) 0%, transparent 55%)",
            }}
          />
          <div className="shell cinema-section-fg grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
            <div className="max-w-xl">
              <h1 className="rise font-display text-[clamp(2.75rem,5.4vw,4.25rem)] font-semibold tracking-tight text-paper">
                Il tuo immobile,
                <br className="hidden sm:inline" />{" "}
                gestito come un{" "}
                <em className="not-italic text-brass">asset.</em>
              </h1>
              <p
                className="rise mt-7 max-w-md text-lg leading-relaxed text-paper/75 sm:text-xl"
                style={{ "--rise-delay": "80ms" } as React.CSSProperties}
              >
                Gestione professionale di affitti brevi, dai prezzi alla cura
                degli ospiti.
              </p>
              <div
                className="rise mt-11"
                style={{ "--rise-delay": "140ms" } as React.CSSProperties}
              >
                <a href="#valutazione" className="btn btn-brass">
                  Richiedi la valutazione gratuita{" "}
                  <IconArrow className="h-4 w-4" />
                </a>
              </div>
              <div
                className="rise mt-9 flex items-center gap-2.5 text-sm text-paper/55"
                style={{ "--rise-delay": "200ms" } as React.CSSProperties}
              >
                <IconStar className="h-3.5 w-3.5 shrink-0 text-brass" />
                <span aria-label="Valutazione media 4,56 su 5, basata su 358 recensioni verificate">
                  <span className="tnum text-paper/90">4,56/5</span> su 358
                  recensioni verificate
                </span>
              </div>
            </div>

            <div
              className="rise"
              style={{ "--rise-delay": "120ms" } as React.CSSProperties}
            >
              <div className="relative">
                <div className="overflow-hidden rounded-sm ring-1 ring-white/10">
                  <Image
                    src="/immobili/torino-1.jpg"
                    alt="Soggiorno di un immobile gestito da Oasi a Torino"
                    width={1200}
                    height={900}
                    priority
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner bridge — quiet strip, no cinema stage */}
        <nav
          aria-label="Percorso per professionisti"
          className="relative border-b border-line bg-paper"
        >
          <div className="shell flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-sm text-muted">
              Sei un professionista immobiliare?
            </p>
            <Link
              href="/partner"
              className="flex min-h-11 items-center gap-1.5 text-sm font-medium text-forest transition-colors hover:text-brass-ink sm:min-h-0"
            >
              Scopri il percorso Partner
              <IconArrow className="h-3.5 w-3.5" />
            </Link>
          </div>
        </nav>

        {/* ══════════════════ PERCHÉ — stadio 1 (manifesto) ══════════════════ */}
        <section
          id="perche"
          data-cinema-stage="1"
          data-cinema-surface="light"
          className="cinema-section py-20 sm:py-28 lg:py-36"
        >
          <div className="cinema-section-bg bg-paper" />
          <div className="shell cinema-section-fg">
            <Reveal className="max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-semibold text-balance text-ink">
                Molto più redditizio
                <br className="hidden sm:inline" />{" "}
                dell&apos;affitto a lungo termine.
              </h2>
            </Reveal>

            <div className="mt-14 border-t border-line lg:mt-16">
              {whyShortTerm.map((w, i) => (
                <Reveal
                  key={w.word}
                  delay={i * 70}
                  className="group grid gap-5 border-b border-line py-8 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16"
                >
                  <h3 className="font-display text-[clamp(2.4rem,6vw,3.85rem)] font-semibold leading-[0.95] tracking-tight text-ink">
                    <span className="text-brass">{w.lead}</span> {w.word}
                  </h3>
                  <p className="flex max-w-md items-start gap-4 text-[0.98rem] leading-relaxed text-muted lg:max-w-xs lg:justify-self-end lg:text-right">
                    <span className="lg:order-1">{w.text}</span>
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-paper lg:order-2">
                      <w.icon className="h-4 w-4" />
                    </span>
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={100} className="mt-16 flex justify-center">
              <a href="#valutazione" className="btn btn-primary">
                Scopri quanto può rendere il tuo immobile{" "}
                <IconArrow className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ COME FUNZIONA — stadio 2 ══════════════════ */}
        <section
          id="come-funziona"
          data-cinema-stage="2"
          data-cinema-surface="dark"
          className="cinema-section overflow-hidden py-20 text-paper sm:py-28 lg:py-36"
        >
          <div className="cinema-section-bg bg-forest-2" />
          <div className="shell cinema-section-fg grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <h2 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-semibold">
                  Dalla prima analisi alla gestione completa.
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/65">
                  Quattro passaggi. Dopo il primo, non devi più pensare a nulla:
                  al resto pensiamo noi.
                </p>
              </Reveal>
              <Reveal delay={100} className="mt-10 hidden lg:block">
                <a href="#valutazione" className="btn btn-brass">
                  Inizia dal primo passo <IconArrow className="h-4 w-4" />
                </a>
                <p className="mt-4 text-sm text-paper/45">
                  L&apos;analisi iniziale è gratuita e senza impegno.
                </p>
              </Reveal>
            </div>

            <Reveal delay={100} className="lg:pt-1">
              <Journey steps={steps} />
            </Reveal>

            <Reveal delay={80} className="lg:hidden">
              <a href="#valutazione" className="btn btn-brass">
                Inizia dal primo passo <IconArrow className="h-4 w-4" />
              </a>
              <p className="mt-4 text-sm text-paper/45">
                L&apos;analisi iniziale è gratuita e senza impegno.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ TRASPARENZA — stadio 3 ══════════════════ */}
        <section
          id="trasparenza"
          data-cinema-stage="3"
          data-cinema-surface="light"
          className="cinema-section py-20 sm:py-28 lg:py-36"
        >
          <div className="cinema-section-bg bg-paper" />
          <div className="shell cinema-section-fg grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <Reveal
                as="h2"
                className="font-display text-[clamp(2rem,4vw,3.1rem)] font-semibold text-balance text-ink"
              >
                Noi ci occupiamo di tutto.
                <br className="hidden sm:inline" />{" "}
                Tu vedi tutto.
              </Reveal>
              <Reveal
                as="p"
                delay={120}
                className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
              >
                Delegare non significa perdere il controllo. Dalla tua area
                dedicata segui prenotazioni, ricavi, controlli qualità e
                adempimenti fiscali — in ogni momento, da qualsiasi dispositivo.
              </Reveal>
            </div>

            {/* Mock area proprietario — same labels/metrics, sharper chrome */}
            <Reveal delay={140}>
              <div className="mx-auto w-full max-w-sm">
                <div className="overflow-hidden rounded-sm bg-forest-2 text-paper shadow-[0_40px_80px_-40px_rgba(8,32,25,0.7)] ring-1 ring-forest/20">
                  <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-6">
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-paper">
                        <OasiMark className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-medium">
                        Area proprietario
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-paper/50">
                      Oasi corallo <IconChevronDown className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <div className="px-5 pt-6 sm:px-6">
                    <p className="text-xs font-medium tracking-wide text-paper/40">
                      Ricavi del mese
                    </p>
                    <p className="mt-1.5 flex items-baseline gap-2.5">
                      <span className="font-display tnum text-3xl font-semibold tracking-tight">
                        € 2.480
                      </span>
                      <span className="text-xs text-paper/45">
                        occupazione 84%
                      </span>
                    </p>
                    <div
                      className="mt-5 flex h-14 items-end gap-1.5"
                      aria-hidden
                    >
                      {mockBars.map((h, i) => (
                        <span
                          key={i}
                          className={`flex-1 rounded-t-[1px] ${
                            i === mockBars.length - 1
                              ? "bg-brass"
                              : "bg-white/[0.12]"
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 space-y-px border-t border-white/[0.06] bg-white/[0.03]">
                    {[
                      {
                        icon: IconCamera,
                        text: "Controllo qualità completato",
                        meta: "12 foto",
                      },
                      {
                        icon: IconTax,
                        text: "Imposte versate per tuo conto",
                        meta: "F24",
                      },
                      {
                        icon: IconCalendar,
                        text: "Nuova prenotazione",
                        meta: "4 notti",
                      },
                    ].map((r) => (
                      <div
                        key={r.text}
                        className="flex items-center gap-3 px-5 py-3.5 sm:px-6"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-brass">
                          <r.icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 text-sm text-paper/80">
                          {r.text}
                        </span>
                        <span className="tnum text-xs text-paper/40">
                          {r.meta}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 border-t border-white/[0.08] px-5 py-3.5 text-xs text-paper/45 sm:px-6">
                    <IconCheck className="h-3.5 w-3.5 text-sage" />
                    Tutto in regola: nessuna azione richiesta da parte tua
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-muted/70">
                  Anteprima illustrativa dell&apos;area proprietario.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ RECENSIONI — showroom host ══════════════════ */}
        <section
          id="recensioni"
          data-cinema-stage="3"
          data-cinema-surface="light"
          className="cinema-section py-20 sm:py-28 lg:py-36"
        >
          <div className="cinema-section-bg bg-stone" />
          <div className="shell cinema-section-fg">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
              <Reveal className="max-w-2xl">
                <h2 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-semibold text-ink">
                  Il nostro profilo host, in anteprima.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  Annunci, valutazioni e recensioni sono quelli reali del nostro
                  profilo verificato su Airbnb. Puoi controllare tutto, quando
                  vuoi.
                </p>
              </Reveal>

              <Reveal delay={80} className="flex items-center gap-4">
                <span className="relative shrink-0">
                  <span className="block h-14 w-14 overflow-hidden rounded-full ring-1 ring-line">
                    <Image
                      src="/persone/avatar.jpg"
                      alt="Avatar del profilo host Oasi Properties"
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="absolute -right-0.5 bottom-0 flex h-5 w-5 items-center justify-center rounded-full bg-forest text-paper ring-2 ring-stone">
                    <IconCheck className="h-2.5 w-2.5" />
                  </span>
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold text-ink">
                    Oasi Properties
                  </span>
                  <span className="text-sm text-muted">
                    Host verificato su Airbnb
                  </span>
                </span>
              </Reveal>
            </div>

            {/* Metrics band */}
            <Reveal delay={100} className="mt-12">
              <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-line bg-line">
                <div className="bg-paper px-5 py-6 text-center sm:px-8 sm:py-8">
                  <dd className="font-display tnum text-2xl font-semibold text-ink sm:text-3xl">
                    358
                  </dd>
                  <dt className="mt-1.5 text-xs tracking-wide text-muted sm:text-sm">
                    Recensioni
                  </dt>
                </div>
                <div className="bg-paper px-5 py-6 text-center sm:px-8 sm:py-8">
                  <dd className="flex items-center justify-center gap-1.5 font-display text-2xl font-semibold text-ink sm:text-3xl">
                    <span className="tnum">4,56</span>
                    <IconStar className="h-4 w-4 text-brass sm:h-5 sm:w-5" />
                  </dd>
                  <dt className="mt-1.5 text-xs tracking-wide text-muted sm:text-sm">
                    Valutazione media
                  </dt>
                </div>
                <div className="bg-paper px-5 py-6 text-center sm:px-8 sm:py-8">
                  <dd className="font-display tnum text-2xl font-semibold text-ink sm:text-3xl">
                    3
                  </dd>
                  <dt className="mt-1.5 text-xs tracking-wide text-muted sm:text-sm">
                    Anni da host
                  </dt>
                </div>
              </dl>
            </Reveal>

            {/* Guest quotes */}
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {reviews.map((r, i) => (
                <Reveal key={r.author} delay={80 + i * 60}>
                  <figure className="flex h-full flex-col rounded-sm border border-line bg-paper p-6 sm:p-7">
                    <span
                      className="flex text-brass"
                      aria-label="Valutazione 5 su 5"
                    >
                      {Array.from({ length: 5 }).map((_, j) => (
                        <IconStar key={j} className="h-3.5 w-3.5" />
                      ))}
                    </span>
                    <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink">
                      {r.text}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist font-display text-sm text-forest">
                        {r.author[0]}
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-ink">
                          {r.author}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <IconPin className="h-3 w-3" /> {r.place}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            {/* Listing photo grid */}
            <Reveal delay={120} className="mt-12">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-muted">
                  Gli annunci in gestione
                </p>
                <p className="text-xs text-muted/80">
                  10 annunci attivi · Torino, Moncalieri e Riviera ligure
                </p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {listings.map((l) => (
                  <a
                    key={l.src}
                    href={AIRBNB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <span className="block aspect-square overflow-hidden rounded-sm ring-1 ring-line">
                      <Image
                        src={l.src}
                        alt={`Annuncio a ${l.place}`}
                        width={220}
                        height={220}
                        sizes="(min-width: 1024px) 170px, (min-width: 640px) 30vw, 45vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="mt-2 flex items-center justify-between gap-1 text-xs">
                      <span className="truncate font-medium text-ink/80">
                        {l.place}
                      </span>
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

              <div className="mt-10 flex justify-center">
                <a
                  href={AIRBNB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost text-sm"
                >
                  Vedi il profilo su Airbnb{" "}
                  <IconExternal className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ CHI C'È DIETRO — stadio 3 ══════════════════ */}
        <section
          id="chi-sono"
          data-cinema-stage="3"
          data-cinema-surface="light"
          className="cinema-section py-20 sm:py-28 lg:py-36"
        >
          <div className="cinema-section-bg bg-paper" />
          <div className="shell cinema-section-fg grid items-center gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <Reveal>
              <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                <span className="block overflow-hidden rounded-sm shadow-[0_40px_70px_-45px_rgba(16,61,48,0.55)] ring-1 ring-line">
                  <Image
                    src="/persone/ivano.jpg"
                    alt="Ivano, fondatore di Oasi Properties"
                    width={560}
                    height={700}
                    sizes="(min-width: 1024px) 380px, 90vw"
                    className="aspect-[4/5] h-auto w-full object-cover"
                  />
                </span>
                <span className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-forest px-4 py-2 text-sm font-medium text-paper shadow-lg">
                  <IconCheck className="h-4 w-4 text-brass" />
                  Host verificato su Airbnb
                </span>
              </div>
            </Reveal>
            <div className="lg:pt-2">
              <Reveal
                as="h2"
                className="font-display text-[clamp(2rem,4vw,3.1rem)] font-semibold text-balance text-ink"
              >
                Dietro ogni immobile,
                <br className="hidden sm:inline" />{" "}
                una persona. Non un call center.
              </Reveal>
              <Reveal
                as="p"
                delay={100}
                className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
              >
                Sono Ivano, fondatore di Oasi Properties. Gestisco affitti brevi
                da 5 anni tra Torino e la Riviera ligure: oltre 7.000
                prenotazioni, un metodo costruito ospite dopo ospite e
                proprietari che mi affidano il loro immobile da anni.
              </Reveal>
              <Reveal
                as="p"
                delay={150}
                className="mt-4 max-w-xl text-lg leading-relaxed text-muted"
              >
                Ogni proprietario lavora direttamente con me e con il mio team:
                conosco ogni immobile che gestiamo, e rispondo personalmente dei
                risultati.
              </Reveal>
              <Reveal delay={200} className="mt-9">
                <a href="#valutazione" className="btn btn-primary">
                  Parliamo del tuo immobile{" "}
                  <IconArrow className="h-4 w-4" />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════════ CTA + FORM — stadio 4 ══════════════════ */}
        <section
          data-cinema-stage="4"
          data-cinema-surface="dark"
          className="cinema-section overflow-hidden py-20 text-paper sm:py-28 lg:py-36"
        >
          <div className="cinema-section-bg bg-forest-2" />
          <div
            aria-hidden
            className="cinema-section-bg opacity-50"
            style={{
              background:
                "radial-gradient(80% 60% at 10% 0%, rgba(20,73,58,0.5) 0%, transparent 50%)",
            }}
          />
          <div className="shell cinema-section-fg grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:pt-2">
              <Reveal
                as="h2"
                className="font-display text-[clamp(2.15rem,4.4vw,3.25rem)] font-semibold"
              >
                Ricevi una valutazione personalizzata.
              </Reveal>
              <Reveal
                as="p"
                delay={120}
                className="mt-6 max-w-md text-lg leading-relaxed text-paper/65"
              >
                In pochi minuti capiamo insieme quanto può rendere il tuo
                immobile e qual è il modello di gestione più adatto. Senza
                impegno.
              </Reveal>
              <Reveal delay={180} className="mt-9 space-y-3.5">
                {[
                  "Risposta da un consulente Oasi Properties",
                  "Analisi del potenziale, non una stima automatica",
                  "Nessun costo, nessun vincolo",
                ].map((x) => (
                  <div
                    key={x}
                    className="flex items-start gap-3 text-paper/75"
                  >
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
                    {x}
                  </div>
                ))}
              </Reveal>
            </div>

            {/* Form target: never wrap LeadForm in Reveal */}
            <div id="valutazione">
              <LeadForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileCta
        href="#valutazione"
        label="Richiedi la valutazione gratuita"
        targetId="valutazione"
      />
    </PageTransition>
  );
}
