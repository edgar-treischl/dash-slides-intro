# Slidev Presentation Template

A reusable presentation starter built with [Slidev](https://sli.dev/) and Vue components.

## Requirements

- Node.js 18+
- Yarn

---

# Getting Started

## 1. Install dependencies

```bash
yarn install
```

---

## 2. Start the development server

```bash
yarn dev
```

Slidev will start locally and provide a URL such as:

```txt
http://localhost:3030
```

Open it in your browser to view the presentation.

---

# Project Structure

```txt
.
├── components/       # Reusable Vue components
├── layouts/          # Custom Slidev layouts
├── public/           # Static assets
├── slides.md         # Main presentation entry
└── package.json
```

---

# Creating Slides

Slides are written in Markdown inside `slides.md`.

Example:

```md
---
layout: cover
---

# My Presentation

Welcome to Slidev 🚀
```

Separate slides using `---`.

---

# Using Custom Layouts

Custom layouts live inside the `layouts/` directory.

Example:

```txt
layouts/
  TitleSlide.vue
```

Usage:

```md
---
layout: TitleSlide
---
```

---

# Using Vue Components

Vue components can be added inside `components/`.

Example:

```md
<MyComponent />
```

---

# Adding Icons

Install Iconify collections with Yarn:

```bash
yarn add @iconify-json/carbon
```

Example usage:

```html
<carbon-warning class="text-4xl text-yellow-500" />
```

You can also install additional icon packs:

```bash
yarn add @iconify-json/mdi
yarn add @iconify-json/lucide
yarn add @iconify-json/tabler
```

---

# Exporting Slides

Export to PDF:

```bash
yarn export
```

Exported files will be generated in the `dist/` directory.

---

# Build for Production

```bash
yarn build
```

---

# Learn More

- Slidev Documentation: https://sli.dev/
- Vue 3 Documentation: https://vuejs.org/
- UnoCSS Icons: https://icones.js.org/


```
<template #title>
Test Slides
</template>

<template #subtitle>
Test Subtitle · May 2026
</template>
```
