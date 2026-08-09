# Shared layouts

These files define the global shell, navigation, footer, typography, metadata, and route-transition wrapper used by both Oasi audiences.

## `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Montserrat, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font del brand (dal logo Oasi Properties): geometrico, usato per i titoli
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://oasiproperties.it";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Oasi Properties — Il tuo immobile, gestito come un asset",
  description:
    "Proteggiamo la qualità del tuo immobile e ne ottimizziamo la redditività: ospiti, burocrazia, fiscalità e cura costante. Tu mantieni sempre visibilità e controllo.",
  keywords: [
    "gestione affitti brevi",
    "property management Torino",
    "gestione immobili",
    "affitti brevi Torino",
    "gestione Airbnb Torino",
  ],
  openGraph: {
    title: "Oasi Properties — Il tuo immobile, gestito come un asset",
    description:
      "Redditività e qualità in un'unica gestione a 360°. Richiedi una valutazione del tuo immobile.",
    type: "website",
    locale: "it_IT",
    siteName: "Oasi Properties",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" data-scroll-behavior="smooth">
      <body
        className={`${montserrat.variable} ${instrument.variable} ${mono.variable} antialiased`}
      >
        <a href="#top" className="skip-link">
          Vai al contenuto
        </a>
        {children}
      </body>
    </html>
  );
}
```

## `components/nav.tsx`

```tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { IconMenu, IconClose } from "./icons";
import { primeFlip } from "@/lib/flip";

type NavLink = { href: string; label: string };

const defaultLinks: NavLink[] = [
  { href: "#come-funziona", label: "Come funziona" },
  { href: "#recensioni", label: "Recensioni" },
  { href: "#chi-sono", label: "Chi c'è dietro" },
  { href: "/partner", label: "Per professionisti" },
];

const defaultCta: NavLink = {
  href: "#valutazione",
  label: "Valutazione gratuita",
};

/* I link verso l'altra faccia del sito girano la carta */
const isRoute = (href: string) => href.startsWith("/") && !href.startsWith("/#");
const flipDir = (href: string) => (href === "/partner" ? "partner" : "owner");

export function Nav({
  links = defaultLinks,
  cta = defaultCta,
  tone = "light",
}: {
  links?: NavLink[];
  cta?: NavLink;
  /* "light": barra chiara da scrollata (landing proprietari);
     "dark": barra sempre scura (pagina Partner) */
  tone?: "light" | "dark";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const solid = scrolled || open;
  const dark = tone === "dark" || !solid; // testo chiaro sopra fondi scuri
  const mobilePartnerLink = links.find((link) => link.href === "/partner");
  const mobileLinks = mobilePartnerLink
    ? links.filter((link) => link !== mobilePartnerLink)
    : links;

  const linkCls = (mobile = false) =>
    mobile
      ? `block py-3 text-base font-medium ${tone === "dark" ? "text-paper" : "text-ink"}`
      : `text-sm font-medium transition-colors ${
          dark ? "text-paper/75 hover:text-paper" : "text-muted hover:text-forest"
        }`;

  const renderLink = (l: NavLink, mobile = false) =>
    isRoute(l.href) ? (
      <Link
        href={l.href}
        onClick={() => {
          setOpen(false);
          primeFlip(flipDir(l.href));
        }}
        className={linkCls(mobile)}
      >
        {l.label}
      </Link>
    ) : (
      <a
        href={l.href}
        onClick={() => setOpen(false)}
        className={linkCls(mobile)}
      >
        {l.label}
      </a>
    );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? tone === "dark"
            ? "bg-forest-3/90 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"
            : "bg-paper/90 shadow-[0_1px_0_var(--color-line),0_10px_30px_-24px_rgba(16,61,48,0.4)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="shell flex items-center justify-between py-4">
        <a href="#top" className="shrink-0" aria-label="Torna all'inizio">
          <Logo tone={dark ? "light" : "dark"} />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>{renderLink(l)}</li>
          ))}
        </ul>

        <div
          className={`hidden items-center gap-3 transition-opacity duration-200 lg:flex ${
            tone === "light" && !solid
              ? "invisible opacity-0"
              : "visible opacity-100"
          }`}
        >
          <a
            href={cta.href}
            className={`btn ${dark ? "btn-brass" : "btn-primary"}`}
          >
            {cta.label}
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-11 w-11 items-center justify-center rounded-sm border lg:hidden ${
            dark ? "border-white/30 text-paper" : "border-line text-forest"
          }`}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          aria-controls={menuId}
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div
          id={menuId}
          className={`min-h-[calc(100dvh-76px)] overflow-y-auto lg:hidden ${
            tone === "dark"
              ? "border-t border-white/10 bg-forest-3"
              : "border-t border-line bg-paper"
          }`}
        >
          <div className="shell py-5">
            <p
              className={`pb-3 text-sm font-semibold ${
                tone === "dark" ? "text-paper/40" : "text-muted"
              }`}
            >
              Menu {tone === "dark" ? "partner" : "proprietari"}
            </p>
            <ul
              className={`flex flex-col border-t ${
                tone === "dark" ? "border-white/10" : "border-line"
              }`}
            >
              {mobileLinks.map((l) => (
                <li
                  key={l.href}
                  className={`border-b ${
                    tone === "dark" ? "border-white/10" : "border-line"
                  }`}
                >
                  {renderLink(l, true)}
                </li>
              ))}
              {mobilePartnerLink ? (
                <li
                  className={`border-b py-4 ${
                    tone === "dark" ? "border-white/10" : "border-line"
                  }`}
                >
                  <Link
                    href={mobilePartnerLink.href}
                    onClick={() => {
                      setOpen(false);
                      primeFlip("partner");
                    }}
                    className="group block"
                  >
                    <span
                      className={`block text-sm ${
                        tone === "dark" ? "text-paper/50" : "text-muted"
                      }`}
                    >
                      Lavori nel settore?
                    </span>
                    <span
                      className={`mt-1 flex items-center gap-1.5 font-semibold transition-colors ${
                        tone === "dark"
                          ? "text-paper group-hover:text-brass"
                          : "text-forest group-hover:text-brass-ink"
                      }`}
                    >
                      Scopri Oasi Partner
                      <span aria-hidden>→</span>
                    </span>
                  </Link>
                </li>
              ) : null}
              <li className="pt-5">
                <a
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className={`btn w-full ${tone === "dark" ? "btn-brass" : "btn-primary"}`}
                >
                  {cta.label}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
```

## `components/footer.tsx`

```tsx
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
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-14">
            <nav className="flex flex-col gap-2.5 text-sm">
              <span className="mb-1 font-semibold text-paper/70">Sito</span>
              <Link href="/#come-funziona" className="hover:text-brass">Come funziona</Link>
              <Link href="/#recensioni" className="hover:text-brass">Recensioni</Link>
              <Link href="/#chi-sono" className="hover:text-brass">Chi c&apos;è dietro</Link>
              <Link href="/partner" className="hover:text-brass">Programma Partner</Link>
            </nav>
            <div className="flex flex-col gap-2.5 text-sm">
              <span className="mb-1 font-semibold text-paper/70">Contatti</span>
              <Link href="/#valutazione" className="hover:text-brass">Valutazione gratuita</Link>
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
```

## `components/page-transition.tsx`

```tsx
"use client";

import * as React from "react";

/* Next.js 16.3 supporta le View Transitions senza flag di configurazione.
   React chiama document.startViewTransition solo se nell'albero c'è un
   <ViewTransition> coinvolto nella navigazione: questo wrapper (animazione
   propria disattivata) serve ad attivare la transizione, mentre il flip
   vero è definito in globals.css sul root via html[data-flip].
   L'export non è ancora nei tipi di @types/react, da cui il cast. */
const ViewTransition = (
  React as unknown as {
    ViewTransition: React.ComponentType<{
      children: React.ReactNode;
      default?: string;
    }>;
  }
).ViewTransition;

export function PageTransition({ children }: { children: React.ReactNode }) {
  return <ViewTransition default="none">{children}</ViewTransition>;
}
```
