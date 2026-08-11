# Living Architecture — Full Product Redesign

**Date:** 2026-08-11  
**Status:** Approved for planning  
**Scope:** Entire public web product (owner home, partner, privacy shell)  
**Constraint:** All existing marketing copy, numbers, assets, form questions/logic, and APIs stay; structure, UI, UX, and composition are redesigned.

---

## 1. Problem and goal

Oasi Properties sells professional short-let management to owners and B2B partnerships to real-estate professionals. The current site is coherent but visually incremental: planimetria cinema, repeated gradient seams, and a layout that does not feel “premium wow.”

**Goal:** Rebuild information architecture, layout, and visual system from zero under one signature — **Living architecture** — a restrained front-elevation house that is drawn as the user scrolls. Content and conversion machinery remain.

**Success criteria**

- Same words, stats, photos, form steps/fields, and legal text as today.
- Distinct premium feel: editorial type, clear dark/light stages, one memorable motion signature.
- House linework never competes with titles, body, or forms (low opacity, fixed behind content, no pointer capture).
- Owner and partner journeys feel like one brand with two narratives.
- `prefers-reduced-motion: reduce` shows a complete static house and no decorative motion.
- Forms convert as well as today: multi-step lead questionnaire and partner form keep proven UX/logic; only presentation may adapt to the new kit.

---

## 2. Non-goals

- New marketing sections or rewritten product copy.
- Changing brand name, logo marks, or core palette identity (forest / brass / paper).
- CMS, blog, i18n, analytics product work.
- Backend or API contract changes for lead/partner submission.
- Replacing or reordering lead questionnaire steps, options, multi-select rules, contact step, session draft, UTM capture, or partner role prefill.
- Heavy new motion libraries (Lottie/Rive/video) as the primary signature.

---

## 3. Content inventory (frozen)

### 3.1 Owner home (`/`)

| Block | Preserve |
|-------|----------|
| Hero | H1, sub, CTA “Richiedi la valutazione gratuita”, 4,56/5 · 358 recensioni, hero image `/immobili/torino-1.jpg` |
| Partner bridge | “Sei un professionista immobiliare?” + link Partner |
| Perché | H2 + four claims (Più guadagni / Zero morosità / vuoti / pensieri) + supporting lines + CTA |
| Come funziona | H2, lead, four steps (titles + bodies), free analysis note |
| Trasparenza | H2, body, owner-area mock (labels, sample metrics, three feed rows, disclaimer) |
| Recensioni | H2, body, host card (358 / 4,56 / 3 anni), three guest reviews, six listings + Airbnb URL |
| Chi c’è dietro | Ivano photo, host badge, H2, two paragraphs, CTA |
| Valutazione | H2, body, three bullets, `#valutazione` + `LeadForm` |
| Chrome | Nav anchors, mobile CTA label/target, footer legal and links |

### 3.2 Partner (`/partner`)

| Block | Preserve |
|-------|----------|
| Hero | H1, sub, CTA, 7.000+ prenotazioni |
| Profili | Four roles + short texts; role → form prefill |
| Responsabilità | “Tu porti” / “Oasi gestisce” item lists |
| Benefici | 01–03 titles and bodies |
| Processo | Three steps |
| FAQ | Three Q&A |
| Contatti | H2, body, two trust lines, `PartnerForm` / `#call` / `#contatti` |

### 3.3 Privacy (`/privacy`)

All legal section titles and bodies unchanged. Only chrome and page shell restyle.

### 3.4 Forms (high priority — already solid)

**Lead form (`LeadForm`) — treat as product surface, not decoration**

Keep without behavioral change:

- Multi-step questionnaire: località (text) → tipologia → metratura → caratteristiche (multi) → contact step.
- Question copy, option labels, multi-select set, outdoor-features rule if present.
- Progress / back-forward flow, step validation messages, session restore (`oasi-lead-form`).
- UTM + referrer + landing path capture.
- Submit payload shape and API usage; success/error UX semantics.
- Accessibility: 16px inputs on small screens (iOS zoom), focus management on step change and result.
- Form must **not** be wrapped in delayed reveal that hides the CTA target.

**Partner form (`PartnerForm`)**

Keep: fields, validation, draft storage, UTM, `oasi:partner-role` prefill, submit/success/error, focus after success.

**Allowed form changes (visual only)**

- Tokens, spacing, borders, progress indicator styling, option-chip appearance, card chrome around the form.
- Optional layout polish so the questionnaire feels premium inside the new CTA stage (e.g. clearer step progress, better option hit targets) **without** changing questions, order, or logic.

---

## 4. Design direction

### 4.1 Signature: Living architecture

- Single fixed full-viewport SVG layer: **stylized front elevation** (not floor plan).
- Construction stages driven by section dominance (same pattern as current cinema engine).
- Linework only; fills at most as very soft room/body tint at late stages.
- Stroke colors follow surface: brass-forward on dark, forest/sage on light.
- Opacity bands: dark ~0.28–0.38 (climax ≤ ~0.48), light ~0.08–0.12; mobile ~30% lower.
- No parallax that shifts content; house may gently settle scale only if it does not affect layout.
- Tracer/glow only at final stage, subtle; disabled under reduced motion and preferably on small screens.

**Elevation vocabulary (minimal geometry)**

- Ground line / foundations  
- Rectangular body  
- Gabled roof  
- Door + 2–3 windows  
- Optional chimney or porch step only if stroke count stays low  

Avoid: brick texture, people, heavy gradients, isometric complexity.

### 4.2 Composition approach: “Cantiere a stadi”

Page is one continuous act. Content blocks map to house stages. Alternating dark/light stages; fewer decorative gradient seams; more solid surfaces and editorial whitespace.

### 4.3 Design system

**Color:** existing tokens — paper, stone, mist, ink, muted, line, forest ladder, sage, brass ladder. Use brass for CTAs on dark and key metrics; forest for primary actions on light.

**Type:** Montserrat (display statements), Instrument Sans (body), JetBrains Mono (stage indices, metrics). Larger clamp scales for H1/H2; tighter tracking on display.

**Controls:** Shared button classes (primary / brass / ghost); inputs with consistent radius (~2–4px), focus brass/forest; 44px min targets on nav/footer mobile.

**Chrome:**

- Nav: transparent over dark hero → solid/blur after scroll; partner-specific links; privacy always solid light.
- Footer: unified dark forest shell, three groups + legal strip.
- Mobile CTA: same targets; visual aligned to new buttons.

**Deprecations visual:** multi glow blobs, repeated paper→dark feather seams as primary style, planimetria SVG/CSS.

---

## 5. Information architecture and stage maps

### 5.1 Owner home order (content order unchanged)

1. Nav  
2. Hero (dark) — stage 0  
3. Partner bridge (light strip)  
4. Perché (light) — stage 1  
5. Come funziona (dark) — stage 2  
6. Trasparenza (light) — stage 3  
7. Recensioni (light/stone) — stage 3  
8. Chi c’è dietro (light) — stage 3  
9. Valutazione + form (dark) — stage 4  
10. Footer + mobile CTA  

**House stages (home)**

| Stage | Visual house |
|-------|----------------|
| 0 | Construction grid + ground/foundations |
| 1 | Body walls |
| 2 | Roof |
| 3 | Openings (door, windows) |
| 4 | Complete + soft fill/tracer |

### 5.2 Partner order

1. Nav (partner links + CTA collaborazione)  
2. Hero (dark) — stage 0  
3. Profili + responsabilità (light) — stage 1  
4. Benefici (dark) — stage 2  
5. Processo + FAQ (light/stone) — stage 3  
6. Contatti + form (light or soft dark — prefer light paper with strong form card for questionnaire calm) — stage 4  
7. Footer + mobile CTA  

Partner reuses the same house SVG and engine; stage attributes on sections only.

### 5.3 Privacy

No house cinema. New nav/footer/type/spacing only. Readable long-form legal layout.

---

## 6. Section UX notes (structure new, words same)

### Home

- **Hero:** Full-bleed dark; statement H1; media secondary or large still; trust line under CTA. House foundations only.
- **Partner bridge:** Quiet horizontal strip, not a second hero.
- **Perché:** Editorial list / manifesto rows; large “Più/Zero” with brass lead; not small icon cards only.
- **Come funziona:** Sticky intro column + redesigned journey steps (same step data). House gains roof while this section dominates.
- **Trasparenza:** Copy + premium mock phone/panel (same mock content).
- **Recensioni:** Showroom composition — metrics, quotes, listing grid; keep Airbnb external links and real images.
- **Founder:** Large portrait, human tone, clear CTA to form.
- **CTA:** Split layout; bullets; **LeadForm always mounted and visible** (no opacity-0 reveal on the form shell).

### Partner

- Role tiles still dispatch role to form (existing event contract).
- Benefits monumental numbers 01–03.
- FAQ native `<details>` pattern OK; restyle chevron/spacing.
- Form section prioritizes calm readability over theatrical house intensity (stage 4 opacity still capped).

---

## 7. Motion rules

| Trigger | Behavior |
|---------|----------|
| First paint | Hero text rise (CSS), house not ready until engine sets `data-ready` |
| Scroll | Intersection-driven stage/rooms (or openings) via dataset; CSS transitions on stroke-dashoffset/opacity |
| Reduced motion | Force final complete house; no dash animation, no tracer, no rise if reduced |
| No-JS | Static complete or stage-0 outline at low opacity via CSS `@media (scripting: none)` |
| Performance | One fixed SVG; no per-frame React re-renders (dataset/CSS vars only, as current cinema) |

---

## 8. Technical architecture

### 8.1 Components

| Piece | Action |
|-------|--------|
| `components/motion/house-cinema.tsx` | New: elevation SVG + scroll stage engine (port from blueprint-cinema) |
| `blueprint-cinema.tsx` / `blueprint-field.tsx` | Remove after cutover or thin re-export then delete |
| `app/globals.css` | Replace planimetria cinema rules with house layers; restyle buttons/nav/forms tokens as needed |
| `app/page.tsx` | New composition; import HouseCinema; keep data constants |
| `app/partner/page.tsx` | New composition + stage attributes |
| `app/privacy/page.tsx` | Shell only |
| `components/layout/nav.tsx`, `footer.tsx`, `mobile-cta.tsx` | Visual redesign; behavior preserved |
| `components/ui/journey.tsx` | Visual redesign; `steps` prop contract same |
| `components/forms/lead-form.tsx`, `partner-form.tsx` | **Logic frozen**; className/token skin only |
| `components/forms/partner-role-link.tsx` | Skin only; event contract preserved |
| Page transition / reveal / smart-anchors | Keep patterns; tune to new surfaces |

### 8.2 Stage engine contract

- Sections mark `data-cinema-stage` and `data-cinema-surface` (`light` \| `dark`).
- Engine observes intersection, sets root `data-stage`, `data-surface`, `data-ready`.
- Opening progress may use continuous progress inside long sections only if it does not break reduced-motion or performance; default is discrete stages (sufficient).

### 8.3 APIs and security

- No changes to `app/api/lead` contracts or `lib/lead-security` unless a visual-only bug forces a pure refactor (avoid).

### 8.4 Dependencies

- No new runtime animation libraries required.

---

## 9. Accessibility and QA

- Contrast: paper on forest; ink on paper; brass text only where contrast is safe (prefer brass ink on light).
- House: `aria-hidden`, decorative.
- Skip link, focus rings, form errors linked to controls.
- Mobile: no horizontal overflow; house opacity reduced; forms usable with sticky CTA not covering primary fields.
- Verify: reduced motion, no-JS baseline, keyboard through multi-step lead form, partner role → focus field, hash scroll to `#valutazione` / `#call`.

**Manual QA checklist**

1. Full scroll home: house builds 0→4; text always readable.  
2. All CTAs land on form; first interactive control usable.  
3. Lead multi-step: draft restore, multi select, submit success.  
4. Partner role click preselects ruolo.  
5. Privacy legal complete; nav/footer coherent.  
6. Lighthouse/a11y smoke: no new critical issues.

---

## 10. Implementation phases (for planning skill)

Suggested PR-sized slices:

1. **Design tokens + chrome** — buttons, nav, footer, mobile CTA, privacy shell.  
2. **HouseCinema** — SVG + CSS stages + reduced motion; wire empty on a sandbox or home only.  
3. **Home recomposition** — sections re-layout, journey skin, mock/proof/founder, stage attributes.  
4. **Partner recomposition** — same system + stages.  
5. **Form skin pass** — lead/partner visual only; regression test logic.  
6. **Polish + QA** — opacity tuning, mobile, remove blueprint dead code.

---

## 11. Risks and mitigations

| Risk | Mitigation |
|------|------------|
| House distracts from titles | Opacity caps; stroke density low; hide dense grid after stage 1 |
| Redesign breaks lead conversion | Freeze form logic; visual-only PR; manual walkthrough of every step |
| Partner page feels like copy-paste home | Different stage content mapping; partner form on calmer surface |
| Scope explosion | Content freeze list is the acceptance gate |

---

## 12. Decisions log

| Decision | Choice |
|----------|--------|
| Scope | Full product: home + partner + privacy shell |
| Signature | Living architecture — front elevation house |
| Composition | Cantiere a stadi (scroll stages) |
| Planimetria | Replaced (not hybrid) |
| Forms | Logic/content solid — keep; skin only |
| Motion libs | None required |

---

## 13. Open items closed by default

- Continuous scroll progress for openings: **no** by default (discrete stages).  
- House on privacy: **no**.  
- Copy edits: **no** unless a layout forces a non-semantic line break tweak only.
