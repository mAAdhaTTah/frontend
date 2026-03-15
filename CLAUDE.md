# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev           # Start Next.js dev server
npm run dev:storybook # Start Storybook on port 6006

# Build
npm run build         # Build Next.js app
npm run build:storybook

# Testing
npm test              # Full suite: format check + lint + unit tests
npm run test:unit     # Jest unit tests only
npm run test:lint     # ESLint (zero warnings policy)
npm run test:check    # Prettier format check

# Fix
npm run fix           # Auto-fix formatting and lint issues
```

To run a single Jest test file:

```bash
npx jest path/to/test.js
```

## Architecture

Personal website (jamesdigioia.com) built on **Next.js 16 App Router** with MDX-based content. Uses **ES modules** (`"type": "module"` in package.json), **JavaScript with JSDoc types** (no TypeScript files), and **Tailwind CSS v4**.

### Path Aliases (jsconfig.json)

| Alias | Directory |
|-------|-----------|
| `@app/*` | `src/@app/*` |
| `@reading/*` | `src/@reading/*` |
| `@ui/*` | `src/@ui/*` |
| `@vault/*` | `src/@vault/*` |

### Module Structure

- **`src/@app/`** — App-wide config (API credentials, env vars)
- **`src/@reading/`** — Server component that fetches from external Reading List API
- **`src/@ui/`** — Reusable UI component library (atoms, layout, typography, server components)
- **`src/@vault/`** — Vault/notes system: MDX compilation via `next-mdx-remote`, routing, sitemap
- **`src/app/`** — Next.js App Router pages (catch-all `[[...slug]]` route, feeds, sitemap)

### Content Architecture

Content comes from multiple sources:
1. **Reading List API** — external reading list aggregation
2. **Vault notes** — MDX files compiled server-side via `next-mdx-remote`

The `@vault/` module handles vault/notes routing separately.

### Server vs. Client Components

- Most components are **server components** (import `server-only`)
- `@reading/server.js` and `@vault/server.js` are the primary server entry points
- Components in `src/@ui/server/` are explicitly server-side

### Storybook & Testing

- Storybook 10.x with `@storybook/nextjs` framework — used for component documentation
- CI publishes to **Chromatic** for visual regression testing (only changed stories)
- Jest uses `jsdom` environment with path alias mapping matching jsconfig.json

### Link Metadata

Link pages (`frontmatter.link`) display an embedded image fetched via `open-graph-scraper` in the `Embed` component in `src/@vault/page.js`. It throws on scraper error (caught by the `ErrorBoundary`) and returns `null` if no `og:image` is present.

### Key Config Notes

- `redirects.json` — comprehensive redirect rules loaded by `next.config.js`
- Static generation timeout: 120 seconds (content fetching can be slow)
- Remote image domains: `static.jamesdigioia.com`, `www.poynter.org`, YouTube, Blogspot
- Prettier config: `brookjs-prettier-config`
- ESLint: flat config (`eslint.config.js`), zero warnings enforced in CI

### Commits

Always run `npm test` before committing and fix any failures before proceeding.

Follow the Linus Torvalds style for git commit messages: subject line under 50 characters in imperative mood, blank line, then a prose body with lines wrapped at 72 characters that explains the *why* rather than just restating the diff. No bullet points. The 72-character line wrap applies to commit messages only, not to other files.