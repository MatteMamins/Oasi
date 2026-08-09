"use client";

import { useEffect } from "react";
import { scrollToId } from "@/lib/scroll";

/* Intercetta i link interni alla pagina per applicare la regola di scroll
   condivisa (istantaneo sui salti lunghi, morbido su quelli brevi). */
export function SmartAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;

      // Solo ancore interne alla pagina già aperta
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;

      const id = decodeURIComponent(url.hash.slice(1));
      if (!id) return;

      if (scrollToId(id)) {
        event.preventDefault();
        history.pushState(null, "", url.hash);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
