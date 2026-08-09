import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { PageTransition } from "@/components/layout/page-transition";

export const metadata: Metadata = {
  title: "Informativa privacy — Oasi Properties",
  description:
    "Informazioni sul trattamento dei dati inviati tramite i moduli di Oasi Properties.",
  robots: { index: true, follow: true },
};

/* Qui la pagina è chiara fin dall'alto: la barra del browser deve seguirla,
   non restare verde come sulle pagine con hero scuro. */
export const viewport: Viewport = {
  themeColor: "#fafbf8",
  colorScheme: "light",
};

const sections = [
  {
    title: "Titolare del trattamento",
    body: (
      <p>
        Oasi Properties Srl, P.IVA 13480230013, con sede in Strada
        Sant&apos;Anselmo 13, 10024 Moncalieri (TO). Per richieste relative ai
        dati personali puoi scrivere al Titolare presso questa sede.
      </p>
    ),
  },
  {
    title: "Dati raccolti",
    body: (
      <p>
        I moduli raccolgono i dati di contatto che inserisci — nome, email e
        telefono — e le informazioni necessarie a valutare il tuo immobile o
        una possibile collaborazione, come località, caratteristiche
        dell&apos;immobile e profilo professionale. Possiamo inoltre registrare
        dati tecnici e di provenienza della richiesta per sicurezza e
        misurazione delle campagne.
      </p>
    ),
  },
  {
    title: "Finalità e base giuridica",
    body: (
      <p>
        Usiamo i dati per rispondere alla tua richiesta, preparare una
        valutazione e approfondire una possibile collaborazione. Il trattamento
        è necessario per eseguire misure precontrattuali richieste da te. I
        controlli tecnici servono a proteggere i moduli da abusi e richieste
        automatiche.
      </p>
    ),
  },
  {
    title: "Conferimento e destinatari",
    body: (
      <p>
        I campi indicati come obbligatori sono necessari per poterti
        ricontattare: senza questi dati non possiamo gestire la richiesta. I
        dati possono essere trattati da personale autorizzato e da fornitori
        tecnici che supportano hosting, sicurezza e inoltro delle richieste,
        nei limiti delle attività affidate. I dati non vengono diffusi.
      </p>
    ),
  },
  {
    title: "Conservazione",
    body: (
      <p>
        Conserviamo i dati per il tempo necessario a gestire la richiesta e
        gli eventuali contatti successivi. Possiamo conservarli più a lungo
        quando serve per adempiere a obblighi di legge o tutelare un diritto;
        terminata la necessità, vengono cancellati o resi anonimi.
      </p>
    ),
  },
  {
    title: "I tuoi diritti",
    body: (
      <p>
        Puoi chiedere accesso, rettifica, cancellazione, limitazione,
        opposizione e, quando applicabile, portabilità dei dati. Puoi inoltre
        proporre reclamo al Garante per la protezione dei dati personali. Per
        esercitare i tuoi diritti, contatta il Titolare all&apos;indirizzo indicato
        sopra.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <PageTransition>
      {/* Pagina chiara fin dall'alto: barra sempre piena, altrimenti il logo
          bianco resterebbe invisibile sopra il fondo paper. */}
      <Nav
        tone="light"
        alwaysSolid
        links={[
          { href: "/#come-funziona", label: "Come funziona" },
          { href: "/#recensioni", label: "Recensioni" },
          { href: "/partner", label: "Per professionisti" },
        ]}
        cta={{ href: "/#valutazione", label: "Valutazione gratuita" }}
      />

      <main id="top" tabIndex={-1} className="bg-paper pt-28 sm:pt-32">
        <section className="shell pb-20 pt-10 lg:pb-28 lg:pt-16">
          <div className="max-w-3xl">
            <h1 className="font-display text-[clamp(2.3rem,5vw,4rem)] font-semibold text-ink">
              Informativa privacy
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Come trattiamo i dati che ci invii tramite i moduli di valutazione
              e collaborazione.
            </p>
            <p className="tnum mt-4 text-xs text-muted">
              Ultimo aggiornamento: 9 agosto 2026
            </p>
          </div>

          <div className="mt-12 max-w-3xl divide-y divide-line border-y border-line">
            {sections.map((section) => (
              <section
                key={section.title}
                className="py-7 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-10 sm:py-8"
              >
                <h2 className="font-display text-lg font-semibold text-ink">
                  {section.title}
                </h2>
                <div className="mt-3 leading-7 text-muted sm:mt-0">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/" className="btn btn-primary">
              Torna al sito
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </PageTransition>
  );
}
