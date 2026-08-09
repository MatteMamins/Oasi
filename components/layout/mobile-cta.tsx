"use client";

import { useEffect, useState } from "react";
import { IconArrow } from "@/components/ui/icons";

/* Barra d'azione fissa per il mobile: senza, dopo l'hero l'unico modo di
   arrivare al modulo è scorrere tutta la pagina o aprire l'hamburger.
   Compare quando l'hero è uscito e sparisce quando il modulo è a schermo,
   così non duplica mai l'azione che l'utente ha già davanti. */
export function MobileCta({
  href,
  label,
  targetId,
}: {
  href: string;
  label: string;
  /* id della sezione con il modulo: quando entra nel viewport la barra esce */
  targetId: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const pastHero = window.scrollY > window.innerHeight * 0.75;
      const target = document.getElementById(targetId);
      const targetInView = target
        ? target.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(pastHero && !targetInView);
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
  }, [targetId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      /* Fuori schermo non deve restare raggiungibile da tastiera o screen reader */
      aria-hidden={!visible}
      inert={!visible || undefined}
    >
      <div className="border-t border-line bg-paper/95 px-[var(--edge)] pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md">
        <a href={href} className="btn btn-primary w-full">
          {label}
          <IconArrow className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
