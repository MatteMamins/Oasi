# Oasi Properties design system

## Direction

Oasi presents property management as a calm, precise, premium service. The visual language combines botanical greens, paper-like neutrals, and restrained brass accents. It should feel trustworthy and operational rather than flashy: generous space, strong typographic hierarchy, clear proof, and low-friction conversion flows.

## Principles

1. **Calm confidence** — large readable statements, ample negative space, minimal decoration.
2. **Clarity before persuasion** — audience, offer, proof, and next action must be understood in one scan.
3. **Premium through restraint** — brass is an accent for value and progression, never a dominant background everywhere.
4. **One decision at a time** — qualification forms reveal one lightweight question per step.
5. **Visible control** — progress, back navigation, focus, errors, saved state, and next steps are explicit.
6. **Motion with purpose** — reveals, journey activation, and route flip reinforce structure; all yield to reduced-motion preferences.

## Foundations

### Color

| Role | Token | Value | Use |
|---|---|---:|---|
| Canvas | `paper` | `#fafbf8` | Main page and cards |
| Subtle surface | `stone` | `#eef1ea` | Progress tracks, quiet blocks |
| Soft accent | `mist` | `#dde7de` | Icon backgrounds |
| Primary text | `ink` | `#16221c` | Body and headings on light |
| Secondary text | `muted` | `#566158` | Supporting copy |
| Border | `line` | `#dde2d8` | Dividers and controls |
| Brand | `forest` | `#103d30` | Primary actions |
| Deep brand | `forest-2` | `#0b2a21` | Dark surfaces |
| Darkest brand | `forest-3` | `#082019` | Hero gradients |
| Supporting green | `sage` | `#6f8c7b` | Ambient accents |
| Value accent | `brass` | `#c6a15b` | Primary dark-surface CTA, progress |
| Accent hover | `brass-2` | `#b58e45` | Brass hover/gradient |
| Accent text | `brass-ink` | `#8a6a2c` | Brass semantics on light surfaces |

Dark sections use layered forest gradients and translucent paper/white borders. Preserve text contrast: paper on forest, ink on paper, forest-3 on brass.

### Typography

- Display: Montserrat 500/600/700; geometric, compact, line-height `1.08`, tracking `-0.02em`.
- Body: Instrument Sans; default line-height `1.6`.
- Mono/data: JetBrains Mono 400/500; step labels, ratings, and tabular metrics.
- Hero display: fluid `clamp(2.6rem, 5vw, 4rem)`.
- Section display: commonly `clamp(2rem, 4vw, 3rem)`.
- Body copy: generally `0.95–1.25rem`; keep paragraph measures around `34–60ch`.

### Layout and spacing

- Main shell: maximum `1200px`, centered.
- Horizontal edge: `clamp(1.25rem, 5vw, 6rem)`.
- Section rhythm: typically `6rem` mobile / `8rem` desktop vertically.
- Use 1px `line` borders and subtle translucent borders on dark surfaces.
- Corner language: controls are nearly square (`2px`/`rounded-sm`); content cards are softer (`rounded-xl`/`rounded-2xl`).
- Minimum interactive target: `44px`.

### Elevation

- Prefer borders, tonal surfaces, and atmospheric glow over generic drop shadows.
- Primary buttons may lift `-2px` and use a soft colored shadow on hover.
- Image showcases may use one deep, diffuse shadow and an offset brass frame.

## Components

### Buttons

- Primary: forest fill, paper text; used on light surfaces.
- Brass: brass fill, forest-2 text; strongest action on dark surfaces.
- Ghost: transparent, line border, ink text.
- On dark: transparent, translucent white border, paper text; hover becomes brass.
- Use sentence case and action-led Italian copy. Keep one dominant CTA per section.

### Navigation

- Fixed/stable global header with brand, contextual anchors, and audience route.
- Mobile menu behaves as a full viewport overlay, locks background scroll, closes with Escape, and restores focus.
- Active route/audience must be visibly and semantically indicated.

### Cards and proof

- Paper cards use line borders and restrained radii.
- Trust metrics prioritize the number, then a short lowercase label.
- Social proof includes context (rating scale and review volume), not an isolated score.
- Clearly distinguish real metrics/listings from illustrative dashboard data.

### Section headers

- Start directly with the heading; do not use decorative eyebrow labels.
- Functional labels inside navigation, forms, and product mockups use normal sentence case and body typography.

### Guided forms

- Owner flow: short property qualification followed by contacts.
- Partner flow: profile selection followed by one compact form with role, geography and contacts visible together.
- Partner responsibilities use one compact `Tu porti / Oasi gestisce` split inside the profile section.
- Show one question at a time, auto-advance only for unambiguous single-choice answers.
- Always show progress, Back where applicable, inline errors, sending state, and a specific success message.
- Persist incomplete responses within the session and restore without unexpected focus theft.
- On step change, move focus to the new question; on completion, scroll/focus the confirmation.
- Success copy explains what happens next and provides one useful next action.

## Motion

- Reveal: `22px` vertical offset, `0.7s`, expressive ease-out.
- Buttons: `0.18–0.2s` lift/color transitions.
- Carousel: slow crossfade; pause on hover/focus.
- Journey: scroll-linked brass line with activated stations.
- Audience route: 3D card flip between owner and partner experiences.
- Under `prefers-reduced-motion`, remove animated movement, autoplay, and transition delays while retaining content and controls.

## Accessibility

- Include a skip link and offset anchored sections below the fixed nav.
- Use visible brass focus rings with 3px offset.
- Do not rely on color alone for selected/current/error states.
- Keep form labels persistent and errors programmatically associated.
- Link privacy notices visibly from every data-collection form and phrase the required checkbox as acknowledgement of reading.
- Announce form status via appropriate live regions.
- Ensure all decorative glows, frames, and rules are hidden from assistive technology.
- Maintain keyboard parity for menus, audience switching, and forms.

## Responsive behavior

- Mobile is single-column and action-first; the CTA target must reveal the actual first form control.
- Trust grids use two columns on mobile and four on larger screens.
- CTA groups wrap without overflow and remain full-width-friendly on narrow screens.
- Desktop can use split hero layouts, editorial row treatments, and right-aligned supporting copy.
- Avoid hiding decision-critical proof or navigation solely to simplify mobile.

## Content voice

- Italian, direct, reassuring, and concrete.
- Lead with user outcomes: profitability, time saved, protection, visibility.
- Avoid inflated claims and unexplained jargon.
- Match CTA promise to fulfillment: “Richiedi” when a human follow-up is required, not language implying an instant result.
- Partner CTAs stay inclusive of portfolio holders, agents, introducers, and other professionals: prefer “Valutiamo una collaborazione”.
- Confirmation states should set a realistic expectation for contact timing once operations define it.

## Implementation notes

- Next.js 16.3 / React 19 / Tailwind CSS 4.
- Tokens live in `app/globals.css` under `@theme`; fonts are supplied as CSS variables by `next/font`.
- Reuse `.shell`, `.btn*`, `.font-display`, `.tnum`, and accessibility helpers before adding one-off abstractions.
- Read the installed Next.js documentation before framework-level changes; this project’s version may differ from conventional Next.js assumptions.
