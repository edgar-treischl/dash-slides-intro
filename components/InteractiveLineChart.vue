<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import LineChart from './LineChart/LineChart.vue'
import { loadRetentionData } from './LineChart/retention'
import { SCHOOL_TYPES, SCHOOL_TYPE_COLORS, type SchoolType } from './LineChart/retention'

// Reactive year range
const yearRange = ref<[number, number]>([2015, 2024])

// Available years from data
const availableYears = ref<number[]>([])

const minYear = computed(() => yearRange.value[0])
const maxYear = computed(() => yearRange.value[1])

// Load available years from data
onMounted(async () => {
  try {
    const data = await loadRetentionData()
    const years = new Set<number>()
    data.forEach(d => {
      const year = parseInt(d.year)
      if (!isNaN(year)) years.add(year)
    })
    availableYears.value = Array.from(years).sort((a, b) => a - b)
    
    // Set initial range to last 10 years or all available
    if (availableYears.value.length > 0) {
      const latest = Math.max(...availableYears.value)
      const earliest = Math.min(...availableYears.value)
      yearRange.value = [Math.max(earliest, latest - 9), latest]
    }
  } catch (error) {
    console.error('Failed to load years:', error)
  }
})
</script>

<template>
  <div class="interactive-chart-container">
    <div class="content-group">
      <!-- Chart -->
      <div class="chart-wrapper">
        <LineChart :minYear="minYear" :maxYear="maxYear" />
      </div>

      <!-- Visual Range Selector (Primary) -->
      <div class="range-selector-wrapper">
        <div class="range-selector-label">Select Years: {{ minYear }} - {{ maxYear }}</div>
        <v-range-slider
          v-model="yearRange"
          :min="availableYears[0] || 0"
          :max="availableYears[availableYears.length - 1] || 2024"
          :step="1"
          color="#6b7280"
          track-color="#e5e7eb"
          thumb-label
          class="year-slider"
        />
      </div>

      <!-- Compact Legend -->
      <div class="compact-legend">
        <span class="legend-title">Schultyp:</span>
        <div class="legend-items">
          <div v-for="schoolType in SCHOOL_TYPES" :key="schoolType" class="legend-item">
            <span
              class="legend-swatch"
              :style="{ backgroundColor: SCHOOL_TYPE_COLORS[schoolType] }"
            />
            <span class="legend-text">{{ schoolType }}</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.interactive-chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 5px;
  padding-bottom: 5px;
}

.content-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}

.chart-wrapper {
  margin-top:45px;
  flex: 0 0 auto;
  min-height: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin-bottom: 20px;
}

/* Range Selector */
.range-selector-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 16px 24px;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-bottom: 8px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.range-selector-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 16px;
  text-align: center;
}

.year-slider {
  padding: 0 8px;
}

/* Vuetify Range Slider customization */
:deep(.v-slider) {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.v-slider-thumb) {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.v-slider-track__fill) {
  background: linear-gradient(90deg, #9ca3af 0%, #6b7280 100%) !important;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Compact Legend */
.compact-legend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 6px 12px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-size: 11px;
  margin-top: 4px;
}

.legend-title {
  font-weight: 600;
  color: #1f2937;
  font-size: 11px;
}

.legend-items {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.legend-swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.legend-text {
  color: #374151;
  font-size: 11px;
  font-weight: 500;
}
</style>
