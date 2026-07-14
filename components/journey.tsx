"use client";

import { useEffect, useRef } from "react";

type Step = { n: string; title: string; text: string };

/* Timeline "Il percorso": una linea in ottone si disegna mentre scorri,
   e ogni tappa si accende quando la linea la raggiunge. Tutto viene
   aggiornato via ref (nessun re-render), quindi lo scroll resta fluido.
   Rispetta prefers-reduced-motion: percorso già completo, nessun listener. */
export function Journey({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const stationRefs = useRef<Array<HTMLLIElement | null>>([]);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;

    const nodeCenter = (el: HTMLSpanElement) =>
      el.offsetTop + el.offsetHeight / 2;

    const setActive = (i: number, on: boolean) => {
      const li = stationRefs.current[i];
      if (li) li.dataset.active = on ? "true" : "false";
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      fill.style.height = "100%";
      steps.forEach((_, i) => setActive(i, true));
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const nodes = nodeRefs.current;
      const last = nodes[nodes.length - 1];
      if (!last) return;

      const rect = list.getBoundingClientRect();
      // "fronte" del percorso: 60% dell'altezza viewport, in coord. lista
      const front = window.innerHeight * 0.6 - rect.top;

      fill.style.height = `${Math.max(0, Math.min(front, nodeCenter(last)))}px`;
      nodes.forEach((n, i) => setActive(i, !!n && nodeCenter(n) <= front));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [steps]);

  return (
    <ol ref={listRef} className="journey">
      <span className="journey-track" aria-hidden />
      <span ref={fillRef} className="journey-fill" aria-hidden />
      {steps.map((s, i) => (
        <li
          key={s.n}
          ref={(el) => {
            stationRefs.current[i] = el;
          }}
          className="journey-station"
          data-active="false"
        >
          <span
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className="journey-node tnum font-display"
          >
            {s.n}
          </span>
          <div className="journey-body">
            <h3 className="font-display">{s.title}</h3>
            <p>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
