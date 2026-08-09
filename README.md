# Oasi Properties — Landing proprietari e partner

Landing page orientata alla lead generation per la gestione immobiliare a 360°.
Costruita con **Next.js 16 + React 19 + Tailwind CSS v4** (App Router, TypeScript).

## Avvio in locale

```bash
npm install
cp .env.example .env.local   # opzionale: compila le variabili che ti servono
npm run dev                  # http://localhost:3000
```

Build di produzione:

```bash
npm run build
npm start
```

## Dove arrivano i lead

I form (proprietari e partner) inviano a `POST /api/lead`
(`app/api/lead/route.ts`).

```
Browser (lead-form / partner-form)
        │
        ▼
   POST /api/lead
        │
        ├─► validazione, honeypot, max length, body size
        ├─► rate limit (Upstash Redis, se configurato)
        ├─► log ops SENZA PII  →  Runtime Logs Vercel
        └─► se LEAD_WEBHOOK_URL è impostata
                └─► POST JSON completo (con PII) al tuo canale
```

| Destinazione | Cosa contiene | Quando |
|---|---|---|
| **Webhook** (`LEAD_WEBHOOK_URL`) | Lead completo: nome, email, telefono, risposte, UTM | **Unica copia “utile” del contatto** |
| **Log server** | Solo eventi ops (`accepted`, `rate_limited`, …), **niente** nome/email/telefono | Sempre (debug / monitoraggio) |
| **Upstash Redis** | Contatori rate limit per IP | Solo anti-abuse, **non** salva i lead |

**Importante:** senza `LEAD_WEBHOOK_URL` il form risponde comunque `{ ok: true }`, ma il contatto **non viene salvato da nessuna parte**. Configura il webhook prima del go-live (o una persistenza dedicata, da implementare).

### Configurare dove finiscono i lead

1. Crea un endpoint che accetta `POST` con body JSON, ad esempio:
   - **Make / Zapier / n8n** → webhook → Google Sheet, email, CRM, Slack
   - URL webhook nativo di un CRM
   - un tuo backend
2. Imposta la variabile d’ambiente:

| Variabile | Ruolo |
|---|---|
| `LEAD_WEBHOOK_URL` | URL che riceve il JSON del lead |

**Su Vercel**

1. Progetto → **Settings** → **Environment Variables**
2. Aggiungi `LEAD_WEBHOOK_URL` = `https://...` (Production, e Preview se serve)
3. **Redeploy** o un nuovo push su `main`, così la var entra nel runtime

**In locale** (`.env.local`):

```bash
LEAD_WEBHOOK_URL="https://hook.eu1.make.com/...."
```

Esempio di payload inviato al webhook:

```json
{
  "receivedAt": "2026-08-08T12:00:00.000Z",
  "tipo": "proprietario",
  "nome": "Mario Rossi",
  "email": "mario@example.com",
  "telefono": "+39...",
  "localita": "Torino Centro",
  "tipologia": "Appartamento",
  "metratura": "50–80 m²",
  "posti_letto": "3–4",
  "spazi_esterni": "Balcone o terrazzo",
  "caratteristiche": "Vista panoramica, Parcheggio privato",
  "ruolo": null,
  "portfolio": null,
  "utm": {
    "utm_source": "meta",
    "utm_campaign": "lancio_estate",
    "landing_path": "/"
  }
}
```

Per i partner: `"tipo": "partner"` e campi `ruolo` / `portfolio` valorizzati.

### Protezioni su `/api/lead`

| Controllo | Comportamento |
|---|---|
| Rate limit | **5 submit / 10 min per IP** (Upstash sliding window) → `429` |
| Body max | 20 KB → `413` |
| Max length campi | → `422` |
| Honeypot (`website`) | risposta `{ ok: true }` silenziosa, nessun inoltro |
| Log | eventi strutturati senza PII (`lib/lead-security.ts`) |

Se Upstash non è configurato (tipico in locale), il rate limit è **disattivato** (fail-open). In produzione va configurato.

### Rate limit con Upstash (produzione)

Già collegabile via **Vercel Marketplace → Upstash for Redis** (opzione consigliata): le env si popolano da sole.

| Variabile | Ruolo |
|---|---|
| `UPSTASH_REDIS_REST_URL` | URL REST del database |
| `UPSTASH_REDIS_REST_TOKEN` | Token REST |

In alternativa: crea un DB su [console.upstash.com](https://console.upstash.com/) e copia URL/token in Vercel → **Settings** → **Environment Variables**, poi redeploy.

Riferimento env: file `.env.example`.

### Log ops (senza PII)

Nei Runtime Logs di Vercel trovi righe `[LEAD]` con eventi come:

- `accepted` — lead validato (e inoltrato se c’è webhook)
- `forwarded` / `forward_http_error` / `forward_failed` — esito webhook
- `rate_limited`, `honeypot`, `validation_failed`, `rejected_body_size`, …

Non contengono nome, email o telefono. L’IP compare solo come fingerprint breve.

### Tracciamento campagne (UTM)

I form catturano e allegano al lead: `utm_source`, `utm_medium`, `utm_campaign`,
`utm_term`, `utm_content`, `gclid`, `fbclid`, più `referrer` e `landing_path`.

Esempio di link campagna:

```
https://oasiproperties.it/?utm_source=meta&utm_campaign=lancio_estate
```

## Variabili d’ambiente (riepilogo)

Vedi `.env.example`.

| Variabile | Obbligatoria in prod? | Descrizione |
|---|---|---|
| `LEAD_WEBHOOK_URL` | **Sì** (per non perdere i contatti) | Destinazione JSON del lead |
| `UPSTASH_REDIS_REST_URL` | **Sì** (anti-abuse) | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | **Sì** (anti-abuse) | Upstash Redis REST token |

## Struttura

I componenti sono raggruppati per ruolo, non per pagina: quasi tutto è
condiviso fra le due facce del sito.

```
app/
  layout.tsx                     Font brand, SEO metadata, theme-color
  globals.css                    Design system
  page.tsx                       Landing proprietari
  partner/page.tsx               Landing partner
  privacy/page.tsx               Informativa privacy
  api/lead/route.ts              Endpoint lead (validazione, rate limit, webhook)

components/
  layout/    nav.tsx             Barra fissa + menu mobile
             footer.tsx
             mobile-cta.tsx      Barra d'azione fissa su mobile
             page-transition.tsx Wrapper delle View Transitions
  forms/     lead-form.tsx       Percorso multi-step proprietari + UTM
             partner-form.tsx    Modulo partner + UTM
             partner-role-link.tsx
  ui/        logo.tsx · icons.tsx · journey.tsx
  motion/    reveal.tsx          Scroll reveal sotto la piega
             smart-anchors.tsx   Scroll alle ancore: morbido vicino,
                                 istantaneo lontano

lib/
  lead-security.ts               Rate limit, limiti campi, log safe
  flip.ts                        Transizione “a carta” proprietari ↔ partner
  scroll.ts                      Regola di scroll condivisa fra nav e ancore

public/
  brand/                         Logo chiaro e scuro
  immobili/                      Foto degli annunci in gestione
  persone/                       Foto fondatore e avatar host
```

## Design

- **Palette:** verde botanico `#103D30` + ottone `#C6A15B` + neutri pietra/salvia.
- **Dati reali** usati come prova sociale (immobili, recensioni, anni di attività).
- Accessibilità: focus visibili, contrasto, `prefers-reduced-motion`, HTML semantico.

## Deploy (Vercel)

Il progetto è collegato a GitHub: un **push su `main`** avvia il deploy.
Le env (webhook + Upstash) si impostano in **Settings → Environment Variables**;
dopo ogni modifica alle env serve un nuovo deploy.

## Da completare prima del go-live

- [ ] Impostare `LEAD_WEBHOOK_URL` (Sheet / email / CRM via Make, Zapier, …)
- [ ] Verificare Upstash attivo (`UPSTASH_REDIS_REST_*`) e un submit di prova
- [ ] Controllare nei log l’evento `accepted` (e `forwarded` se c’è webhook)
- [ ] Link informativa privacy e contenuti soggetti a conferma (servizi fiscali, aree, numeri mock)
- [ ] (Futuro) Persistenza lead dedicata + retry se il webhook fallisce
