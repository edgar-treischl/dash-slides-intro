# Copilot Instructions for template-slidev

This is a **Slidev presentation template** built with Vue 3 and UnoCSS. The project generates interactive slides from Markdown with support for custom Vue components and layouts.

## Environment Setup

**Requirements:** Node.js 18+, Yarn  
**Install:** `yarn install`

## Key Commands

| Task | Command |
|------|---------|
| Start dev server | `yarn dev` or `make dev` |
| Build for production | `yarn build` or `make build` |
| Export to PDF/HTML | `yarn export` or `make export` |
| Clean build artifacts | `make clean` |
| Deploy to GitHub Pages | `make deploy` |

The dev server runs on `http://localhost:3030` by default.

## Architecture

### Directory Structure
- **`slides.md`** — Main presentation entry point. Orchestrates slide order by importing pages from the `pages/` directory. Front matter sets global presentation config (theme, layout, aspect ratio, etc.)
- **`pages/`** — Individual slide/section files (e.g., `toc.md`, `01.md`, `02.md`). Each referenced in `slides.md` via `src:` directive
- **`layouts/`** — Custom Slidev layouts (Vue components): `TitleSlide.vue`, `TwoColumn.vue`
- **`styles/`** — Global CSS/styling overrides
- **`public/`** — Static assets (images, etc.)
- **`slidev.config.ts`** — Slidev configuration (base URL, Vite plugins, build settings)

### How Slides Work
1. Slidev reads `slides.md` as the main entry point
2. Content is split by `---` delimiters into individual slides
3. Custom layouts are used by setting `layout: LayoutName` in frontmatter
4. External pages are included via `src: ./pages/filename.md`
5. Vue components can be used directly in Markdown (e.g., `<MyComponent />`)

### Styling & Icons
- **CSS Framework:** UnoCSS (configured in `slidev.config.ts` and `uno.config.ts`)
- **Icon Collections:** Installed via `@iconify-json/*` packages
  - `@iconify-json/carbon` — Carbon Design System icons
  - `@iconify-json/mdi` — Material Design Icons
  - `@iconify-json/lucide` — Lucide icons
- **Icon Usage:** `<carbon-icon-name class="text-size text-color" />` (class names use UnoCSS utility syntax)

## Key Conventions

### Slide Organization
- Keep `slides.md` lightweight — use it for orchestration only
- Store individual slides/sections in `pages/` directory with descriptive names
- Use the `src:` directive to include page files: `src: ./pages/section-name.md`

### Custom Layouts
- Store layout components in `layouts/` directory
- Layouts must be Vue SFC components (`.vue` files)
- Use `<slot />` or named slots for content insertion
- Example: `TitleSlide.vue` uses `<template #title>` and `<template #subtitle>` slots

### Markdown Features
- **Frontmatter:** Use YAML at the top of `slides.md` and individual pages for slide-specific config
- **Transitions:** Set with `transition: slide-left` (or other transitions)
- **Slide Layouts:** Set with `layout: LayoutName`
- **Themes:** Built-in themes: `default`, `seriph`; install additional via npm

### Deployment
- Builds output to `dist/` directory
- `make deploy` uses `gh-pages` package to push `dist/` to the `gh-pages` branch
- GitHub Pages must be configured to deploy from this branch
- Base URL is set in `slidev.config.ts` to `/template-slidev/` — adjust if deploying to a different path

## Adding New Slides

1. Create a new file in `pages/` (e.g., `pages/04.md`)
2. Add frontmatter and content:
   ```md
   ---
   layout: default
   ---
   # Section Title
   Content here...
   ```
3. Reference it in `slides.md`:
   ```md
   ---
   src: ./pages/04.md
   ---
   ```

## Adding New Vue Components

1. Create a `.vue` SFC file in `layouts/` (for layouts) or add component files to `pages/` if reusable across slides
2. Use in Markdown as: `<ComponentName />`
3. Pass props with Markdown syntax: `<MyComponent prop="value" />`

## Configuration Files

- **`slidev.config.ts`** — Base URL, Vite plugins (UnoCSS), chunk size limits
- **`uno.config.ts`** — UnoCSS presets and theme customization
- **`package.json`** — Dependencies, scripts, and project metadata
- **`Makefile`** — Convenience commands wrapping Yarn tasks and deployment
