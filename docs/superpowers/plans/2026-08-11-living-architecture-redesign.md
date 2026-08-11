# Living Architecture Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the full public Oasi site (owner home, partner, privacy shell) with a premium “Living architecture” composition and a scroll-built front-elevation house, while freezing all marketing copy, form questionnaire logic, and APIs.

**Architecture:** Shared design chrome (nav/footer/buttons) + fixed `HouseCinema` layer driven by `data-cinema-stage` / `data-cinema-surface` on sections; pages recomposed section-by-section; `LeadForm` / `PartnerForm` logic frozen with visual skin only; planimetria blueprint removed after cutover.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4 (`@theme` in `app/globals.css`), client motion via IntersectionObserver + CSS (no new animation libraries).

**Spec:** `docs/superpowers/specs/2026-08-11-living-architecture-redesign.md`

## Global Constraints

- **Content freeze:** Do not rewrite marketing copy, stats (4,56/5, 358, 7.000+, 3 anni), review texts, step titles/bodies, FAQ, footer legal, metadata titles/descriptions.
- **Form freeze:** `LeadForm` multi-step questions, options, multi-select, outdoor-features split, session key `oasi-lead-form`, UTM keys, payload shape, and `/api/lead` usage stay identical. `PartnerForm` fields, draft key `oasi-partner-form`, and `oasi:partner-role` prefill stay identical. Visual classNames only.
- **No new runtime deps** for animation (no Lottie/Rive/video signature).
- **House:** front elevation SVG only; `pointer-events: none`; `aria-hidden`; opacity dark ~0.28–0.38 (climax ≤0.48), light ~0.08–0.12; mobile ~30% lower.
- **Accessibility:** respect `prefers-reduced-motion: reduce` (complete static house, no tracer/rise if reduced); form inputs remain `text-base` on small screens (iOS zoom); never wrap form mount targets in delayed `Reveal`.
- **Brand tokens:** keep forest / brass / paper system in `@theme`; refine usage, do not invent a new palette identity.
- **Branch:** work on current feature branch; commit after each task.
- **Verification default:** this repo has no Jest/Vitest suite for UI; each task ends with `npm run lint` and/or `npm run build` plus a manual checklist. Do not add a test framework in this plan.

---

## File map

| File | Responsibility |
|------|----------------|
| `app/globals.css` | Tokens, buttons, cinema house layers, journey, chrome polish |
| `components/motion/house-cinema.tsx` | Fixed elevation SVG + stage engine (dataset only, no re-render) |
| `components/motion/blueprint-cinema.tsx` | Delete after cutover |
| `components/motion/blueprint-field.tsx` | Delete after cutover |
| `app/page.tsx` | Owner home composition + stage attributes + `HouseCinema` |
| `app/partner/page.tsx` | Partner composition + stage attributes + `HouseCinema` |
| `app/privacy/page.tsx` | Legal content unchanged; new shell spacing/type only |
| `components/layout/nav.tsx` | Visual redesign; scroll solid / mobile menu behavior kept |
| `components/layout/footer.tsx` | Visual redesign; links/legal kept |
| `components/layout/mobile-cta.tsx` | Visual skin; visibility logic kept |
| `components/ui/journey.tsx` | Visual markup/CSS class polish; `steps` prop contract kept |
| `components/forms/lead-form.tsx` | ClassName / progress chrome only |
| `components/forms/partner-form.tsx` | ClassName only |
| `components/forms/partner-role-link.tsx` | ClassName only; event contract kept |
| `design-qa.md` | Optional refresh after final QA (non-blocking) |

---

### Task 1: Premium chrome baseline (buttons, surfaces, nav, footer, mobile CTA)

**Files:**
- Modify: `app/globals.css` (buttons, optional section helpers, remove only if unused later — prefer additive this task)
- Modify: `components/layout/nav.tsx`
- Modify: `components/layout/footer.tsx`
- Modify: `components/layout/mobile-cta.tsx`
- Modify: `app/privacy/page.tsx` (spacing/type only if needed for chrome consistency)

**Interfaces:**
- Consumes: existing `Nav` props `{ links?, cta?, tone?, alwaysSolid? }`; `MobileCta` props `{ href, label, targetId }`
- Produces: unchanged public props; premium visual chrome usable by later page tasks

- [ ] **Step 1: Audit current chrome classes**

Open `nav.tsx`, `footer.tsx`, `mobile-cta.tsx`, and the `.btn*` block in `globals.css` (~lines 124–183). Note which Tailwind classes encode the old look.

- [ ] **Step 2: Tighten shared button kit in CSS**

In `app/globals.css`, keep class names `btn`, `btn-primary`, `btn-brass`, `btn-ghost`, `btn-on-dark` (call sites depend on them). Adjust toward quieter premium motion:

```css
.btn {
  /* keep min-height: 44px, border-radius: 2px */
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    box-shadow 0.2s ease;
}
.btn-primary:hover,
.btn-brass:hover {
  transform: none; /* remove translateY bounce if present — calmer premium */
}
```

Do not change button label strings anywhere.

- [ ] **Step 3: Restyle Nav for living-architecture**

Keep behavior: scroll threshold ~24px, mobile overflow lock, hash scroll via `scrollToId`, flip to `/partner`. Visual targets:

- Dark transparent over hero → solid `forest-3` or blur solid when `scrolled` or menu open
- Light tone solid uses paper/forest ink
- Links and CTA use shared `btn` classes; mobile targets `min-h-11`

Do not change default link labels (`Come funziona`, `Recensioni`, `Chi c'è dietro`, `Per professionisti`) or default CTA (`Valutazione gratuita`).

- [ ] **Step 4: Restyle Footer**

Keep all links and legal copy exact (including P.IVA and address). Composition: brand column + Sito + Contatti + legal strip. Remove dependence on `cinema-section` wrappers if they force broken z-index; use simple `relative bg-forest-3 text-paper/60` structure:

```tsx
<footer className="relative bg-forest-3 py-14 text-paper/60">
  <div className="shell">...</div>
</footer>
```

Preserve link `href`s: `/#come-funziona`, `/#recensioni`, `/#chi-sono`, `/partner`, `/#valutazione`, `/partner#call`, `/privacy`.

- [ ] **Step 5: Restyle MobileCta shell only**

Keep visibility logic (`scrollY > 0.75 * innerHeight` and hide when `targetId` in view). Update bar classes to match brass/primary CTA on a dark slim bar; keep `label` / `href` props driven by pages.

- [ ] **Step 6: Privacy shell pass**

In `app/privacy/page.tsx`, ensure page uses Nav with `alwaysSolid` (or equivalent so logo is visible on light), same Footer, readable `shell` max width for legal text. **Do not edit** section titles/bodies in the `sections` array.

- [ ] **Step 7: Verify chrome**

Run:

```bash
npm run lint
npm run build
```

Expected: both succeed. Manually: open `/`, `/partner`, `/privacy` — nav CTA works, footer links work, mobile menu opens without horizontal scroll.

- [ ] **Step 8: Commit**

```bash
git add app/globals.css components/layout/nav.tsx components/layout/footer.tsx components/layout/mobile-cta.tsx app/privacy/page.tsx
git commit -m "style: premium chrome for nav, footer, and CTAs"
```

---

### Task 2: HouseCinema engine + elevation SVG + CSS stages

**Files:**
- Create: `components/motion/house-cinema.tsx`
- Modify: `app/globals.css` (house cinema block; can leave old `.blueprint-cinema` until Task 6 cleanup, or replace in place if home still imports blueprint — prefer new classes `.house-cinema`)

**Interfaces:**
- Consumes: DOM sections with `[data-cinema-stage]` and optional `[data-cinema-surface="light"|"dark"]`
- Produces: `export function HouseCinema(): JSX.Element` — client component, fixed layer, sets on root:
  - `data-stage`: `"0"` … `"4"`
  - `data-surface`: `"light"` | `"dark"`
  - `data-ready`: `"true"` | `"false"`
  - (optional) `data-openings`: `"0"` … `"3"` only if discrete opening fill is needed; **default: openings appear fully at stage 3** (no continuous progress) per spec

- [ ] **Step 1: Create house-cinema component shell**

Create `components/motion/house-cinema.tsx` as a client component. Port the scroll engine structure from `components/motion/blueprint-cinema.tsx`:

- `IntersectionObserver` on `[data-cinema-stage]` with thresholds `[0, 0.08, 0.16, 0.28, 0.4, 0.55, 0.7, 0.85, 1]` and `rootMargin: "-12% 0px -18% 0px"`
- Dominant section by intersection ratio; update `stage` + `surface`
- `requestAnimationFrame` coalescing on scroll/resize
- `prefers-reduced-motion: reduce` → force `stage=4`, `surface` from first section or `"dark"`, `ready=true`, no listeners required beyond initial apply
- Apply via `root.dataset` only (no `setState` for stages)

Export name: `HouseCinema`.

- [ ] **Step 2: Implement front-elevation SVG layers**

Inside the same file, SVG `viewBox="0 0 1000 1000"`, `aria-hidden`, `focusable="false"`, `preserveAspectRatio="xMidYMid slice"`.

Layer class names (CSS gates):

| Class | Geometry (approximate path intent) |
|-------|-------------------------------------|
| `house-layer-grid` | Light construction grid (H/V lines) |
| `house-layer-ground` | Ground line + foundation rectangle under body |
| `house-layer-body` | Outer rectangle of façade |
| `house-layer-roof` | Simple gable: two roof slopes + eave line |
| `house-layer-openings` | Door rectangle + 2–3 window rectangles (stroke only) |
| `house-layer-detail` | Optional single chimney or door step — keep ≤2 paths |
| `house-tracer` | `use` or duplicate outer silhouette path for stage-4 dash tracer |
| `house-glow` | Soft circle behind house for stage 4 only |

Use `pathLength={1}` on stroked paths so `stroke-dasharray: 1` / `stroke-dashoffset` works like the old cinema.

Suggested geometry anchors (tune by eye, keep centered):

```text
Body:  x=320 y=420 w=360 h=320
Roof:  peak (500,280) → (300,420) → (700,420)
Door:  x=470 y=580 w=60 h=160
Windows: left (360,500 70x70), right (570,500 70x70)
Ground:  y≈760 line across
```

- [ ] **Step 3: Write house cinema CSS**

In `app/globals.css`, add a self-contained block (mirror structure of existing `.blueprint-cinema` rules ~348–717):

```css
.house-cinema {
  --house-stroke: var(--color-brass);
  --house-muted: var(--color-sage);
  --house-opacity: 0.34;
  position: fixed;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.house-cinema[data-ready="true"] {
  opacity: var(--house-opacity);
}
.house-cinema[data-surface="light"] {
  --house-stroke: var(--color-forest);
  --house-muted: var(--color-sage);
  --house-opacity: 0.1;
}
.house-cinema[data-surface="dark"] {
  --house-stroke: var(--color-brass);
  --house-muted: var(--color-sage);
  --house-opacity: 0.36;
}
.house-cinema[data-stage="4"] {
  --house-opacity: 0.46;
}
.house-cinema[data-surface="light"][data-stage="4"] {
  --house-opacity: 0.12;
}
```

Stage gates:

| Stage | Visible layers |
|-------|----------------|
| 0 | grid + ground (dash to 0) |
| 1 | + body |
| 2 | + roof |
| 3 | + openings |
| 4 | + detail, tracer animation, glow; grid fades |

Stroke transitions ~0.9–1.1s cubic-bezier; openings opacity fade 0.5–0.7s.

Mobile (`max-width: 639px`): lower opacity; hide glow; slightly larger inset crop on `.house-plane`.

Reduced motion: dashoffset 0, no tracer animation, no glow pulse.

Also keep section helpers used by pages:

```css
.cinema-section { position: relative; }
.cinema-section-bg { position: absolute; inset: 0; z-index: 0; }
.cinema-section-fg { position: relative; z-index: 2; }
```

(If already present from blueprint work, reuse.)

- [ ] **Step 4: Smoke-mount on home without full redesign**

In `app/page.tsx`, temporarily ensure sections still have `data-cinema-stage` / `data-cinema-surface` (they already do). Replace import:

```tsx
import { HouseCinema } from "@/components/motion/house-cinema";
// ...
<HouseCinema />
```

Remove `BlueprintCinema` import/usage.

- [ ] **Step 5: Verify house engine**

Run:

```bash
npm run lint
npm run build
```

Manual on `http://localhost:3000` (or current dev port):

1. Scroll page: stages advance; house layers appear in order foundations → body → roof → openings → complete.
2. Toggle OS reduced motion: house complete, no tracer animation.
3. Light sections: stroke shifts darker/quieter; text remains primary.

- [ ] **Step 6: Commit**

```bash
git add components/motion/house-cinema.tsx app/globals.css app/page.tsx
git commit -m "feat: house elevation scroll cinema"
```

---

### Task 3: Owner home recomposition (structure/UI, content frozen)

**Files:**
- Modify: `app/page.tsx` (major layout only)
- Modify: `components/ui/journey.tsx` (visual only)
- Modify: `app/globals.css` (journey styles if needed)

**Interfaces:**
- Consumes: `HouseCinema`, `Journey({ steps })`, `LeadForm`, data constants already in `page.tsx` (`listings`, `whyShortTerm`, `steps`, `reviews`, `mockBars`, `AIRBNB_URL`)
- Produces: same section ids for anchors: `perche`, `come-funziona`, `trasparenza`, `recensioni`, `chi-sono`, `valutazione`

- [ ] **Step 1: Recompose hero (stage 0, dark)**

Keep exact H1 / sub / CTA / rating strings and image `src`/`alt`. Layout: full-bleed dark solid (`bg-forest-2` / radial optional but quieter than before). Prefer editorial two-column or stacked media with more whitespace. Use `.rise` for above-fold copy (not `Reveal`). Keep `#valutazione` CTA href.

- [ ] **Step 2: Partner bridge strip**

Keep exact copy and `/partner` link. Visual: thin light bar, border-b, no competing house opacity spike (no stage attribute or keep off-stage).

- [ ] **Step 3: Perché manifesto (stage 1, light)**

Keep H2 and four claim rows (`lead`, `word`, `text`). Editorial full-width rows with large display type; brass on `lead`. Keep bottom CTA string exact.

- [ ] **Step 4: Come funziona (stage 2, dark)**

Keep H2, paragraph, sticky CTA + free analysis note, and `steps` array passed to `Journey`. Restyle `Journey` markup/CSS for premium stations (hairline track, brass fill, clearer typography) **without** changing `Step` type `{ n, title, text }` or scroll logic intent.

- [ ] **Step 5: Trasparenza (stage 3, light)**

Keep H2, body, mock labels (`Area proprietario`, `Ricavi del mese`, `€ 2.480`, feed rows, disclaimer). Improve mock chrome (corners, spacing) but do not invent new mock metrics/copy.

- [ ] **Step 6: Recensioni showroom (stage 3)**

Keep all review text, author, place, host stats, listing data, Airbnb URL. Recompose away from literal Airbnb clone if possible toward metrics + quotes + photo grid, still clearly “profilo host reale”.

- [ ] **Step 7: Chi c’è dietro (stage 3)**

Keep Ivano image path/alt, badge text, H2, both paragraphs, CTA string.

- [ ] **Step 8: Valutazione CTA (stage 4, dark)**

Keep H2, body, three bullets exact. Mount:

```tsx
<div id="valutazione">
  <LeadForm />
</div>
```

**No** `<Reveal>` around `LeadForm`. Page still ends with `<Footer />` and `<MobileCta href="#valutazione" label="Richiedi la valutazione gratuita" targetId="valutazione" />`.

- [ ] **Step 9: Z-index sanity**

Ensure `main` is `relative`; section bg z-0; fg z-2; house cinema z-1; nav above house (nav already high z-index — verify menu not under house).

- [ ] **Step 10: Verify home**

```bash
npm run lint
npm run build
```

Manual checklist:

1. Every frozen string present (search page source for `4,56`, `358`, each review author).
2. All nav anchors scroll correctly.
3. House stages map as Task 2 table while scrolling home.
4. Form visible at bottom; sticky mobile CTA hides when form in view.

- [ ] **Step 11: Commit**

```bash
git add app/page.tsx components/ui/journey.tsx app/globals.css
git commit -m "feat: recompose owner home around house cinema"
```

---

### Task 4: Partner page recomposition + house stages

**Files:**
- Modify: `app/partner/page.tsx`
- Modify: `components/forms/partner-role-link.tsx` (visual only)

**Interfaces:**
- Consumes: `HouseCinema`; existing arrays `profiles`, `benefits`, `steps`, `faq`, `responsibilities`; `PartnerForm`; `PartnerRoleLink`
- Produces: section ids `percorsi`, `benefici`, `processo`, `faq`, `contatti`, and `#call` on form wrapper

- [ ] **Step 1: Wrap main with relative + HouseCinema**

```tsx
<main id="top" tabIndex={-1} className="relative">
  <HouseCinema />
  ...
</main>
```

- [ ] **Step 2: Annotate stages on sections**

| Section | `data-cinema-stage` | `data-cinema-surface` |
|---------|---------------------|------------------------|
| Hero | 0 | dark |
| `#percorsi` (profiles + responsibilities) | 1 | light |
| `#benefici` | 2 | dark |
| `#processo` | 3 | light |
| `#faq` | 3 | light |
| `#contatti` | 4 | light |

Use `cinema-section` / `cinema-section-bg` / `cinema-section-fg` pattern so house sits behind content like home.

- [ ] **Step 3: Recompose layouts**

Keep all partner copy exact. Apply premium structure from spec: statement hero, role tiles grid, split responsibilities, monumental benefits, three-step process, FAQ details, split form section. Prefer calmer surface behind form (light paper).

- [ ] **Step 4: PartnerRoleLink skin**

Keep event dispatch:

```ts
window.dispatchEvent(new CustomEvent("oasi:partner-role", { detail: role }));
```

and scroll-to-form behavior if present. Update card classes only.

- [ ] **Step 5: Nav props unchanged in meaning**

Keep partner-specific `links` and `cta` labels/hrefs as today.

- [ ] **Step 6: Verify partner**

```bash
npm run lint
npm run build
```

Manual:

1. Role tile → form `ruolo` prefilled + focus.
2. House builds across partner scroll.
3. FAQ opens; form submits still hits same API route (no code change required if form untouched).
4. Mobile CTA to `#contatti` / target id still correct.

- [ ] **Step 7: Commit**

```bash
git add app/partner/page.tsx components/forms/partner-role-link.tsx
git commit -m "feat: recompose partner page with house cinema"
```

---

### Task 5: Form visual skin only (lead + partner)

**Files:**
- Modify: `components/forms/lead-form.tsx` (classNames / wrapper chrome only)
- Modify: `components/forms/partner-form.tsx` (classNames only)

**Interfaces:**
- Consumes: existing step config, storage keys, fetch URLs
- Produces: identical runtime behavior; premium look aligned with CTA stages

- [ ] **Step 1: Diff guard before editing**

Confirm you will **not** edit:

- `steps` array contents in lead-form
- `CONTACT_STEP` logic
- `OUTDOOR_FEATURES`
- `STORAGE_KEY` / `UTM_KEYS`
- `payload` object keys
- partner field names / `oasi:partner-role` listener

- [ ] **Step 2: Lead form chrome**

Update only presentational classes on:

- Outer card (`rounded-xl border…`)
- Progress bar track/fill (prefer brass fill on forest track)
- Option buttons / multi chips
- Contact fields (keep `field` font-size `text-base` on mobile)
- Success state container

Optional micro-copy already in UI (“5 passaggi · nessun impegno”, success title) — **keep strings**.

- [ ] **Step 3: Partner form chrome**

Same rule: borders, spacing, button classes; no field/validation changes.

- [ ] **Step 4: Behavioral regression walkthrough**

Manual lead:

1. Complete all 5 steps including multi caratteristiche.
2. Refresh mid-flow → session restores step/answers.
3. Submit with invalid email → errors show.
4. Success clears storage key.

Manual partner:

1. Prefill from role tile.
2. Draft restore after refresh.
3. Success focus/scroll.

- [ ] **Step 5: Verify build**

```bash
npm run lint
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add components/forms/lead-form.tsx components/forms/partner-form.tsx
git commit -m "style: premium skin for lead and partner forms"
```

---

### Task 6: Remove blueprint dead code + final QA pass

**Files:**
- Delete: `components/motion/blueprint-cinema.tsx`
- Delete: `components/motion/blueprint-field.tsx`
- Modify: `app/globals.css` (remove unused `.blueprint-cinema*` rules if still present)
- Grep-clean any remaining imports
- Optional: update or delete root `design-qa.md` (planimetria QA is obsolete)

- [ ] **Step 1: Grep for blueprint leftovers**

```bash
rg -n "BlueprintCinema|blueprint-cinema|blueprint-field|BlueprintField" --glob '!node_modules/**'
```

Expected: only historical docs if any; no app imports.

- [ ] **Step 2: Delete blueprint components and CSS**

Remove files and obsolete CSS blocks. Keep `.house-cinema*` and shared `.cinema-section*`.

- [ ] **Step 3: Full build**

```bash
npm run lint
npm run build
```

Expected: clean success.

- [ ] **Step 4: Full manual QA (spec §9)**

| # | Check | Pass? |
|---|-------|-------|
| 1 | Home scroll: house 0→4; titles readable on dark and light | |
| 2 | All home CTAs land on `#valutazione`; first field usable | |
| 3 | Lead multi-step: draft, multi, submit success path | |
| 4 | Partner role → `ruolo` preselect + focus | |
| 5 | Privacy legal complete; nav/footer coherent | |
| 6 | `prefers-reduced-motion`: static complete house, no tracer | |
| 7 | Mobile: no horizontal overflow; mobile CTA not covering form fields when open | |
| 8 | Partner and home share visual system (buttons, type, house) | |

Tune opacity only in CSS if house still fights type (lower light-surface opacity first).

- [ ] **Step 5: Commit**

```bash
git add -A components/motion app/globals.css design-qa.md
git status # ensure no accidental form logic rewrites
git commit -m "chore: remove planimetria cinema; final house QA polish"
```

---

## Spec coverage checklist (plan self-review)

| Spec requirement | Task |
|------------------|------|
| Full site scope home+partner+privacy | 1, 3, 4 |
| Living architecture front elevation | 2 |
| Replace planimetria | 2, 6 |
| Content freeze | 3, 4 constraints |
| Form logic freeze + visual skin | 5 |
| Stage maps home/partner | 2, 3, 4 |
| Reduced motion / a11y | 2, 5, 6 |
| No new animation libs | Global |
| Chrome redesign | 1 |
| Journey visual redesign | 3 |
| Opacity / non-invasive house | 2, 6 |

**Placeholder scan:** none intentional.  
**Interface consistency:** `HouseCinema` export; stage dataset names stable across tasks 2–4; form contracts untouched in task 5.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-11-living-architecture-redesign.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks, fast iteration  
2. **Inline Execution** — execute tasks in this session with checkpoints  

Which approach?
