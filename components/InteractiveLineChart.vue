<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import LineChart from './LineChart/LineChart.vue'
import { loadRetentionData } from './LineChart/retention'
import { SCHOOL_TYPES, SCHOOL_TYPE_COLORS, type SchoolType } from './LineChart/retention'

// Reactive year range
const minYear = ref(2015)
const maxYear = ref(2024)

// Available years from data
const availableYears = ref<number[]>([])

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
      maxYear.value = latest
      minYear.value = Math.max(earliest, latest - 9) // Last 10 years
    }
  } catch (error) {
    console.error('Failed to load years:', error)
  }
})

// Year options for dropdowns
const yearOptions = computed(() => availableYears.value)

// Constrain selections
const constrainedMaxYear = computed({
  get: () => maxYear.value,
  set: (val) => {
    maxYear.value = Math.max(val, minYear.value + 1)
  }
})

const constrainedMinYear = computed({
  get: () => minYear.value,
  set: (val) => {
    minYear.value = Math.min(val, maxYear.value - 1)
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

      <!-- Year Range Controls -->
      <div class="controls-row">
        <div class="control-group">
          <label for="minYear">Von:</label>
          <select id="minYear" v-model.number="constrainedMinYear" class="year-select">
            <option v-for="year in yearOptions" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        
        <div class="control-group">
          <label for="maxYear">Bis:</label>
          <select id="maxYear" v-model.number="constrainedMaxYear" class="year-select">
            <option v-for="year in yearOptions" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
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
}

.content-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}

.controls-row {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-top: 4px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-group label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.year-select {
  padding: 5px 10px;
  font-size: 13px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #1f2937;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
}

.year-select:hover {
  border-color: #0098d4;
}

.year-select:focus {
  outline: none;
  border-color: #0098d4;
  box-shadow: 0 0 0 3px rgba(0, 152, 212, 0.1);
}

.chart-wrapper {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
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
