<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import './LineChart.css'
import {
  CHART_HEIGHT,
  CHART_PADDING,
  CHART_WIDTH,
  SCHOOL_TYPES,
  SCHOOL_TYPE_COLORS,
  formatNumber,
  loadRetentionData,
  getTimeSeriesData,
  type SchoolType,
  type RetentionDatum,
} from './retention'

/**
 * LineChart component - Multi-series line chart for retention trends over time
 */
interface Props {
  minYear: number
  maxYear: number
}

const props = defineProps<Props>()

interface HoveredPoint {
  schoolType: SchoolType
  syear: string
  value: number
  x: number
  y: number
}

const hoveredPoint = ref<HoveredPoint | null>(null)
const data = ref<Map<SchoolType, RetentionDatum[]>>(new Map())

// Load data on mount
onMounted(async () => {
  const retentionData = await loadRetentionData()
  data.value = getTimeSeriesData(retentionData)
})

// Get all years from the data
const allYears = computed(() => {
  const allYearsSet = new Set<string>()
  const schoolYearMap = new Map<string, string>()
  
  data.value.forEach((schoolTypeData) => {
    schoolTypeData.forEach((d) => {
      allYearsSet.add(d.year)
      schoolYearMap.set(d.year, d.syear)
    })
  })
  
  const years = Array.from(allYearsSet).map(y => parseInt(y)).sort((a, b) => a - b)
  return { years, schoolYearMap }
})

// Filter years to display based on min/max range
const displayYears = computed(() => {
  return allYears.value.years.filter(y => y >= props.minYear && y <= props.maxYear)
})

// Calculate scales
const chartInnerWidth = CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right
const chartInnerHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom

// Y-axis: retention count
const maxRetention = computed(() => {
  return Math.max(
    ...(Array.from(data.value.values()).flat().map(d => d.number) || [0])
  )
})

const yScale = (value: number) => {
  return CHART_HEIGHT - CHART_PADDING.bottom - (value / maxRetention.value) * chartInnerHeight
}

// X-axis: year (using filtered display years)
const xScale = (year: string) => {
  const yearNum = parseInt(year)
  const minYear = Math.min(...displayYears.value) || 1
  const maxYear = Math.max(...displayYears.value) || 1
  const yearRange = maxYear - minYear || 1
  return CHART_PADDING.left + ((yearNum - minYear) / yearRange) * chartInnerWidth
}

// Y-axis ticks
const yTicks = computed(() => {
  return [
    0, 
    Math.round(maxRetention.value / 4), 
    Math.round(maxRetention.value / 2), 
    Math.round((maxRetention.value * 3) / 4), 
    maxRetention.value
  ]
})

// School type lines data
const schoolTypeLines = computed(() => {
  return SCHOOL_TYPES.map((schoolType) => {
    const schoolTypeData = (data.value.get(schoolType) || []).filter(d => {
      const year = parseInt(d.year)
      return year >= props.minYear && year <= props.maxYear
    })
    
    if (schoolTypeData.length === 0) return null

    // Create path for line
    const pathData = schoolTypeData
      .map((d: RetentionDatum, i: number) => {
        const x = xScale(d.year)
        const y = yScale(d.number)
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
      })
      .join(' ')

    return {
      schoolType,
      pathData,
      points: schoolTypeData,
      color: SCHOOL_TYPE_COLORS[schoolType]
    }
  }).filter(Boolean)
})

// Tooltip positioning
const tooltipPosition = computed(() => {
  if (!hoveredPoint.value) return null

  const tooltipHeight = 50
  const tooltipWidth = 130
  const tooltipPadding = 10
  
  // Position tooltip above point by default, or below if it would be cropped
  const tooltipY = hoveredPoint.value.y - tooltipHeight - tooltipPadding < CHART_PADDING.top
    ? hoveredPoint.value.y + tooltipPadding + 10
    : hoveredPoint.value.y - tooltipHeight - tooltipPadding
  
  return {
    x: hoveredPoint.value.x,
    y: tooltipY,
    width: tooltipWidth,
    height: tooltipHeight
  }
})

function handlePointMouseEnter(schoolType: SchoolType, d: RetentionDatum) {
  const cx = xScale(d.year)
  const cy = yScale(d.number)
  hoveredPoint.value = {
    schoolType,
    syear: d.syear,
    value: d.number,
    x: cx,
    y: cy,
  }
}

function handlePointMouseLeave() {
  hoveredPoint.value = null
}
</script>

<template>
  <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; overflow: visible">
    <div v-if="allYears.years.length === 0 || displayYears.length === 0" 
         style="padding: 20px; text-align: center">
      No data available
    </div>
    <svg
      v-else
      width="100%"
      height="100%"
      :viewBox="`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`"
      preserveAspectRatio="xMidYMid meet"
      class="class-retention-mfe__chart"
      role="img"
      aria-label="Liniendiagramm der Klassenwiederholungen im Zeitverlauf nach Schultyp"
      style="overflow: visible"
    >
      <!-- Y-axis grid lines and labels -->
      <g v-for="tick in yTicks" :key="`y-${tick}`">
        <line
          :x1="CHART_PADDING.left"
          :x2="CHART_WIDTH - CHART_PADDING.right"
          :y1="yScale(tick)"
          :y2="yScale(tick)"
          class="class-retention-mfe__grid-line"
        />
        <text
          :x="CHART_PADDING.left - 10"
          :y="yScale(tick) + 4"
          class="class-retention-mfe__axis-label class-retention-mfe__axis-label--y"
        >
          {{ formatNumber(tick) }}
        </text>
      </g>

      <!-- X-axis labels -->
      <text
        v-for="year in displayYears"
        :key="`x-${year}`"
        :x="xScale(year.toString())"
        :y="CHART_HEIGHT - CHART_PADDING.bottom + 24"
        text-anchor="middle"
        class="class-retention-mfe__axis-label"
      >
        {{ allYears.schoolYearMap.get(year.toString()) || year.toString() }}
      </text>

      <!-- Axes -->
      <line
        :x1="CHART_PADDING.left"
        :x2="CHART_WIDTH - CHART_PADDING.right"
        :y1="CHART_HEIGHT - CHART_PADDING.bottom"
        :y2="CHART_HEIGHT - CHART_PADDING.bottom"
        class="class-retention-mfe__axis-line"
      />
      <line
        :x1="CHART_PADDING.left"
        :x2="CHART_PADDING.left"
        :y1="CHART_PADDING.top"
        :y2="CHART_HEIGHT - CHART_PADDING.bottom"
        class="class-retention-mfe__axis-line"
      />

      <!-- Axis labels -->
      <text
        :x="CHART_WIDTH / 2"
        :y="CHART_HEIGHT - 10"
        text-anchor="middle"
        class="class-retention-mfe__axis-title"
        style="font-size: 16px; font-weight: 500"
      >
        Schuljahr {{ minYear }}/{{ maxYear }}
      </text>
      <text
        :x="15"
        :y="CHART_HEIGHT / 2"
        text-anchor="middle"
        class="class-retention-mfe__axis-title"
        :transform="`rotate(-90 15 ${CHART_HEIGHT / 2})`"
        style="font-size: 16px; font-weight: 500"
      >
        Anzahl Wiederholungen
      </text>

      <!-- Lines and points for each school type -->
      <g v-for="line in schoolTypeLines" :key="line.schoolType">
        <path
          :d="line.pathData"
          :stroke="line.color"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle
          v-for="d in line.points"
          :key="`${line.schoolType}-${d.year}`"
          :cx="xScale(d.year)"
          :cy="yScale(d.number)"
          :r="hoveredPoint?.schoolType === line.schoolType && hoveredPoint?.syear === d.syear ? 7 : 5"
          :fill="line.color"
          style="cursor: pointer; transition: r 0.2s"
          @mouseenter="handlePointMouseEnter(line.schoolType, d)"
          @mouseleave="handlePointMouseLeave"
        />
      </g>

      <!-- Tooltip -->
      <g v-if="hoveredPoint && tooltipPosition">
        <!-- Tooltip background -->
        <rect
          :x="tooltipPosition.x - tooltipPosition.width / 2"
          :y="tooltipPosition.y"
          :width="tooltipPosition.width"
          :height="tooltipPosition.height"
          rx="6"
          fill="white"
          :stroke="SCHOOL_TYPE_COLORS[hoveredPoint.schoolType]"
          stroke-width="2"
          class="class-retention-mfe__tooltip-bg"
        />
        <!-- Tooltip text - School Type -->
        <text
          :x="tooltipPosition.x"
          :y="tooltipPosition.y + 16"
          text-anchor="middle"
          class="class-retention-mfe__tooltip-text class-retention-mfe__tooltip-label"
          style="font-size: 14px; font-weight: 500"
        >
          {{ hoveredPoint.schoolType }}
        </text>
        <!-- Tooltip text - Year -->
        <text
          :x="tooltipPosition.x"
          :y="tooltipPosition.y + 28"
          text-anchor="middle"
          class="class-retention-mfe__tooltip-text class-retention-mfe__tooltip-label"
          style="font-size: 12px; fill: #666; font-weight: 400"
        >
          {{ hoveredPoint.syear }}
        </text>
        <!-- Tooltip text - Value -->
        <text
          :x="tooltipPosition.x"
          :y="tooltipPosition.y + 42"
          text-anchor="middle"
          class="class-retention-mfe__tooltip-text"
          style="font-size: 14px; font-weight: 600"
        >
          {{ formatNumber(hoveredPoint.value) }}
        </text>
      </g>
    </svg>
  </div>
</template>
