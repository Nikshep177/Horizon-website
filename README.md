# Horizon Website

Horizon is the Physics and Astronomy Club of IIT Madras website.

## Development

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

The local development server uses `/` as its base path.

## Production Build

Create and preview the production build with:

```sh
npm run build
npm run preview
npm run validate:data
```

Production assets are configured for GitHub Pages under `/Horizon-website/`. The site uses `HashRouter`, so deployed routes use the `/#/` form and do not require server-side fallback configuration.

## Project Areas

- `src/pages/` contains route page components.
- `src/components/` contains shared UI and visual-effect components.
- `src/routes.jsx` contains the route table and lazy page imports.
- `src/content/articles/` contains article Markdown files.
- `src/content/events/` contains event Markdown files.
- `src/content/ipt/` contains IPT problem Markdown files.
- `src/data/` contains projects, events, team, gallery, and competition data.
- `public/` contains static image, icon, and other public assets.
- `src/styles/` contains shared and page-specific CSS.

Markdown content is discovered automatically through the content loader. New articles, events, and IPT problems should follow the existing frontmatter and filename conventions.

Markdown and JSON data are currently loaded eagerly because the site has a small, static content set and this keeps collection filtering deterministic. If the content volume grows materially, move collections to route-level or build-time chunks before the initial payload becomes a concern.

External links in the application open in a new tab with `noopener noreferrer`. Internal routes use React Router links. Markdown links follow the same external-link policy.

Typography intentionally uses the Orbitron and Exo 2 families from Google Fonts, loaded once from `src/index.css` with the system font stack as a fallback. The unused VariableProximity demo keeps its own optional font import isolated to that component.

## Supported Routes

- `/`
- `/projects` and `/projects/:id`
- `/events` and `/events/:category`
- `/qiskit`
- `/articles` and `/articles/:id`
- `/astrophotography`
- `/guild` and `/guild/competitions/:id`
- `/ipt` and `/ipt/:year/:slug`
- `/team`
- `/contact`

## Checks

Run the project checks before submitting changes:

```sh
npm run lint
npm run build
```

The production build also runs `validate:data` and `check:bundle`. The current JavaScript budget is 2 MiB total and 500 KiB for any single chunk; image budgets are tracked separately because the current image backlog is human-owned.
