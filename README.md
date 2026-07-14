# Oasi Properties — Landing proprietari

Landing page orientata alla lead generation per la gestione immobiliare a 360°.
Costruita con **Next.js 16 + React 19 + Tailwind CSS v4** (App Router, TypeScript).

## Avvio in locale

```bash
npm install
npm run dev        # http://localhost:3000
```

Build di produzione:

```bash
npm run build
npm start
```

## Dove arrivano i lead

Il form invia i dati a `POST /api/lead` (`app/api/lead/route.ts`). Oggi ogni lead
viene **registrato nei log del server** e, se impostata, inoltrato a un webhook.

Per collegarlo al tuo canale, imposta una variabile d'ambiente:

```bash
# .env.local
LEAD_WEBHOOK_URL="https://..."   # es. Zapier, Make, endpoint CRM, Google Sheet
```

In alternativa puoi sostituire il blocco commentato dentro `route.ts` con un invio
email (es. Resend), una write su Notion/Airtable o una chiamata al CRM.

### Tracciamento campagne (UTM)

Il form cattura automaticamente i parametri dei link pubblicitari e li allega al lead:
`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`,
`fbclid`, oltre a `referrer` e `landing_path`. Esempio di link per una campagna:

```
https://oasiproperties.it/?utm_source=meta&utm_campaign=lancio_estate
```

Così ogni contatto arriva già attribuito alla campagna che lo ha generato.

## Struttura

```
app/
  layout.tsx        Font (Fraunces / Instrument Sans / JetBrains Mono) + SEO metadata
  page.tsx          Composizione delle sezioni della landing
  globals.css       Design system (colori, tipografia, bottoni, animazioni)
  icon.svg          Favicon di brand
  api/lead/route.ts Endpoint di acquisizione lead (validazione + UTM + honeypot)
components/
  nav.tsx           Navbar adattiva (chiara sull'hero, scura allo scroll)
  owner-panel.tsx   Anteprima "area proprietario" con dati reali (hero)
  lead-form.tsx     Form lead con cattura UTM e stato di successo
  reveal.tsx        Animazioni di scroll (rispettano prefers-reduced-motion)
  icons.tsx, logo.tsx
```

## Design

- **Palette:** verde botanico `#103D30` + ottone `#C6A15B` + neutri pietra/salvia.
- **Dati reali** usati come prova sociale: 10 immobili, 358 recensioni, 4,56/5, 3 anni.
- Accessibilità: focus visibili, contrasto, `prefers-reduced-motion`, HTML semantico.

## Da completare prima del go-live

Verificare/aggiornare i contenuti soggetti a conferma (cfr. brief §15): perimetro
esatto dei servizi fiscali, aree servite, informativa privacy da linkare, ed
eventuali numeri illustrativi presenti nei mockup (prezzo medio, occupazione).
