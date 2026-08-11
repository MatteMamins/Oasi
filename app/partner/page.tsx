import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { PageTransition } from "@/components/layout/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { HouseCinema } from "@/components/motion/house-cinema";
import { Footer } from "@/components/layout/footer";
import { MobileCta } from "@/components/layout/mobile-cta";
import { PartnerForm } from "@/components/forms/partner-form";
import { PartnerRoleLink } from "@/components/forms/partner-role-link";
import {
  IconArrow,
  IconCheck,
  IconChevronDown,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Oasi Properties — Partnership per professionisti immobiliari",
  description:
    "Un'infrastruttura operativa, fiscale e commerciale per property manager, agenzie e professionisti che vogliono valorizzare immobili insieme a Oasi.",
};

const profiles = [
  {
    title: "Property manager",
    text: "Porta il tuo portfolio dentro una struttura operativa già pronta.",
  },
  {
    title: "Agenzia immobiliare",
    text: "Amplia i servizi senza aprire una nuova linea operativa interna.",
  },
  {
    title: "Agente o segnalatore",
    text: "Condividi opportunità immobiliari con un team che le valuta e gestisce.",
  },
  {
    title: "Altro professionista",
    text: "Raccontaci come lavori: valutiamo insieme una collaborazione adatta.",
  },
];

const benefits = [
  {
    n: "01",
    title: "Più tempo e capacità",
    text: "Oasi gestisce adempimenti, fiscalità, revenue e assistenza ospiti. Tu mantieni il focus sulle relazioni e sulla crescita.",
  },
  {
    n: "02",
    title: "Infrastruttura pronta",
    text: "PMS, pricing dinamico, contratti e reportistica: processi già operativi, senza doverli costruire da zero.",
  },
  {
    n: "03",
    title: "Crescita condivisa",
    text: "Modello, percentuale e responsabilità vengono definiti insieme, in base al contesto, ai servizi e al portfolio.",
  },
];

const steps = [
  {
    n: "01",
    title: "Ci racconti il contesto",
    text: "Una prima call per capire come lavori, dove operi e quali immobili vuoi valorizzare.",
  },
  {
    n: "02",
    title: "Definiamo la collaborazione",
    text: "Concordiamo modello operativo, responsabilità e percentuale in modo chiaro.",
  },
  {
    n: "03",
    title: "Attiviamo e cresciamo",
    text: "Avviamo la gestione degli immobili e condividiamo dati e risultati con report trasparenti.",
  },
];

const faq = [
  {
    q: "Quanto costa la partnership?",
    a: "Lavoriamo a percentuale, definita caso per caso in base agli immobili, alla zona e ai servizi attivati. Ne parliamo nella prima call.",
  },
  {
    q: "Chi gestisce il rapporto con i proprietari?",
    a: "Il modello di comunicazione viene definito insieme, in base alle esigenze del partner, dei proprietari e del portfolio.",
  },
  {
    q: "In quali zone operate?",
    a: "Operiamo a Torino e nel Nord Italia. La fattibilità dipende dalla zona e dalle attività da coordinare sul territorio.",
  },
];

const responsibilities = [
  {
    title: "Tu porti",
    items: [
      "Relazione e opportunità",
      "Conoscenza del territorio",
      "Crescita commerciale",
    ],
  },
  {
    title: "Oasi gestisce",
    items: [
      "Operatività e ospiti",
      "Prezzi e distribuzione",
      "Fiscalità e report",
    ],
  },
];

export default function Partner() {
  return (
    <PageTransition>
      <Nav
        tone="dark"
        links={[
          { href: "#percorsi", label: "Chi sei" },
          { href: "#benefici", label: "Benefici" },
          { href: "#faq", label: "FAQ" },
          { href: "/", label: "Per i proprietari" },
        ]}
        cta={{ href: "#contatti", label: "Valutiamo una collaborazione" }}
      />

      <main id="top" tabIndex={-1} className="relative">
        <HouseCinema />

        {/* ══════════════════ HERO — stadio 0 ══════════════════ */}
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
          {/* Come nella home: l'hero entra via CSS, non aspetta l'hydration. */}
          <div className="shell cinema-section-fg max-w-4xl">
            <h1 className="rise font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold tracking-tight text-balance text-paper">
              Porta immobili a Oasi.
              <br className="hidden sm:inline" />{" "}
              Costruiamo valore insieme.
            </h1>
            <p
              className="rise mt-7 max-w-2xl text-lg leading-relaxed text-paper/70 sm:text-xl"
              style={{ "--rise-delay": "80ms" } as React.CSSProperties}
            >
              Tu porti l&apos;opportunità o il portfolio. Oasi gestisce prezzi,
              fiscalità, operatività e ospiti.
            </p>
            <div
              className="rise mt-11 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6"
              style={{ "--rise-delay": "140ms" } as React.CSSProperties}
            >
              <a href="#contatti" className="btn btn-brass">
                Valutiamo una collaborazione
                <IconArrow className="h-4 w-4" />
              </a>
              <p className="flex items-center gap-2 text-sm text-paper/55">
                <IconCheck className="h-4 w-4 shrink-0 text-brass" />
                <span className="tnum">7.000+ prenotazioni gestite</span>
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════ PERCORSI — stadio 1 ══════════════════ */}
        <section
          id="percorsi"
          data-cinema-stage="1"
          data-cinema-surface="light"
          className="cinema-section py-20 sm:py-28 lg:py-36"
        >
          <div className="cinema-section-bg bg-paper" />
          <div className="shell cinema-section-fg">
            <Reveal className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-semibold text-ink">
                Parti dal profilo che ti rappresenta.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Il modello cambia in base a come lavori. La prima call serve a
                capire subito quale collaborazione ha senso per te.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {profiles.map((profile, index) => (
                <Reveal key={profile.title} delay={index * 70}>
                  <PartnerRoleLink role={profile.title} text={profile.text} />
                </Reveal>
              ))}
            </div>

            <Reveal
              delay={120}
              className="mt-10 overflow-hidden rounded-sm border border-line bg-stone"
            >
              <div className="border-b border-line px-6 py-5 sm:px-8">
                <h3 className="font-display text-xl font-semibold text-ink">
                  Una collaborazione, responsabilità chiare.
                </h3>
              </div>
              <div className="grid md:grid-cols-2">
                {responsibilities.map((group, index) => (
                  <div
                    key={group.title}
                    className={`px-6 py-7 sm:px-8 ${
                      index === 0
                        ? "border-b border-line md:border-r md:border-b-0"
                        : ""
                    }`}
                  >
                    <p className="text-sm font-semibold text-forest">
                      {group.title}
                    </p>
                    <ul className="mt-5 space-y-3.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-muted"
                        >
                          <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ BENEFICI — stadio 2 ══════════════════ */}
        <section
          id="benefici"
          data-cinema-stage="2"
          data-cinema-surface="dark"
          className="cinema-section overflow-hidden py-20 text-paper sm:py-28 lg:py-36"
        >
          <div className="cinema-section-bg bg-forest-2" />
          <div className="shell cinema-section-fg">
            <Reveal className="max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-semibold">
                Tre cose che non devi più costruire da solo.
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
              {benefits.map((benefit, index) => (
                <Reveal
                  key={benefit.title}
                  delay={index * 90}
                  className="border-t border-white/15 pt-8"
                >
                  <p className="tnum text-xs tracking-wide text-brass">
                    {benefit.n}
                  </p>
                  <h3 className="font-display mt-5 text-[clamp(1.5rem,2.4vw,1.85rem)] font-semibold text-brass">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-paper/65">
                    {benefit.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ PROCESSO — stadio 3 ══════════════════ */}
        <section
          id="processo"
          data-cinema-stage="3"
          data-cinema-surface="light"
          className="cinema-section py-20 sm:py-28 lg:py-36"
        >
          <div className="cinema-section-bg bg-paper" />
          <div className="shell cinema-section-fg">
            <Reveal className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-semibold text-ink">
                Dal primo confronto all&apos;operatività, in tre passaggi.
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
              {steps.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 90}
                  className="relative pt-6"
                >
                  <span
                    aria-hidden
                    className="tnum absolute -top-6 left-0 text-6xl font-medium text-mist"
                  >
                    {item.n}
                  </span>
                  <div className="relative">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ FAQ — stadio 3 ══════════════════ */}
        <section
          id="faq"
          data-cinema-stage="3"
          data-cinema-surface="light"
          className="cinema-section py-20 sm:py-28 lg:py-32"
        >
          <div className="cinema-section-bg bg-stone" />
          <div className="shell cinema-section-fg max-w-3xl">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,4vw,2.85rem)] font-semibold text-ink">
                Le tre domande essenziali.
              </h2>
            </Reveal>
            <Reveal delay={90} className="mt-12 border-t border-line">
              {faq.map((item) => (
                <details key={item.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <IconChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="max-w-2xl pb-7 leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ══════════════════ CONTATTI + FORM — stadio 4 (light/calm) ══════════════════ */}
        <section
          id="contatti"
          data-cinema-stage="4"
          data-cinema-surface="light"
          className="cinema-section py-20 sm:py-28 lg:py-36"
        >
          <div className="cinema-section-bg bg-paper" />
          <div className="shell cinema-section-fg grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:pt-2">
              <Reveal
                as="h2"
                className="font-display text-[clamp(2.15rem,4.4vw,3.25rem)] font-semibold text-ink"
              >
                Valutiamo una collaborazione.
              </Reveal>
              <Reveal
                as="p"
                delay={100}
                className="mt-6 max-w-md text-lg leading-relaxed text-muted"
              >
                Dicci come lavori e dove operi. Useremo queste informazioni per
                capire insieme se e come collaborare.
              </Reveal>
              <Reveal delay={160} className="mt-9 space-y-3.5">
                {["Confronto diretto", "Nessun costo, nessun impegno"].map(
                  (item) => (
                    <p key={item} className="flex items-center gap-3 text-ink">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mist text-forest">
                        <IconCheck className="h-4 w-4" />
                      </span>
                      {item}
                    </p>
                  ),
                )}
              </Reveal>
            </div>

            {/* Come nella home: il modulo è il bersaglio delle CTA, quindi non
                passa da <Reveal> e non dipende dall'hydration. */}
            <div id="call">
              <PartnerForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileCta
        href="#contatti"
        label="Valutiamo una collaborazione"
        targetId="contatti"
      />
    </PageTransition>
  );
}
