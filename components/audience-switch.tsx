"use client";

import Link from "next/link";
import { primeFlip } from "@/lib/flip";

/* Selettore proprietari ⇄ partner: è la prima scelta in cima a entrambi
   gli hero. Il lato attivo è pieno (ottone), l'altro è il link che gira
   la carta verso l'altra faccia del sito. */

const seg =
  "flex-1 rounded-full px-4 py-2 text-center text-sm font-medium leading-snug transition-colors sm:flex-none";

export function AudienceSwitch({ active }: { active: "owner" | "partner" }) {
  return (
    <div className="inline-flex max-w-full items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm">
      {active === "owner" ? (
        <span aria-current="page" className={`${seg} bg-brass text-forest-3`}>
          Sono un proprietario
        </span>
      ) : (
        <Link
          href="/"
          onClick={() => primeFlip("owner")}
          className={`${seg} text-paper/70 hover:text-paper`}
        >
          Sono un proprietario
        </Link>
      )}
      {active === "partner" ? (
        <span aria-current="page" className={`${seg} bg-brass text-forest-3`}>
          Lavoro nel settore
        </span>
      ) : (
        <Link
          href="/partner"
          onClick={() => primeFlip("partner")}
          className={`${seg} text-paper/70 hover:text-paper`}
        >
          Lavoro nel settore
        </Link>
      )}
    </div>
  );
}
