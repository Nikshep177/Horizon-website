# Data Contracts

The JSON files in this directory are application data, not presentation markup. Keep the field names below stable when adding records. `scripts/validate-data.mjs` checks these contracts before every production build.

## Projects

`projects.json` is keyed by tenure. Each project requires `id`, `title`, `excerpt`, `content`, and `image`. Project route identity is scoped by tenure: `/projects/:id?tenure=:tenure`.

## Events

`events.json` is keyed by tenure and then event category. Each event requires `id`, `title`, and a `description` or `about` property. Detail pages use `/events/:category?year=:tenure`. Event content uses one of `subcards` or `tiles`.

## Competitions

`competitions.json` is an array. Each record requires a unique `id`, `name`, `description`, non-empty `years`, and `image`. Detail pages use `/guild/competitions/:id`.

## Astrophotography

`astro-gallery.json` is an array. Each record requires a unique `id`, `title`, `description`, `imageSrc`, and `highResImageSrc`. Gallery entries are also used as the image-modal model.

## Team

`team.json` is keyed by tenure. Each member requires a unique `name` within that tenure, plus `role` and `section`. Team photographs currently remain in the page-level image map until the image ownership decision in `checklist.md` is completed.

## IPT Problems

`ipt-problems.json` contains one object per year with a unique `year` and a `problems` array. Each problem requires `title`, `description`, and `image`. The Markdown records in `src/content/ipt/` provide the routed problem details and require a unique `year` plus slug pair.

## Markdown Frontmatter

Articles require `title`, `author`, `date`, and `image`. Event posts require `title`, `date`, `poster`, and `category`. IPT problem posts require `title`, `year`, `slug`, `image`, and `description`. The local parser supports scalar strings, quoted strings, numbers, booleans, null values, and inline lists. Markdown body images are resolved through the shared asset-path utility.
