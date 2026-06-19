# LineChart Integration Summary

## What Was Done

Successfully integrated the React-based LineChart component from another app into this Slidev (Vue 3) presentation repository.

## Changes Made

### 1. Created Vue Components
- **`components/LineChart/LineChart.vue`** - Main line chart component (converted from React to Vue 3)
- **`components/LineChart/LineChartLegend.vue`** - Legend component
- **`components/LineChart/retention.ts`** - Data utilities and type definitions
- **`components/LineChart/LineChart.css`** - Component styles
- **`components/LineChart/README.md`** - Component documentation

### 2. Data Files
- Copied data files to **`public/data/`**:
  - `retention.json` (6.3K)
  - `migration.json` (11K)
  - `sex.json` (12K)

### 3. Global Registration
- Created **`setup/main.ts`** to globally register LineChart components
- Components are now available in any slide without import statements

### 4. Demo Slide
- Created **`pages/linechart-demo.md`** showing usage example

## Key Conversion Details

### React → Vue 3 Migration
- **Hooks**: `useState` → `ref`, `useMemo` → `computed`
- **Props**: TypeScript interface with `defineProps<Props>()`
- **Events**: `onMouseEnter` → `@mouseenter`, `onMouseLeave` → `@mouseleave`
- **Template**: JSX → Vue template syntax
- **Memoization**: `memo()` → Vue's built-in reactivity
- **Data Loading**: Added `onMounted` lifecycle hook to load data from public folder

### Notable Changes
1. **Data Loading**: Changed from static imports to async `fetch()` calls to load JSON data from `/public/data/`
2. **Reactivity**: Used Vue's `ref` and `computed` for reactive state management
3. **Template Syntax**: Converted JSX conditions and loops to Vue's `v-if`, `v-for`, etc.
4. **Type Safety**: Maintained TypeScript types throughout

## How to Use

### In Any Slide

```md
---
layout: default
---

# My Chart

<div style="height: 500px;">
  <LineChart :minYear="2015" :maxYear="2024" />
  <LineChartLegend />
</div>
```

### With Two-Column Layout

```md
---
layout: two-cols
---

# Title

Description

::right::

<div style="width: 100%; height: 500px; display: flex; flex-direction: column; gap: 16px; align-items: center;">
  <LineChart :minYear="2015" :maxYear="2024" />
  <LineChartLegend />
</div>
```

## Testing

The dev server was tested and started successfully:
- Run `yarn dev` or `make dev`
- Navigate to `http://localhost:3030/`
- View the demo slide at `/pages/linechart-demo.md`

## Files Created

```
components/
└── LineChart/
    ├── LineChart.vue           (9.3KB) - Main chart component
    ├── LineChartLegend.vue     (587B)  - Legend component
    ├── retention.ts            (6.1KB) - Data utilities
    ├── LineChart.css           (copied) - Styles
    └── README.md               (2.9KB) - Documentation

setup/
└── main.ts                     (324B)  - Global registration

public/
└── data/
    ├── retention.json          (6.3KB) - Chart data
    ├── migration.json          (11KB)  - Migration data
    └── sex.json                (12KB)  - Sex breakdown data

pages/
└── linechart-demo.md           (361B)  - Demo slide
```

## Original React Files

The original React files in the `LineChart/` folder can now be removed if desired, as they've been converted to Vue:
- `LineChart/LineChart.tsx`
- `LineChart/RetentionChartSlide.tsx`
- `LineChart/SplitViewSlide.tsx`
- `LineChart/index.ts`
- `LineChart/yearCalculations.ts` (not needed in current implementation)

## Next Steps

1. Test the chart in the dev server
2. Customize colors/dimensions in `retention.ts` if needed
3. Add more slides using the component
4. Consider removing the original React files from `LineChart/` folder

## School Types & Colors

- **GS** (Grundschulen): #264653 - blue
- **MS** (Mittelschulen): #2a9d8f - teal
- **RS** (Realschulen): #e9c46a - yellow
- **GY** (Gymnasien): #f4a261 - amber
- **IGS** (Int. Gesamtschule): #e76f51 - orange
