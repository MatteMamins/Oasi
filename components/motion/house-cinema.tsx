"use client";

import { useEffect, useRef } from "react";

/* Scroll-cinema: front elevation that “builds” while you scroll the
   landing. Stages come from data-cinema-stage on sections. Updates only
   dataset (no re-render for stages). Openings appear fully at stage 3. */

type Surface = "light" | "dark";

function FrontElevation() {
  return (
    <svg
      className="house-svg"
      viewBox="0 0 1000 1000"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      aria-hidden="true"
    >
      {/* Soft glow behind house — stage 4 */}
      <circle className="house-glow" cx="500" cy="520" r="260" />

      {/* Construction grid — stage 0+ (fades at 4) */}
      <g className="house-layer house-layer-grid">
        <path
          className="house-stroke house-stroke-grid"
          pathLength={1}
          d="M0 200H1000M0 400H1000M0 600H1000M0 800H1000M200 0V1000M400 0V1000M600 0V1000M800 0V1000"
        />
      </g>

      {/* Ground line + foundation under body — stage 0 */}
      <g className="house-layer house-layer-ground">
        <path
          className="house-stroke house-stroke-ground"
          pathLength={1}
          d="M180 760H820"
        />
        <path
          className="house-stroke house-stroke-ground"
          pathLength={1}
          d="M340 740H660V760H340Z"
        />
      </g>

      {/* Outer silhouette (body + gable) — tracer only, not a stage layer */}
      <defs>
        <path
          id="house-silhouette"
          pathLength={1}
          d="M320 740V420H300L500 280L700 420H680V740Z"
        />
      </defs>

      {/* Façade body — stage 1 */}
      <path
        className="house-stroke house-layer house-layer-body"
        pathLength={1}
        d="M320 420H680V740H320Z"
      />

      {/* Gable roof — stage 2 */}
      <g className="house-layer house-layer-roof">
        <path
          className="house-stroke"
          pathLength={1}
          d="M300 420L500 280L700 420"
        />
        <path
          className="house-stroke house-stroke-eave"
          pathLength={1}
          d="M300 420H700"
        />
      </g>

      {/* Door + windows — stage 3 (full at once) */}
      <g className="house-layer house-layer-openings">
        <path
          className="house-stroke"
          pathLength={1}
          d="M470 580H530V740H470Z"
        />
        <path
          className="house-stroke"
          pathLength={1}
          d="M360 500H430V570H360Z"
        />
        <path
          className="house-stroke"
          pathLength={1}
          d="M570 500H640V570H570Z"
        />
        <path
          className="house-stroke house-stroke-mullion"
          pathLength={1}
          d="M395 500V570M360 535H430M605 500V570M570 535H640"
        />
      </g>

      {/* Chimney + door step — stage 4 */}
      <g className="house-layer house-layer-detail">
        <path
          className="house-stroke"
          pathLength={1}
          d="M600 320H640V380"
        />
        <path
          className="house-stroke"
          pathLength={1}
          d="M460 740H540V752H460Z"
        />
      </g>

      {/* Tracer along outer silhouette — stage 4 */}
      <use href="#house-silhouette" className="house-tracer" />
    </svg>
  );
}

export function HouseCinema() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      const first = document.querySelector<HTMLElement>("[data-cinema-stage]");
      const firstSurface =
        first?.dataset.cinemaSurface === "light" ? "light" : "dark";
      root.dataset.stage = "4";
      root.dataset.surface = firstSurface;
      root.dataset.ready = "true";
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-cinema-stage]"),
    );
    if (!sections.length) return;

    const ratios = new Map<HTMLElement, number>();
    let raf = 0;
    let stage = 0;
    let surface: Surface = "dark";

    const apply = () => {
      root.dataset.stage = String(stage);
      root.dataset.surface = surface;
      root.dataset.ready = "true";
    };

    const pickDominant = () => {
      let best: HTMLElement | null = null;
      let bestRatio = 0;
      for (const el of sections) {
        const r = ratios.get(el) ?? 0;
        if (r > bestRatio) {
          bestRatio = r;
          best = el;
        }
      }
      /* If no section intersects enough (gaps), keep last known stage
         but still allow surface to settle from the dominant pick. */
      if (best && bestRatio > 0.02) {
        const nextStage = Number(best.dataset.cinemaStage ?? 0);
        const nextSurface =
          best.dataset.cinemaSurface === "light" ? "light" : "dark";
        if (nextStage !== stage || nextSurface !== surface) {
          stage = nextStage;
          surface = nextSurface;
        }
      }
    };

    const tick = () => {
      raf = 0;
      pickDominant();
      apply();
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target as HTMLElement,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        schedule();
      },
      {
        threshold: [0, 0.08, 0.16, 0.28, 0.4, 0.55, 0.7, 0.85, 1],
        rootMargin: "-12% 0px -18% 0px",
      },
    );

    sections.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="house-cinema"
      data-stage="0"
      data-surface="dark"
      data-ready="false"
      aria-hidden="true"
    >
      <div className="house-plane">
        <FrontElevation />
      </div>
    </div>
  );
}
