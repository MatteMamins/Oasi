import type { Metadata } from "next";
import { Montserrat, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font del brand (dal logo Oasi Properties): geometrico, usato per i titoli
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://oasiproperties.it";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Oasi Properties — Il tuo immobile, gestito come un asset",
  description:
    "Proteggiamo la qualità del tuo immobile e ne ottimizziamo la redditività: ospiti, burocrazia, fiscalità e cura costante. Tu mantieni sempre visibilità e controllo.",
  keywords: [
    "gestione affitti brevi",
    "property management Torino",
    "gestione immobili",
    "affitti brevi Torino",
    "gestione Airbnb Torino",
  ],
  openGraph: {
    title: "Oasi Properties — Il tuo immobile, gestito come un asset",
    description:
      "Redditività e qualità in un'unica gestione a 360°. Richiedi una valutazione del tuo immobile.",
    type: "website",
    locale: "it_IT",
    siteName: "Oasi Properties",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body
        className={`${montserrat.variable} ${instrument.variable} ${mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
