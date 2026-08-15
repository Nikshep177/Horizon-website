# Project Context

**Horizon** — The Physics and Astronomy Club of IIT Madras website.

## Tech Stack

| Layer | Technology |
|---|---|
| Language | JavaScript (JSX) |
| UI | React 19 |
| Routing | React Router DOM 7 |
| Build | Vite 8 |
| CSS | Plain CSS (split under `src/styles/`) |
| Markdown | react-markdown + remark-gfm |
| Lint | ESLint 10 (flat config) |

## Directory Structure

```
reactic/
├── public/           # Static assets (images, SVGs)
├── src/
│   ├── components/   # Shared components (Header, Footer, Layout, LogoSvg)
│   ├── content/      # Markdown content files with frontmatter
│   │   ├── articles/ # Article .md files (id-based filenames)
│   │   └── events/   # Event .md files (id-based filenames)
│   ├── data/         # Static JSON (projects, team only)
│   ├── lib/          # Utility modules (content-loader, etc.)
│   ├── pages/        # Route page components
│   ├── styles/       # Split CSS files
│   │   ├── variables.css   # CSS custom properties
│   │   ├── reset.css       # Reset + base element styles
│   │   ├── layout.css      # Container, header/nav, footer
│   │   ├── components.css  # Buttons, cards, grids, modals, tags
│   │   └── pages.css       # Page-specific styles (hero, guild, etc.)
│   ├── App.jsx       # Route definitions
│   ├── main.jsx      # Entry point (BrowserRouter)
│   └── index.css     # @import entry point for all style files
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | Home | Hero, feature cards, CTA |
| `/projects` | Projects | Project grid cards |
| `/projects/:id` | ProjectDetail | Full project page |
| `/events` | Events | Event cards + modal popups |
| `/articles` | Articles | Article listing |
| `/articles/:id` | ArticleDetail | Full article view |
| `/astrophotography` | Astrophotography | Filtered article list |
| `/guild` | Guild | Club guild page |
| `/team` | Team | Team member cards |
| `/contact` | Contact | Email, social links, address |

## Coding Conventions

- **Components:** `export default function PascalCase` — no `React.FC`, no TypeScript, no PropTypes
- **Imports:** ES module syntax, relative paths (no aliases), no barrel exports
- **Content:** Articles and events stored as Markdown files in `src/content/` with YAML frontmatter for metadata. Loaded via `import.meta.glob` in `src/lib/content-loader.js`. Rendered with `react-markdown` + `remark-gfm` — no `dangerouslySetInnerHTML`
- **Data:** Static JSON files in `src/data/` for projects and team only
- **CSS:** Split across `src/styles/` with CSS custom properties; BEM-like naming (`.project-card__image`)
- **State:** Local `useState` only; no global state library
- **Hooks used across codebase:** `useState`, `useParams`, `useNavigate` — no custom hooks yet

## Available Scripts

```sh
npm run dev       # Start dev server
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint check
```

## Key Notes for AI Agents

- No testing framework exists — do not add tests unless asked
- No CSS framework (no Tailwind, no CSS Modules, no styled-components)
- No TypeScript — the `@types/react` devDeps exist but are unused; keep JSX
- No formatter (Prettier) configured — don't reformat files
- Content is fully static (Markdown files in `src/content/` + JSON for projects/team)
- To add a new article/event: create a `.md` file in the right `src/content/` directory with frontmatter; it's auto-discovered at build time
- All images reference `/assets/images/` paths (public directory)
- The `icons.svg` sprite in `/public/` has Bluesky/Discord/X icons not yet used anywhere
- `npm run lint` must pass before considering work complete
