# Route map

Oasi uses the Next.js App Router. The shared root shell is `app/layout.tsx`; it loads the global stylesheet and fonts, declares site-wide metadata, sets the Italian document language, and renders the skip link before each route.

| Route | Kind | Entry point | Purpose |
| --- | --- | --- | --- |
| `/` | Page | `app/page.tsx` | Owner-facing marketing landing page and property-evaluation lead funnel. |
| `/partner` | Page | `app/partner/page.tsx` | Partner-facing landing page and introductory-call lead funnel for property managers and agencies. |
| `/privacy` | Page | `app/privacy/page.tsx` | Shared privacy notice for data collected through both lead funnels. |
| `/api/lead` | API (`POST`) | `app/api/lead/route.ts` | Shared lead intake endpoint used by both forms; validates and sanitizes input, applies optional Upstash rate limiting, logs privacy-safe events, and optionally forwards accepted leads to `LEAD_WEBHOOK_URL`. |

## In-page destinations

### `/`

- `#top` — page start / skip-link target
- `#perche` — benefits of short-term rentals
- `#come-funziona` — four-step owner journey
- `#trasparenza` — reporting and operational visibility
- `#recensioni` — Airbnb listings and guest reviews
- `#chi-sono` — founder profile
- `#valutazione` — owner lead form

### `/partner`

- `#top` — page start / skip-link target
- `#percorsi` — professional profiles, role selection, and compact `Tu porti / Oasi gestisce` responsibility split
- `#benefici` — three partnership benefits
- `#processo` — three-step collaboration path
- `#faq` — three essential questions
- `#contatti` — compact partner lead form section
- `#call` — compatibility anchor on the partner form

## Cross-route navigation

- `AudienceSwitch` links `/` and `/partner`, priming the shared page-flip transition before navigation.
- `Nav` and `Footer` expose route-aware links and in-page anchors.
- Both forms and the shared footer link to `/privacy`.
- Both forms submit JSON to `/api/lead`.
