# LineChart Component

Vue 3 component for displaying interactive retention trend line charts in Slidev presentations.

## Features

- Multi-series line chart for retention trends over time
- Interactive tooltips on hover
- Configurable year range display
- Legend with school type colors
- Responsive SVG-based visualization

## Usage

The components are globally registered and can be used directly in any slide:

### Basic Usage

```vue
<LineChart :minYear="2015" :maxYear="2024" />
<LineChartLegend />
```

### In a Slide (Markdown)

```md
---
layout: two-cols
---

# My Chart Title

Description text here.

::right::

<div style="width: 100%; height: 500px; display: flex; flex-direction: column; gap: 16px; align-items: center;">
  <LineChart :minYear="2015" :maxYear="2024" />
  <LineChartLegend />
</div>
```

### Demo Slide

See `pages/linechart-demo.md` for a working example.

## Props

### LineChart

- `minYear` (number, required): Minimum year to display on the chart
- `maxYear` (number, required): Maximum year to display on the chart

### LineChartLegend

No props required. Displays the legend for all school types.

## Data

The component loads data from `/public/data/retention.json`. The data structure should include:

```json
[
  {
    "syear": "2015/16",
    "stype": "GS",
    "group": "Insgesamt",
    "number": 1234,
    "year": "2015",
    "n_overall": 50000,
    "percent": 2.5
  }
]
```

### School Types

- **GS**: Grundschulen
- **MS**: Mittelschulen
- **RS**: Realschulen
- **GY**: Gymnasien
- **IGS**: Int. Gesamtschule

## Files

- `components/LineChart/LineChart.vue` - Main chart component
- `components/LineChart/LineChartLegend.vue` - Legend component
- `components/LineChart/retention.ts` - Data utilities and types
- `components/LineChart/LineChart.css` - Component styles
- `public/data/retention.json` - Chart data
- `setup/main.ts` - Global component registration

## Customization

### Colors

School type colors are defined in `retention.ts`:

```typescript
export const SCHOOL_TYPE_COLORS: Record<SchoolType, string> = {
  'GS': '#264653',   // blue
  'MS': '#2a9d8f',   // teal
  'RS': '#e9c46a',   // yellow
  'GY': '#f4a261',   // amber
  'IGS': '#e76f51',  // orange
}
```

### Chart Dimensions

Chart dimensions can be adjusted in `retention.ts`:

```typescript
export const CHART_WIDTH = 800
export const CHART_HEIGHT = 500
export const CHART_PADDING = {
  top: 40,
  right: 60,
  bottom: 80,
  left: 90,
}
```

## Migration from React

This component was converted from a React implementation to Vue 3. Key changes:

- React hooks (`useState`, `memo`) → Vue Composition API (`ref`, `computed`)
- JSX → Vue template syntax
- React event handlers → Vue event directives (`@mouseenter`, `@mouseleave`)
- Props interface → `defineProps<Props>()`
- Component structure → `<script setup>` with `<template>`

## Dependencies

No external charting libraries required. Uses native SVG for rendering.
