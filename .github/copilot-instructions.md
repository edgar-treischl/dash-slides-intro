# Copilot Instructions for dash-slides-intro

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

### Icons
- **Icon Collections:** Installed via `@iconify-json/*` packages
  - `@iconify-json/carbon` — Carbon Design System icons (primary)
  - `@iconify-json/mdi` — Material Design Icons
  - `@iconify-json/lucide` — Lucide icons
  - `@iconify-json/bi` — Bootstrap Icons
- **Icon Usage:** `<carbon-icon-name class="text-size text-color" />` (class names use UnoCSS utility syntax)
- Icons automatically load from external packages via `uno.config.ts` preset configuration

## Key Conventions

### Slide Organization
- Keep `slides.md` lightweight — use it for orchestration only
- Store individual slides/sections in `pages/` directory with descriptive names
- Use the `src:` directive to include page files: `src: ./pages/section-name.md`

### Custom Layouts
- Store layout components in `layouts/` directory
- Layouts must be Vue SFC components (`.vue` files)
- Use `<slot />` or named slots for content insertion
- **Available Custom Layouts:**
  - `TitleSlide.vue` — Cover slide with animated background, uses `#title`, `#subtitle`, and `#author` slots
  - `EndSlide.vue` — Closing slide with split layout: content on left, links on right (`#title`, `#subtitle` slots)
- Both custom layouts feature:
  - Animated gradient backgrounds with floating blob elements
  - Blue color scheme with glow effects
  - Smooth fade-in animations
  - Icon links (profile, GitHub, download)

### Markdown Features
- **Frontmatter:** Use YAML at the top of `slides.md` and individual pages for slide-specific config
- **Transitions:** Set with `transition: slide-left` (or other transitions like `fade`)
- **Slide Layouts:** Set with `layout: LayoutName` (e.g., `default`, `two-cols`, `TitleSlide`, `EndSlide`)
- **Themes:** Built-in themes: `default`, `seriph`; currently using `default`
- **Interactive Elements:** `<v-click>` for click-to-reveal, `<v-mark>` for highlighting
- **Highlight Syntax:** 
  - Box style: `<span class="box red">text</span>` (red, yellow, green, blue)
  - Highlight style: `<mark class="highlight yellow">text</mark>` (red, yellow, green, blue)

### Deployment
- Builds output to `dist/` directory
- `make deploy` uses `gh-pages` package to push `dist/` to the `gh-pages` branch
- GitHub Pages must be configured to deploy from this branch
- **Base URL is set in `slidev.config.ts` to `/dash-slides-intro/`** — adjust if deploying to a different path

### Styling System
- **CSS Framework:** UnoCSS (configured in `slidev.config.ts` and `uno.config.ts`)
- **Global Styles:** `style.css` provides:
  - Glass morphism utilities (`.glass`, `.glass-strong`, `.glass-card`)
  - Accent color variants (`.glass-yellow`, `.glass-lime`, `.glass-emerald`, `.glass-sky`, `.glass-red`)
  - Custom v-mark highlights: `.box.red`, `.box.yellow`, `.box.green`, `.box.blue`
  - Custom highlight backgrounds: `.highlight.red`, `.highlight.yellow`, `.highlight.green`, `.highlight.blue`
  - Slide transition effects (`.slidev-vclick-target`, `.slidev-vclick-hidden`)
- **Web Fonts:** Configured in `uno.config.ts`: DM Sans (sans), Noto Serif SC (cn), Playwrite IT Moderna (hand)
- **Custom Animations:** Balance-shake animations defined in `style.css` for interactive elements

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

- **`slidev.config.ts`** — Base URL (`/dash-slides-intro/`), Vite plugins (UnoCSS), chunk size limits (5000)
- **`uno.config.ts`** — UnoCSS presets (Wind3, Attributify, Icons, WebFonts), custom rules, safelist
- **`style.css`** — Global styles, glass morphism system, animations, custom highlight classes
- **`slides.md`** — Main entry with global config: theme, aspect ratio (16/9), highlighter (shiki), router mode (hash)
- **`package.json`** — Dependencies, scripts, and project metadata
- **`Makefile`** — Convenience commands wrapping Yarn tasks and deployment

## Slide Content Conventions

- **File Naming:** Number slides sequentially (`01.md`, `02.md`, etc.), use descriptive names for special pages (`toc.md`, `end.md`)
- **TOC Slide:** Uses `two-cols` layout with `<Toc>` component (`minDepth="1" maxDepth="2"`)
- **Code Examples:** Language-specific syntax highlighting via Shiki (e.g., ` ```python `)
- **Two-Column Layout:** Use `layout: two-cols` with `::left::` and `::right::` separators
