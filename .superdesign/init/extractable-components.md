# Oasi — Extractable components

Catalog of stable, reusable UI patterns found in the current product. Runtime files remain the source of truth.

## Global layout

- `Shell` — centered content container, `max-width: 1200px`, fluid horizontal edge spacing via `--edge`.
- `PageTransition` — route wrapper for the owner/partner card-flip transition.
- `Nav` — fixed responsive navigation with logo, section links, audience switch CTA, full-screen mobile overlay, focus return, and Escape handling.
- `Footer` — shared brand footer, navigation groups, contact/legal area.
- `SectionHeader` — eyebrow, display heading, optional supporting paragraph and CTA; used repeatedly across both landing pages.
- `DarkSection` — forest gradient section with optional blurred ambient `glow` layers.
- `OasisRule` — subtle horizontal gradient divider.

## Brand primitives

- `OasiMark` / `Logo` — brand mark and lockup variants.
- `AudienceSwitch` — segmented owner/industry audience selector; active side uses brass fill and route changes prime the page flip.
- `Button` — shared `.btn` base with `primary`, `brass`, `ghost`, and `on-dark` variants; 44px minimum target.
- `Eyebrow` — uppercase mono micro-label with wide tracking.
- `Tnum` — tabular numeral treatment for ratings, metrics, and steps.
- `Icon` set — consistent outline icons from `components/icons.tsx`.
- `Reveal` — intersection-based entrance treatment with stagger delay and reduced-motion fallback.

## Content patterns

- `Hero` — dark botanical gradient, audience selector, large display headline, CTA pair, proof line, and optional visual/card.
- `TrustStrip` — 2-column mobile / 4-column desktop metric grid on translucent dark panels.
- `FeatureRow` — oversized benefit statement, circular icon, short explanation, divider, and restrained hover movement.
- `ServiceCard` — bordered/paper card with icon, title, copy, and brass hover accent.
- `Journey` — animated vertical process timeline whose brass fill and nodes activate on scroll.
- `Showcase` — autoplay property carousel with image caption, rating state, manual pagination, pause on hover/focus, and reduced-motion support.
- `ReviewCard` — guest quote, author, location, and rating/proof treatment.
- `ComparisonTable` — partner “alone vs Oasi” structured comparison.
- `AppMockup` — illustrative owner dashboard/report visual; clearly non-live data.
- `CTASection` — closing conversion block with dark background, concise promise, and primary action.

## Forms and feedback

- `LeadForm` — owner qualification wizard: one question per step, auto-advance options, multi-select support, back navigation, session recovery, progress, contact capture, validation, and success state.
- `PartnerForm` — shorter partner qualification wizard using the same interaction language and feedback states.
- `ProgressBar` — brass fill on stone track with semantic progressbar attributes and human-readable step count.
- `OptionButton` — large bordered answer tile with hover/focus/selected treatment.
- `Field` — paper input with line border, compact label, placeholder, error association, and forest focus border.
- `FormError` — inline field or form-level error with `aria-live` support.
- `SuccessPanel` — centered check icon, confirmation copy, next-step expectation, and recovery/navigation CTA.

## Extraction guidance

- Prefer typed React props and composition over duplicating Tailwind strings.
- Preserve semantic HTML, focus management, 44px targets, `aria-live`, and `prefers-reduced-motion` behavior.
- Keep owner and partner content/data separate while sharing visual primitives.
- Keep layout primitives server-renderable; isolate client boundaries to interaction-heavy components.
- Do not extract a component until it has at least two stable uses or expresses a core brand primitive.
