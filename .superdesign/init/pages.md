# Pages and local dependency trees

## Shared application shell

```text
app/layout.tsx
├── app/globals.css
├── next/font/google
│   ├── Montserrat
│   ├── Instrument Sans
│   └── JetBrains Mono
└── route content (`children`)
```

The layout supplies global metadata, font CSS variables, smooth-scroll behavior, Italian language metadata, and the keyboard skip link. `app/globals.css` contains the shared design tokens, responsive shell, buttons, navigation, focus, motion, and section-level utility styles used by both pages.

## `/` — owner landing and evaluation funnel

Entry point: `app/page.tsx`

### Page structure

1. Hero: owner value proposition, one primary CTA, one compact proof line, and one static real-property image.
2. `#perche`: four benefits of short-term rental management.
3. `#come-funziona`: sticky introduction plus four-step animated journey.
4. `#trasparenza`: reporting/app mockup and operational-control message.
5. `#recensioni`: host-profile preview, guest reviews, and real listing cards.
6. `#chi-sono`: founder portrait and personal credibility section.
7. `#valutazione`: guided multi-step owner lead form.
8. Shared footer.

### Complete local dependency tree

```text
app/page.tsx
├── app/layout.tsx (App Router parent)
│   └── app/globals.css
├── components/nav.tsx
│   ├── components/logo.tsx
│   │   └── public/logo-oasi.png or public/logo-oasi-white.png
│   ├── components/icons.tsx
│   └── lib/flip.ts
├── components/page-transition.tsx
├── components/reveal.tsx
├── components/journey.tsx
├── components/lead-form.tsx
│   ├── components/icons.tsx
│   └── POST /api/lead
├── components/footer.tsx
│   └── components/logo.tsx
├── components/logo.tsx (OasiMark used directly in the page)
├── components/icons.tsx (inline SVG icon set used directly in the page)
├── public/immobili/avatar.jpg
├── public/immobili/torino-1.jpg
├── public/immobili/moncalieri-1.jpg
├── public/immobili/bordighera-1.jpg
├── public/immobili/torino-2.jpg
├── public/immobili/diano-marina-1.jpg
├── public/immobili/torino-3.jpg
└── public/ivano.jpg
```

Behavioral boundaries: the page itself is a Server Component. `Nav`, `Reveal`, `Journey`, `LeadForm`, and `PageTransition` encapsulate client-side interaction or animation. The hero uses one optimized static `next/image`; the form persists draft state in `sessionStorage`, gathers campaign parameters, validates fields, and submits to the shared lead API.

## `/partner` — partner landing and call funnel

Entry point: `app/partner/page.tsx`

### Page structure

1. Hero: audience switch, concise partner proposition, one primary CTA, and one trust point.
2. `#percorsi`: four professional profiles that preselect the matching form role, followed by a compact `Tu porti / Oasi gestisce` responsibility split.
3. `#benefici`: three open editorial benefit columns.
4. `#processo`: three-step collaboration path.
5. `#faq`: three essential native disclosure questions.
6. `#contatti`: compact partner form with all fields visible at once; `#call` remains as a compatibility anchor on the form.
7. Shared footer.

### Complete local dependency tree

```text
app/partner/page.tsx
├── app/layout.tsx (App Router parent)
│   └── app/globals.css
├── components/nav.tsx
│   ├── components/logo.tsx
│   │   └── public/logo-oasi.png or public/logo-oasi-white.png
│   ├── components/icons.tsx
│   └── lib/flip.ts
├── components/page-transition.tsx
├── components/audience-switch.tsx
│   └── lib/flip.ts
├── components/reveal.tsx
├── components/partner-role-link.tsx
│   └── components/icons.tsx
├── components/partner-form.tsx
│   ├── components/icons.tsx
│   └── POST /api/lead
├── components/footer.tsx
│   └── components/logo.tsx
└── components/icons.tsx (inline SVG icon set used directly in the page)
```

Behavioral boundaries: the route exports partner-specific metadata and otherwise renders primarily as a Server Component. `PartnerRoleLink` stores and broadcasts the selected profile before moving focus to the compact `PartnerForm`. The form persists its draft in `sessionStorage`, captures campaign parameters, validates role, geography and contact details, and submits to the same lead API with `tipo: "partner"`.

## Shared lead API dependency tree

The API is not a visual page, but it is part of both page funnels.

```text
app/api/lead/route.ts
└── lib/lead-security.ts
    ├── @upstash/ratelimit
    └── @upstash/redis
```

`POST /api/lead` accepts owner or partner payloads, enforces a 20 KB body limit, checks the honeypot, validates required contact fields and privacy-notice acknowledgement, clips bounded fields, sanitizes UTM data, and returns JSON. Upstash is optional in local development; webhook forwarding is enabled only when `LEAD_WEBHOOK_URL` exists.

## `/privacy` — shared privacy notice

Entry point: `app/privacy/page.tsx`

The route is a static Server Component with route-specific metadata. It explains the controller identity, collected data, purpose and legal basis, recipients, retention criteria, and user rights. Both lead forms and the shared footer link here.

```text
app/privacy/page.tsx
├── app/layout.tsx (App Router parent)
│   └── app/globals.css
├── components/nav.tsx
├── components/page-transition.tsx
├── components/footer.tsx
└── next/link
```
