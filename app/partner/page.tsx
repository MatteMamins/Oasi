import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { Footer } from "@/components/footer";
import { MobileCta } from "@/components/mobile-cta";
import { PartnerForm } from "@/components/partner-form";
import { PartnerRoleLink } from "@/components/partner-role-link";
import {
  IconArrow,
  IconCheck,
  IconChevronDown,
} from "@/components/icons";

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

      <main id="top" tabIndex={-1}>
        <section
          className="relative overflow-hidden pt-32 pb-16 sm:pt-44 sm:pb-24 lg:pb-36"
          style={{
            background:
              "radial-gradient(120% 90% at 80% -10%, #14493a 0%, #0b2a21 45%, #082019 100%)",
          }}
        >
          <div
            aria-hidden
            className="glow"
            style={{
              background: "rgba(198,161,91,0.14)",
              width: 420,
              height: 420,
              top: -80,
              right: 40,
            }}
          />
          {/* Come nella home: l'hero entra via CSS, non aspetta l'hydration. */}
          <div className="shell relative max-w-4xl">
            <h1 className="rise font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold text-balance text-paper">
              Porta immobili a Oasi.
              <br className="hidden sm:inline" />{" "}
              Costruiamo valore insieme.
            </h1>
            <p
              className="rise mt-6 max-w-2xl text-lg text-paper/70 sm:text-xl"
              style={{ "--rise-delay": "80ms" } as React.CSSProperties}
            >
              Tu porti l&apos;opportunità o il portfolio. Oasi gestisce prezzi,
              fiscalità, operatività e ospiti.
            </p>
            <div
              className="rise mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6"
              style={{ "--rise-delay": "140ms" } as React.CSSProperties}
            >
              <a href="#contatti" className="btn btn-brass">
                Valutiamo una collaborazione
                <IconArrow className="h-4 w-4" />
              </a>
              <p className="flex items-center gap-2 text-sm text-paper/60">
                <IconCheck className="h-4 w-4 shrink-0 text-brass" />
                <span className="tnum">7.000+ prenotazioni gestite</span>
              </p>
            </div>
          </div>
        </section>

        <section id="percorsi" className="bg-paper py-16 sm:py-24 lg:py-32">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold">
                Parti dal profilo che ti rappresenta.
              </h2>
              <p className="mt-4 text-lg text-muted">
                Il modello cambia in base a come lavori. La prima call serve a
                capire subito quale collaborazione ha senso per te.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {profiles.map((profile, index) => (
                <Reveal key={profile.title} delay={index * 70}>
                  <PartnerRoleLink role={profile.title} text={profile.text} />
                </Reveal>
              ))}
            </div>

            <Reveal
              delay={120}
              className="mt-8 overflow-hidden rounded-xl border border-line bg-stone"
            >
              <div className="border-b border-line px-6 py-5 sm:px-8">
                <h3 className="font-display text-xl font-semibold">
                  Una collaborazione, responsabilità chiare.
                </h3>
              </div>
              <div className="grid md:grid-cols-2">
                {responsibilities.map((group, index) => (
                  <div
                    key={group.title}
                    className={`px-6 py-6 sm:px-8 ${
                      index === 0
                        ? "border-b border-line md:border-r md:border-b-0"
                        : ""
                    }`}
                  >
                    <p className="text-sm font-semibold text-forest">{group.title}</p>
                    <ul className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-muted">
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

        <section
          id="benefici"
          className="relative overflow-hidden bg-forest-3 py-16 text-paper sm:py-24 lg:py-32"
        >
          <div
            aria-hidden
            className="glow"
            style={{
              background: "rgba(198,161,91,0.11)",
              width: 400,
              height: 400,
              bottom: -120,
              left: -100,
            }}
          />
          <div className="shell relative">
            <Reveal className="max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold">
                Tre cose che non devi più costruire da solo.
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
              {benefits.map((benefit, index) => (
                <Reveal
                  key={benefit.title}
                  delay={index * 90}
                  className="border-t border-white/15 pt-7"
                >
                  <p className="tnum text-xs text-brass">{benefit.n}</p>
                  <h3 className="font-display mt-4 text-2xl font-semibold text-brass">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 text-paper/65">{benefit.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="processo" className="bg-paper py-16 sm:py-24 lg:py-32">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold">
                Dal primo confronto all&apos;operatività, in tre passaggi.
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
              {steps.map((item, index) => (
                <Reveal key={item.title} delay={index * 90} className="relative pt-6">
                  <span
                    aria-hidden
                    className="tnum absolute -top-6 left-0 text-6xl font-medium text-mist"
                  >
                    {item.n}
                  </span>
                  <div className="relative">
                    <h3 className="font-display text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-muted">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-stone py-16 sm:py-24 lg:py-28">
          <div className="shell max-w-3xl">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,4vw,2.7rem)] font-semibold">
                Le tre domande essenziali.
              </h2>
            </Reveal>
            <Reveal delay={90} className="mt-10 border-t border-line">
              {faq.map((item) => (
                <details key={item.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <IconChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="max-w-2xl pb-6 text-muted">{item.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="contatti" className="bg-paper py-16 sm:py-24 lg:py-32">
          <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <div>
              <Reveal
                as="h2"
                className="font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold"
              >
                Valutiamo una collaborazione.
              </Reveal>
              <Reveal as="p" delay={100} className="mt-5 max-w-md text-lg text-muted">
                Dicci come lavori e dove operi. Useremo queste informazioni per
                capire insieme se e come collaborare.
              </Reveal>
              <Reveal delay={160} className="mt-8 space-y-3">
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
