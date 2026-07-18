"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { IconMenu, IconClose } from "./icons";
import { primeFlip } from "@/lib/flip";

type NavLink = { href: string; label: string };

const defaultLinks: NavLink[] = [
  { href: "#come-funziona", label: "Come funziona" },
  { href: "#recensioni", label: "Recensioni" },
  { href: "#chi-sono", label: "Chi c'è dietro" },
  { href: "/partner", label: "Partner" },
];

const defaultCta: NavLink = { href: "#valutazione", label: "Richiedi una valutazione" };

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

  const solid = scrolled || open;
  const dark = tone === "dark" || !solid; // testo chiaro sopra fondi scuri

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

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={cta.href}
            className={`btn ${dark ? "btn-brass" : "btn-primary"}`}
          >
            {cta.label}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-11 w-11 items-center justify-center rounded-sm border lg:hidden ${
            dark ? "border-white/30 text-paper" : "border-line text-forest"
          }`}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div
          className={`lg:hidden ${
            tone === "dark"
              ? "border-t border-white/10 bg-forest-3"
              : "border-t border-line bg-paper"
          }`}
        >
          <ul className="shell flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>{renderLink(l, true)}</li>
            ))}
            <li className="pt-3">
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
      )}
    </header>
  );
}
