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
