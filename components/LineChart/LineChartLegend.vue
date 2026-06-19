<script setup lang="ts">
import './LineChart.css'
import {
  SCHOOL_TYPES,
  SCHOOL_TYPE_COLORS,
} from './retention'
</script>

<template>
  <div class="class-retention-mfe__chart-legend">
    <div class="class-retention-mfe__legend-label">Schultyp</div>
    <ul class="class-retention-mfe__legend-list">
      <li v-for="schoolType in SCHOOL_TYPES" :key="schoolType">
        <span
          class="class-retention-mfe__legend-swatch"
          :style="{ backgroundColor: SCHOOL_TYPE_COLORS[schoolType] }"
        />
        {{ schoolType }}
      </li>
    </ul>
  </div>
</template>
