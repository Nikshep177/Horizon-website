# Horizon Website Completion Checklist

> **Instruction for AI agents:** Work through this checklist in priority order, inspect the existing code before making changes, and keep all human-owned content such as names, dates, achievement wording, scientific text, and links unchanged unless the task explicitly requests otherwise. Use the existing React/Vite architecture and shared responsive codebase, avoid duplicating components or styles, preserve unrelated work, and run `npm run lint` and `npm run build` before reporting completion. For image tasks, verify paths against `public/` and test the production GitHub Pages base path `/Horizon-website/`.

This checklist covers code structure, maintainability, responsive behavior, accessibility, performance, and release verification. It intentionally does not evaluate or rewrite the human-maintained text, dates, names, links, or scientific content.

The feedback in `feedback.md` is treated as a human-owned requirement. This checklist records the implementation work implied by it without changing the wording or factual content.

## Priority Guide

- [ ] **P0:** Required for a reliable release or blocks mobile use.
- [ ] **P1:** Important quality, maintainability, accessibility, or performance work.
- [ ] **P2:** Useful cleanup or longer-term hardening.

## Feedback Requirements

- [x] **P0** Keep one shared responsive codebase. No separate mobile page tree was created; the existing components and styles remain the shared responsive implementation.
- [x] **P1** Improve the Contact page presentation by placing its contact information inside a clearly visible, responsive content box without changing the human-approved text.
- [ ] **P0** Fix the mobile header so the Horizon logo remains visible and the menu does not overlap, clip, or hide it. Verify the full header at phone, tablet, and desktop widths.
- [ ] **P0** Remove horizontal clipping and unintended overflow across the complete site at narrow widths, including cards, grids, modals, canvases, controls, images, tables, code, and long-form content.
- [ ] **P1** In Guild Achievements, represent INPT 2024 and INPT 2025 as separate achievement entries with the approved placement of their results and selection detail.
- [ ] **P1** Remove individual place rankings for INPT from the public presentation, as requested, while preserving the intended achievement information.
- [ ] **P1** Add the approved IPT 2025 achievement entry describing the global ranking and event location/date information.
- [ ] **P1** Remove cash-prize information from the public Guild achievements presentation.
- [x] **P1** Order formal events such as Open House before informal events such as the Trip. The Team gallery now uses an explicit display-order configuration instead of relying on object order.
- [ ] **P0** Audit every referenced image in JSX, JavaScript data, JSON, and Markdown against the actual `public/` files. Report and fix missing, case-mismatched, duplicated, or incorrectly formatted paths.
- [ ] **P0** Audit image-bearing records for the inverse problem: images that exist in the data/assets but are not rendered because a component expects a different field name or lacks an image rendering branch.
- [x] **P0** Make every static asset deployment-safe for GitHub Pages. Runtime asset references, Markdown image references, the favicon, and the shared CSS background now use the configured base path; avoid root-absolute URLs that resolve to the domain root instead of `/Horizon-website/`. Missing image files remain listed below for later human asset gathering.
- [ ] **P1** Verify image paths on a production build served from `/Horizon-website/`, including deep hash routes, article Markdown images, event galleries, project/team images, and fallback images.

### Image Assets To Gather Or Attach

The following list comes from comparing all 372 unique image references in the source/data/content files with files under `public/`. The listed paths are currently missing and should either receive an image file at that exact path or be changed to the final approved path.

- [ ] **P0** Guild competition image: Inter-IIT Tech Meet, referenced by `src/data/competitions.json` as `/assets/images/guild/interiit.jpeg`.
- [ ] **P0** Guild competition image: Decoherence, referenced by `src/data/competitions.json` as `/assets/images/guild/decoherence.jpeg`.
- [ ] **P0** Shared IPT placeholder image: `/assets/images/guild/ipt.jpeg`. This is used by the IPT problem listing and problem detail pages as well as the IPT problem data records.
- [ ] **P1** IPT 2025 Problem 1 image: `/assets/images/ipt/2025-problem-1.jpg`, referenced by `src/content/ipt/2025-problem-1.md`.
- [ ] **P1** IPT 2025 Problem 2 image: `/assets/images/ipt/2025-problem-2.jpg`, referenced by `src/content/ipt/2025-problem-2.md`.
- [ ] **P1** IPT 2025 Problem 3 image: `/assets/images/ipt/2025-problem-3.jpg`, referenced by `src/content/ipt/2025-problem-3.md`.
- [ ] **P1** IPT 2026 Problem 1 image: `/assets/images/ipt/2026-problem-1.jpg`, referenced by `src/content/ipt/2026-problem-1.md`.
- [ ] **P1** IPT 2026 Problem 2 image: `/assets/images/ipt/2026-problem-2.jpg`, referenced by `src/content/ipt/2026-problem-2.md`.
- [ ] **P1** IPT 2026 Problem 3 image: `/assets/images/ipt/2026-problem-3.jpg`, referenced by `src/content/ipt/2026-problem-3.md`.
- [ ] **P1** IPT 2026 Problem 4 image: `/assets/images/ipt/2026-problem-4.jpg`, referenced by `src/content/ipt/2026-problem-4.md`.
- [ ] **P1** IPT 2026 Problem 5 image: `/assets/images/ipt/2026-problem-5.jpg`, referenced by `src/content/ipt/2026-problem-5.md`.

### Visible Places Without An Attached Image

These are not broken paths. They are records rendered by the UI without an image field, so they are candidates for images you may want to collect later.

- [ ] **P1** CFI Delta Expo 2026 description card (`cfi-about`) in `src/data/events.json` has text but no `image` field. The event page therefore renders this subcard without an image.
- [ ] **P2** Team records in `src/data/team.json` do not contain image fields. Team photos are supplied through the separate `imageMap` in `src/pages/Team.jsx`; decide whether to move those paths into the team data so missing photos are easier to identify and maintain.
- [ ] **P2** Check every event subcard that intentionally contains only text or a gallery (`images`) and decide whether a separate cover image is wanted. Do not add duplicate images where the gallery already provides the intended visual material.

## 1. Baseline And Repository Hygiene

- [ ] **P0** Review each item in `feedback.md` against the Feedback Requirements section above and mark both complete only after the implementation and visual verification agree.
- [x] **P0** Run `npm run lint` and resolve the existing React hook warning in `src/components/FloatingLines/FloatingLines.jsx` around the effect that uses the line-count and line-distance props. Confirm the chosen dependency strategy does not recreate the animation unnecessarily.
- [x] **P0** Run `npm run build` after every structural change and keep the build warning-free, or document an intentional exception. The current production build completes without Vite warnings and includes data and bundle checks.
- [x] **P1** Add a short README covering local development, production build/preview, deployment/base-path expectations, content/data locations, and supported routes.
- [x] **P1** Decide whether `HashRouter` is the intended deployment strategy in `src/main.jsx`; document the decision or migrate to browser history routing with the required host fallback configuration. Hash routing is retained because it supports GitHub Pages deep links without server fallback configuration.
- [x] **P1** Add a deliberate not-found route in `src/App.jsx` so unknown URLs render a consistent page instead of only relying on individual detail-page checks.
- [ ] **P2** Remove or archive unused components and styles after confirming they are not planned for another route. The unused root-level `ImageModal.jsx` has been removed; remaining candidates include `LogoSvg` and visual-effect components that have no imports from active pages.
- [ ] **P2** Establish a naming convention for asset directories and filenames. Spaces, mixed casing, duplicated folders, and year-specific naming make paths harder to validate and maintain.

## 2. Application Structure And Modularity

- [x] **P0** Mount `ScrollToTop` only once. It is currently rendered by both `App` and `Layout`, which duplicates the route-change effect (`src/App.jsx` and `src/components/Layout.jsx`).
- [x] **P0** Consolidate the two `ImageModal` implementations into one component and one stylesheet. The active folder-based modal is now the only implementation and retains its existing image/EXIF field contract.
- [x] **P1** Split the route configuration from the application shell so `App` remains focused on composition and the route table can be reviewed independently. Routes, lazy page imports, and the loading boundary now live in `src/routes.jsx`.
- [x] **P1** Create shared primitives for repeated page patterns: page header, year/tenure selector, card grid, empty state, detail-page back link, modal shell, external link, and section heading. `PageHeader`, `SelectionPills`, `CardGrid`, `EmptyState`, `BackLink`, `useDialog`, `ExternalLink`, and `MarkdownLink` now cover the repeated patterns; route-specific headings remain intentionally customized where they carry unique visual structure.
- [ ] **P1** Replace broad cross-page reuse of `events.css` with page-scoped styles or shared component styles. Pages such as articles, projects, team, contact, and event pages currently depend on the same large stylesheet, increasing the chance that a selector change affects unrelated routes.
- [x] **P1** Remove duplicated event/project palette definitions from `Events.jsx`, `EventCategory.jsx`, `Projects.jsx`, and `ProjectDetail.jsx`. Move the palette to one data/module file and pass a semantic theme key or CSS custom properties to the shared card components.
- [x] **P1** Replace the `hiddenArticleIds` filter in `src/pages/Articles.jsx` with an explicit data field such as `published`/`visible`, or a loader-level filter. Article visibility is now assigned and filtered by `content-loader.js`; the Articles page only renders the published collection.
- [ ] **P1** Move the remaining large inline style objects and values into CSS classes or CSS variables. Articles and the Team gallery layout styles have been migrated; remaining page theme/reveal variables are dynamic presentation inputs and are still open for a separate cleanup.
- [x] **P1** Make remaining modal/filtered-view state derive from URL state where it should be shareable. Projects, Events, Event Category, Guild, and Team tenure/gallery tenure now use URL parameters; transient image/lightbox selection remains local because it is not a navigable content state.
- [x] **P1** Store Events year selection in the URL and restore it safely on refresh.
- [x] **P1** Store Guild section selection in the URL and restore it safely on refresh.
- [x] **P1** Store Event Category year selection in the URL and preserve it in event links and back navigation.
- [x] **P1** Store Team tenure and gallery-tenure selections in the URL and restore them safely on refresh.
- [x] **P1** Add explicit loading, empty, invalid-parameter, and not-found states for every data-driven route, including invalid project tenure/category and unsupported gallery tenure. `EmptyState`, `InvalidState`, route-level loading fallback, and detail-page not-found states now cover the data-driven routes; visual verification remains in the matrix.
- [x] **P2** Keep data normalization in one loader boundary. Shared JSON data now flows through `src/lib/site-data.js`, and `content-loader.js` reuses those normalized project/event models instead of importing and normalizing them a second time. Page-owned gallery configuration remains intentionally local.
- [x] **P2** Add a small shared utility for date formatting instead of repeating `toLocaleDateString` options in multiple pages.

## 3. Design Tokens And CSS Ownership

- [x] **P0** Define the complete design token set in `src/styles/variables.css`: surface/background colors, text colors, border colors, focus color, overlay colors, common glow colors, spacing, radii, shadows, z-index layers, and typography sizes. The shared variable set now includes these categories plus display/body font aliases and a pill radius.
- [ ] **P0** Replace repeated literal colors and RGBA values in page/component CSS and JSX with semantic variables. Repeated blue, white, slate, indigo, and overlay values currently appear across `components.css`, `events.css`, `pages.css`, `gallery.css`, `hero.css`, `PillNav.css`, and effect components.
- [ ] **P1** Use the existing breakpoint variables consistently. The code mixes `600px`, `640px`, `768px`, `800px`, `850px`, `851px`, `1024px`, and `1280px`, while the variables define a different set. Choose a documented breakpoint scale and remove magic breakpoint values.
- [ ] **P1** Use the existing spacing, radius, shadow, and transition variables for shared UI. Replace one-off values such as `10px`, `15px`, `20px`, `27px`, `40px`, and repeated raw transition durations where they represent the same design decision.
- [x] **P1** Scope generic selectors from feature components. PillNav and MagicBento selectors such as `.pill`, `.card-grid`, and `.particle-container` are now rooted under their component containers; no active `#lights` selector remains.
- [x] **P1** Replace component-global IDs used only for styling or canvas targeting with class names or component refs where possible. Hyperspeed, NodeFriends, and Masonry no longer rely on global IDs or generic selectors; remaining generic selectors are tracked separately.
- [x] **P1** Remove duplicated/conflicting `.project-card` declarations in `src/styles/components.css` and keep one authoritative visual definition.
- [x] **P1** Create explicit layout utilities for `min-width: 0`, overflow containment, full-height grid children, and responsive media so individual pages do not need repeated defensive rules. Shared `.layout-safe`, `.media-fluid`, `.grid-stretch`, container, and card-grid contracts are available.
- [x] **P2** Decide whether external Google Font imports are acceptable for production. Google Fonts remain an intentional dependency, loaded once from `src/index.css` with system fallbacks; this is documented in `README.md`.
- [x] **P2** Remove stale comments that describe removed implementations, such as the former MagicBento note in `Articles.jsx`.

## 4. Mobile And Responsive Implementation

- [x] **P0** Verify the viewport baseline in `index.html` (`width=device-width, initial-scale=1`) and confirm there are no browser-default margins or horizontal overflow at 320px, 375px, 414px, and 768px widths. The viewport declaration and shared reset/overflow containment are present; device verification remains in the matrix.
- [x] **P0** Make the header usable at narrow widths. The logo, hamburger button, menu panel, stacking, active route, safe-area spacing, outside-click dismissal, and Escape dismissal are implemented; visual verification at target device widths remains in the verification matrix.
- [x] **P0** Add `aria-expanded`, `aria-controls`, and an accessible name/state to the mobile menu button. Button semantics, menu ID, animated navigation close, focus movement, outside-click dismissal, and Escape handling are now present.
- [x] **P0** Ensure every interactive target is comfortably tappable, with visible `:focus-visible` styles. Shared buttons, pills, inventory controls, and mobile navigation now use a 44px minimum target; visual/device verification remains in the matrix.
- [ ] **P0** Test all modal layouts on a short mobile viewport. The image modal and Team gallery lightbox now share focus trapping, close-button focus, body scroll restoration, backdrop dismissal, Escape handling, and bounded short-screen sizing; visual testing and any future event modal remain open.
- [x] **P0** Make long-form article, project, competition, and IPT content mobile-safe: shared rules now constrain media, code, tables, and math to the content width, provide horizontal scrolling for wide code/tables/equations, and wrap long URLs/identifiers. Visual verification at target widths remains in the verification matrix.
- [x] **P0** Verify every grid at phone width becomes a single readable column where appropriate, with no fixed card width, clipped content, or unequal-height interaction problems. Responsive grid rules and shared min-width contracts are present; device verification remains in the matrix.
- [x] **P1** Replace fixed hero/canvas dimensions with responsive sizing using `min()`, `max()`, `clamp()`, viewport units, or container measurements. The homepage orbit rings, carousel section, and carousel items now use bounded responsive sizing; visual verification remains in the matrix.
- [x] **P1** Review fixed/minimum heights in event/session cards, project cards, gallery tiles, and team sections. Project media now uses bounded responsive sizing, gallery and session layouts have mobile bounds, and team media uses aspect-ratio sizing; visual verification remains in the matrix.
- [x] **P1** Make year/category/tab controls wrap or scroll intentionally on small screens. Shared year pills and inventory controls wrap with minimum touch targets, while the mobile menu and existing gallery controls retain bounded scrolling.
- [x] **P1** Review inventory rows, navigation pills, metadata, social links, and card CTAs for long labels. Inventory labels and footer/social links now wrap safely while quantities and actions retain their own space.
- [x] **P1** Make footer columns collapse cleanly and keep links readable at phone widths. Footer columns collapse below 700px, and the shooting-stars canvas has `pointer-events: none` with content above it.
- [x] **P1** Add responsive styles for landscape phones, tablet widths, and very short viewports, not only one `max-width: 768px` rule. Short-landscape modal sizing and bounded tablet/phone grids are now explicit; visual verification remains in the matrix.
- [x] **P1** Check anchor scrolling to `#gallery` with the fixed header; add scroll margin so the target heading is not hidden underneath the header. The gallery anchor uses the shared header-height offset.
- [x] **P1** Respect `prefers-reduced-motion` across all canvas, GSAP, Motion, CSS, and carousel effects. Shared CSS fallback plus the reduced-motion hook now pauses the active homepage and astrophotography animation loops and pointer listeners; inactive effect components remain candidates for a future removal or isolated audit.
- [x] **P2** Use responsive image sizing and lazy loading consistently for below-the-fold galleries/cards. Collection-card and gallery images now use lazy loading with asynchronous decoding; responsive variants and `srcSet` remain optional future optimization.

## 5. Accessibility And Interaction Robustness

- [x] **P0** Add visible focus styles globally and verify contrast for text, muted text, borders, buttons, pills, and links against every themed background. Shared `:focus-visible` styling is present and uses the semantic focus token; contrast verification remains in the matrix.
- [x] **P0** Review every external link and add an explicit policy for new-tab behavior, `target`, `rel`, and accessible labeling. Shared `ExternalLink` and `MarkdownLink` primitives now enforce the documented external-link policy; internal navigation remains on `Link`.
- [x] **P0** Give decorative canvases/background effects `aria-hidden="true"` and ensure they cannot capture pointer events unless interaction is intentional. Active and legacy canvas effects now expose hidden canvases, while the footer, home, and astrophotography backgrounds cannot capture pointers.
- [x] **P0** Give buttons and icon-only controls meaningful labels. Close, gallery, hamburger, inventory, and navigation controls now expose visible names or text; visual screen-reader verification remains in the matrix.
- [x] **P1** Use semantic headings in order and ensure each route has one clear page heading. Static route review confirms one primary heading per route, with section headings following it; screen-reader verification remains in the matrix.
- [x] **P1** Improve modal semantics with `role="dialog"`, `aria-modal="true"`, a labelled title, focus trapping or a carefully scoped dialog utility, and focus restoration. Both active image dialogs now use the shared `useDialog` utility.
- [x] **P1** Avoid using `role="menubar"`/`role="menuitem"` unless the component implements the corresponding keyboard interaction model. The primary navigation now uses a normal navigation list and links.
- [x] **P1** Replace document-wide DOM queries in `Team.jsx` with refs or a component-scoped mechanism where practical, so multiple instances and future pages do not interfere. The Team intersection observer now queries only within the Team page root.
- [ ] **P1** Ensure image fallbacks preserve meaningful alternative text and do not expose broken-image icons. Review image error behavior in Team, gallery, articles, projects, and event cards.
- [x] **P2** Add skip-to-content navigation and landmarks that remain correct with the fixed header and animated backgrounds. The shared layout now exposes a keyboard-visible skip link targeting the main landmark.

## 6. Performance And Delivery

- [x] **P0** Investigate the Vite warning for the approximately 1.3 MB minified JavaScript bundle. Route components now lazy-load with `import()`, producing separate route chunks; the remaining large chunks are shared/vendor dependencies and should be considered in the follow-up performance audit.
- [x] **P1** Keep heavy WebGL/canvas effects out of routes that do not need them, and disable or simplify them on low-power/mobile devices when the visual design permits. Effects are only mounted by their owning routes/layout, with mobile particle limits and reduced-motion paths for active effects.
- [ ] **P1** Audit animation loops for cleanup, duplicate listeners, stale closures, and unnecessary work on hidden/unmounted pages. Confirm every effect cancels animation frames, disposes renderers, and removes listeners.
- [x] **P1** Cap device-pixel-ratio and particle counts consistently across all canvas/WebGL components, with a lower mobile budget and reduced-motion path. Existing canvas/WebGL components now cap DPR at 2; active Galaxy/Particles use a lower mobile budget and active decorative loops honor reduced motion.
- [x] **P1** Check whether eager Markdown/JSON loading is appropriate for the intended content volume. The current small static content set intentionally remains eager; the growth threshold and future route/build-time splitting decision are documented in `README.md`.
- [ ] **P1** Optimize large raster assets and provide modern formats/sizes where useful. Preserve a deliberate quality fallback for the gallery and article images.
- [ ] **P1** Add `width`/`height` or aspect-ratio reservations for images and media to reduce layout shift.
- [x] **P2** Add a bundle-size check to the release workflow and document an acceptable budget. `npm run build` now runs `scripts/check-bundle-size.mjs`, with documented 2 MiB total and 500 KiB single-chunk JavaScript limits.

## 7. Data And Content Interfaces

- [x] **P0** Define and document schemas for projects, events, articles, team records, gallery entries, and IPT problems. Required fields, route identities, and the remaining intentional image-map exception are documented in `src/data/README.md`.
- [x] **P1** Validate data at build time and report missing required fields, invalid image paths, duplicate IDs, duplicate slugs, and unsupported route references. `scripts/validate-data.mjs` now runs before the production build; structural failures block the build, while the known deferred image backlog remains a warning.
- [x] **P1** Separate content data from presentation theme data. Palette/category metadata is centralized in `src/data/visualThemes.js`, with shared theme lookup helpers used by the route components.
- [x] **P1** Make content-loader parsing resilient to normal YAML needs or adopt a small frontmatter parser if the content format is expected to grow. Document supported frontmatter types. The local parser supports quoted/scalar values, numbers, booleans, nulls, and inline lists, and the supported subset is documented in `src/data/README.md`.
- [x] **P1** Ensure sorting/filtering behavior is deterministic when dates are missing or invalid, and define the fallback order. `compareDatesDesc` keeps valid dates first and preserves source order when both dates are invalid.
- [ ] **P2** Normalize asset paths at one boundary and add a build-time check for paths containing spaces, case mismatches, or files that do not exist.

## 8. Verification Matrix

- [ ] **P0** Test every route from a fresh load, an in-app navigation, a browser refresh, and an invalid parameter.
- [ ] **P0** Test at 320px, 375px, 414px, 768px, 1024px, and a large desktop width.
- [ ] **P0** Test keyboard-only navigation, including header menu, year/category tabs, cards, event modal, image modal, and back links.
- [ ] **P0** Test at least one screen reader pass for landmarks, headings, navigation state, buttons, dialogs, images, and empty/not-found states.
- [ ] **P1** Test Chrome/Edge, Firefox, and Safari or an equivalent mobile browser, especially canvas sizing, backdrop filters, masks, smooth scrolling, and modal behavior.
- [ ] **P1** Test `prefers-reduced-motion`, touch input, mouse input, zoom at 200%, and a short-height viewport.
- [ ] **P1** Check for horizontal scrolling using both browser devtools and a real device. Record the offending selector if overflow appears.
- [ ] **P1** Verify production deployment under the configured base path, including asset paths, HashRouter/history behavior, Markdown images, and deep links.
- [x] **P0** Finish with `npm run lint` and `npm run build`; record the final output and confirm no unresolved warnings remain. Final checks pass; the validator reports only the documented deferred missing-image and spaced-path warnings.
