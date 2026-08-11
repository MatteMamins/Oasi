import Link from "next/link";
import { Logo } from "@/components/ui/logo";

/* Footer condiviso tra la landing proprietari e la pagina Partner.
   I link sono assoluti così funzionano da entrambe le pagine. */

/* Elenchi fitti di link `text-sm` danno bersagli da ~22px: su mobile si
   sbaglia voce di continuo. `min-h-11` porta ogni riga a 44px. */
const fLink =
  "flex min-h-11 items-center text-paper/60 transition-colors duration-200 hover:text-brass";

export function Footer() {
  return (
    <footer className="relative z-[2] bg-forest-3 py-14 text-paper/60">
      <div className="shell">
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row md:gap-12">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-paper/55">
              Gestione affitti brevi a 360°. Redditività e qualità in un&apos;unica
              gestione, con la precisione dei grandi modelli e la cura di una
              gestione dedicata.
            </p>
          </div>
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav className="flex flex-col text-sm" aria-label="Sito">
              <span className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-paper/45">
                Sito
              </span>
              <Link href="/#come-funziona" className={fLink}>
                Come funziona
              </Link>
              <Link href="/#recensioni" className={fLink}>
                Recensioni
              </Link>
              <Link href="/#chi-sono" className={fLink}>
                Chi c&apos;è dietro
              </Link>
              <Link href="/partner" className={fLink}>
                Programma Partner
              </Link>
            </nav>
            <div className="flex flex-col text-sm">
              <span className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-paper/45">
                Contatti
              </span>
              <Link href="/#valutazione" className={fLink}>
                Valutazione gratuita
              </Link>
              <Link href="/partner#call" className={fLink}>
                Valuta una collaborazione
              </Link>
              <span className="flex min-h-11 items-center text-paper/50">
                Torino e Nord Italia
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-8 text-xs text-paper/40 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Oasi Properties Srl — Strada
            Sant&apos;Anselmo 13, 10024 Moncalieri (TO) — P.IVA 13480230013
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 sm:items-center">
            <Link
              href="/privacy"
              className="flex min-h-11 items-center transition-colors duration-200 hover:text-brass"
            >
              Informativa privacy
            </Link>
            <p className="flex min-h-11 items-center sm:min-h-0">
              Dati e recensioni dal profilo host verificato.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
