"use client";

import * as React from "react";

/* React chiama document.startViewTransition solo se nell'albero c'è un
   <ViewTransition> coinvolto nella navigazione: questo wrapper (animazione
   propria disattivata) serve ad attivare la transizione, mentre il flip
   vero è definito in globals.css sul root via html[data-flip].
   L'export non è ancora nei tipi di @types/react, da cui il cast. */
const ViewTransition = (
  React as unknown as {
    ViewTransition: React.ComponentType<{
      children: React.ReactNode;
      default?: string;
    }>;
  }
).ViewTransition;

export function PageTransition({ children }: { children: React.ReactNode }) {
  return <ViewTransition default="none">{children}</ViewTransition>;
}
