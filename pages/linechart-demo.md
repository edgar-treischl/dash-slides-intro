---
layout: two-cols
---

# Interactive Chart

<div style="margin-top: 2rem;">

Explore retention trends across different school types over time.

**Features:**
- Interactive data visualization
- Hover for detailed information
- Multi-year comparison
- Color-coded school types

</div>

::right::

<div style="width: 100%; height: 100%; display: flex; flex-direction: column; gap: 20px; align-items: center; justify-content: center; padding: 20px;">
  <LineChart :minYear="2015" :maxYear="2024" />
  <LineChartLegend />
</div>

<style>
h1 {
  margin-bottom: 1rem;
}
</style>
