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
