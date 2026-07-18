import Link from "next/link";
import { Logo } from "./logo";

/* Footer condiviso tra la landing proprietari e la pagina Partner.
   I link sono assoluti così funzionano da entrambe le pagine. */
export function Footer() {
  return (
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
              <Link href="/#come-funziona" className="hover:text-brass">Come funziona</Link>
              <Link href="/#recensioni" className="hover:text-brass">Recensioni</Link>
              <Link href="/#chi-sono" className="hover:text-brass">Chi c&apos;è dietro</Link>
              <Link href="/partner" className="hover:text-brass">Programma Partner</Link>
            </nav>
            <div className="flex flex-col gap-2.5 text-sm">
              <span className="eyebrow mb-1 text-paper/40">Contatti</span>
              <Link href="/#valutazione" className="hover:text-brass">Richiedi una valutazione</Link>
              <Link href="/partner#call" className="hover:text-brass">Prenota una call partner</Link>
              <span>Torino e Nord Italia</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-8 text-xs text-paper/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Oasi Properties Srl — Strada
            Sant&apos;Anselmo 13, 10024 Moncalieri (TO) — P.IVA 13480230013
          </p>
          <p>Dati e recensioni dal profilo host verificato.</p>
        </div>
      </div>
    </footer>
  );
}
