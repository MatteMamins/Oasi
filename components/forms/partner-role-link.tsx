"use client";

import { IconArrow } from "@/components/ui/icons";

const STORAGE_KEY = "oasi-partner-form";

export function PartnerRoleLink({
  role,
  text,
}: {
  role: string;
  text: string;
}) {
  function rememberRole() {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      const values = saved
        ? (JSON.parse(saved) as Record<string, string>)
        : {};
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...values, ruolo: role }),
      );
    } catch {
      // Il form riceve comunque il valore tramite l'evento nella pagina.
    }

    window.dispatchEvent(
      new CustomEvent("oasi:partner-role", { detail: role }),
    );
  }

  return (
    <a
      href="#contatti"
      onClick={rememberRole}
      className="group flex h-full min-h-56 flex-col justify-between rounded-sm border border-line bg-paper p-7 ring-1 ring-transparent transition-colors duration-300 hover:border-forest hover:ring-forest/10"
    >
      <div>
        <h3 className="font-display text-xl font-semibold text-ink">{role}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
      </div>
      <span className="mt-8 flex items-center gap-2 text-sm font-medium text-forest">
        Raccontaci di te
        <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  );
}
