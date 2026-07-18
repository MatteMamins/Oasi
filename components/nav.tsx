"use client";

import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { IconMenu, IconClose } from "./icons";

const links = [
  { href: "#come-funziona", label: "Come funziona" },
  { href: "#recensioni", label: "Recensioni" },
  { href: "#chi-sono", label: "Chi c'è dietro" },
];

export function Nav() {
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
  const dark = !solid; // navbar sopra l'hero scuro

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-paper/90 shadow-[0_1px_0_var(--color-line),0_10px_30px_-24px_rgba(16,61,48,0.4)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="shell flex items-center justify-between py-4">
        <a href="#top" className="shrink-0" aria-label="Torna all'inizio">
          <Logo tone={dark ? "light" : "dark"} />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  dark
                    ? "text-paper/75 hover:text-paper"
                    : "text-muted hover:text-forest"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#valutazione"
            className={`btn ${dark ? "btn-brass" : "btn-primary"}`}
          >
            Richiedi una valutazione
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
        <div className="border-t border-line bg-paper lg:hidden">
          <ul className="shell flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#valutazione"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                Richiedi una valutazione
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
