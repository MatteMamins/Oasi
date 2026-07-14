"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconStar } from "./icons";

export type Slide = {
  src: string;
  place: string;
  rating: string | null;
};

/* Slideshow degli immobili in gestione: avanza da solo ogni 4,5s con
   dissolvenza incrociata. Nessun input necessario; i puntini permettono
   comunque di saltare a una foto. Con prefers-reduced-motion l'autoplay
   si ferma e resta la navigazione manuale. */
export function Showcase({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setActive((v) => (v + 1) % slides.length);
    }, 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="relative">
      {/* cornice ottone sfalsata, per profondità */}
      <div
        aria-hidden
        className="absolute -right-3 -bottom-3 h-full w-full rounded-2xl border border-brass/40"
      />
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_45px_80px_-40px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
        {slides.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={`Immobile in gestione a ${s.place}`}
            fill
            sizes="(min-width: 1024px) 42vw, 92vw"
            priority={i === 0}
            className={`object-cover transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* velo + didascalia */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <div className="text-paper">
            <p className="eyebrow text-paper/60">In gestione</p>
            <p className="mt-1 flex items-center gap-2 font-display text-lg font-semibold">
              {slides[active].place}
              <span className="flex items-center gap-1 text-sm font-normal text-brass">
                {slides[active].rating ? (
                  <>
                    <IconStar className="h-3.5 w-3.5" />
                    <span className="tnum">{slides[active].rating}</span>
                  </>
                ) : (
                  "Novità"
                )}
              </span>
            </p>
          </div>
          <div className="flex gap-1.5 pb-1.5">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Mostra immobile a ${s.place}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-brass" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
