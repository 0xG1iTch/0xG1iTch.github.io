# Engineering Fieldnotes

A static AI engineering portfolio, technical blog, and digital journal. Built with Astro, TypeScript, Tailwind CSS, Markdown/MDX, and a single interactive React content index.

## Run locally

Requires Node.js 22.23.4+ (Node.js 24 recommended).

```sh
npm ci
npm run dev
```

Open the printed local URL (normally http://localhost:4321).

```sh
npm run check    # Astro + TypeScript diagnostics
npm run build    # Generate static HTML in dist/
npm run preview  # Serve the production build
```

## Make it yours

Edit `src/config.ts` for your name, email, GitHub, and LinkedIn. Mohamed EL Hammouchi’s name and supplied social links are configured; optional blank links are omitted. The two editorial pieces are sample content, not claims about deployed projects.

Add `.md` or `.mdx` files in `src/content/work/`. Astro validates frontmatter using `src/content.config.ts`. The filename becomes the URL, for example `my-experiment.md` → `/writing/my-experiment/`.

```yaml
---
title: "A useful technical story"
description: "What the reader will learn."
date: 2026-10-30
type: Experiment # Article | Project | Experiment | Note
topics: [LLMs, Evaluation]
featured: false
sample: false
---
```

The homepage includes a brief statement and primary writing link, the featured entry, up to four latest posts, and topic navigation. “View all posts” opens the complete reverse-chronological archive at `/writing/`. Shared primary topics (including Agentic) are defined in `src/lib/topics.ts`; additional topics come from content frontmatter. Topics without posts show an empty state. Reading time, table of contents, RSS, sitemap, and article metadata are generated at build time. Filters synchronize with URL parameters and support browser back/forward. All story content renders without JavaScript.

Long-form pages support Markdown tables, Shiki code highlighting, and MDX components. Use explicit image dimensions and lazy loading for article images. For public assets in MDX, prefix paths with `import.meta.env.BASE_URL`, as demonstrated in the RAG story. Standard Markdown root-relative image paths must be updated if deploying under a subdirectory.

## GitHub Pages

The app produces only static files and needs no server adapter or database. Every internal navigation and generated endpoint respects `BASE_PATH`.

For a user site:

```sh
SITE_URL=https://USERNAME.github.io npm run build
```

For a repository site:

```sh
SITE_URL=https://USERNAME.github.io BASE_PATH=/REPOSITORY npm run build
```

Replace these values with your actual account and repository. The default `https://example.com` is a placeholder for local development: set `SITE_URL` before publishing so canonical URLs, RSS, and sitemap use your domain.

An optional GitHub Actions workflow is included at `.github/workflows/deploy.yml`. It runs manually from the Actions tab; first enable Pages with GitHub Actions as the source. It does not publish automatically on push. The workflow derives the correct base path for user and repository sites. For a custom domain, update the workflow environment values.

## Structure

```text
src/
  components/       Header, footer, diagram, React feed
  content/work/     Separate Markdown/MDX stories
  layouts/          Shared HTML shell and metadata
  lib/              Content queries, URLs, reading metadata
  pages/            Home, Writing, About, article routes, RSS, sitemap
  styles/           Shared design tokens and responsive styles
  config.ts         Author identity and links
  content.config.ts Typed content collection
public/             Favicons and original SVG diagrams
```

The publication uses self-hosted Public Sans and no third-party runtime services. React loads on the content index only; article and About pages use static HTML. Both themes use only `#141819`, `#F1F0EA`, `#3B4343`, and `#B6C7BB`, defined in `src/styles/global.css`. Code highlighting also uses these colors. The About portrait is imported from `pfp/pfp.jpeg` and optimized by Astro. The accessible header toggle remembers the selected theme when storage is available; otherwise, the initial theme follows the system preference. The theme is applied before rendering to avoid a flash, and code highlighting follows the active theme. Reduced motion, focus indicators, skip navigation, semantic landmarks, and readable mobile layouts are included.
