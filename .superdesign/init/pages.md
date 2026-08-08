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

1. Hero: audience switch, owner value proposition, primary/secondary CTAs, social proof, rotating property showcase, and trust metrics.
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
├── components/audience-switch.tsx
│   └── lib/flip.ts
├── components/reveal.tsx
├── components/journey.tsx
├── components/lead-form.tsx
│   ├── components/icons.tsx
│   └── POST /api/lead
├── components/showcase.tsx
│   ├── components/icons.tsx
│   └── public/immobili/
│       ├── torino-1.jpg
│       ├── moncalieri-1.jpg
│       ├── bordighera-1.jpg
│       ├── torino-2.jpg
│       └── diano-marina-1.jpg
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

Behavioral boundaries: the page itself is a Server Component. `Nav`, `AudienceSwitch`, `Reveal`, `Journey`, `LeadForm`, `Showcase`, and `PageTransition` encapsulate client-side interaction or animation. The form persists draft state in `sessionStorage`, gathers campaign parameters, validates fields, and submits to the shared lead API.

## `/partner` — partner landing and call funnel

Entry point: `app/partner/page.tsx`

### Page structure

1. Hero: audience switch, partner positioning, CTAs, audience qualifier, and trust metrics.
2. Method section: field-tested operating method and three areas of care.
3. `#partnership`: two entry paths—existing property managers and real-estate agencies.
4. Responsibility/infrastructure section: operational risks followed by the five Oasi infrastructure capabilities.
5. `#confronto`: responsive comparison of solo operations versus Oasi.
6. Team strip: functions available through the partnership.
7. `#percorso`: four-step animated partner journey.
8. `#faq`: native disclosure-based FAQ list.
9. `#call`: guided multi-step partner lead form.
10. Shared footer.

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
├── components/journey.tsx
├── components/partner-form.tsx
│   ├── components/icons.tsx
│   └── POST /api/lead
├── components/footer.tsx
│   └── components/logo.tsx
└── components/icons.tsx (inline SVG icon set used directly in the page)
```

Behavioral boundaries: the route exports partner-specific metadata and otherwise renders primarily as a Server Component. The shared animated/navigation components and `PartnerForm` provide the client behavior. The form persists its draft in `sessionStorage`, captures campaign parameters, validates the partner answers and contact details, and submits to the same lead API with `tipo: "partner"`.

## Shared lead API dependency tree

The API is not a visual page, but it is part of both page funnels.

```text
app/api/lead/route.ts
└── lib/lead-security.ts
    ├── @upstash/ratelimit
    └── @upstash/redis
```

`POST /api/lead` accepts owner or partner payloads, enforces a 20 KB body limit, checks the honeypot, validates required contact/privacy fields, clips bounded fields, sanitizes UTM data, and returns JSON. Upstash is optional in local development; webhook forwarding is enabled only when `LEAD_WEBHOOK_URL` exists.
