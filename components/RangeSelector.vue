<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'

interface Props {
  min: number
  max: number
  modelValue: [number, number]
}

interface Emits {
  (e: 'update:modelValue', value: [number, number]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isDraggingMin = ref(false)
const isDraggingMax = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)
const localMin = ref(props.modelValue[0])
const localMax = ref(props.modelValue[1])

const rangeMin = computed(() => localMin.value)
const rangeMax = computed(() => localMax.value)
const displayMin = computed(() => localMin.value)
const displayMax = computed(() => localMax.value)
const isDragging = computed(() => isDraggingMin.value || isDraggingMax.value)

// Calculate percentage position for a value
const getPercentage = (value: number): number => {
  return ((value - props.min) / (props.max - props.min)) * 100
}

// Calculate value from percentage
const getValueFromPercentage = (percentage: number): number => {
  return props.min + (percentage / 100) * (props.max - props.min)
}

// Positions for the track highlight
const trackStyle = computed(() => {
  const minPercent = getPercentage(rangeMin.value)
  const maxPercent = getPercentage(rangeMax.value)
  return {
    left: `${minPercent}%`,
    right: `${100 - maxPercent}%`,
  }
})

// Position for min thumb
const minThumbStyle = computed(() => ({
  left: `${getPercentage(rangeMin.value)}%`,
}))

// Position for max thumb
const maxThumbStyle = computed(() => ({
  left: `${getPercentage(rangeMax.value)}%`,
}))

// Label positions (with fallback for overlapping)
const minLabelStyle = computed(() => {
  const minPercent = getPercentage(rangeMin.value)
  const maxPercent = getPercentage(rangeMax.value)
  const gap = Math.abs(maxPercent - minPercent)
  return {
    left: `${minPercent}%`,
    transform: gap < 15 ? 'translateX(-120%)' : 'translateX(-50%)',
  }
})

const maxLabelStyle = computed(() => {
  const minPercent = getPercentage(rangeMin.value)
  const maxPercent = getPercentage(rangeMax.value)
  const gap = Math.abs(maxPercent - minPercent)
  return {
    left: `${maxPercent}%`,
    transform: gap < 15 ? 'translateX(120%)' : 'translateX(-50%)',
  }
})

const handleMouseDown = (which: 'min' | 'max') => {
  if (which === 'min') isDraggingMin.value = true
  else isDraggingMax.value = true
}

const handleMouseUp = () => {
  if (isDragging.value) {
    const roundedMin = Math.max(props.min, Math.min(props.max - 1, localMin.value))
    const roundedMax = Math.min(props.max, Math.max(roundedMin + 1, localMax.value))

    localMin.value = roundedMin
    localMax.value = roundedMax

    if (roundedMin !== props.modelValue[0] || roundedMax !== props.modelValue[1]) {
      emit('update:modelValue', [roundedMin, roundedMax])
    }
  }

  isDraggingMin.value = false
  isDraggingMax.value = false
}

const handleMouseMove = (event: MouseEvent) => {
  if (!containerRef.value) return
  if (!isDraggingMin.value && !isDraggingMax.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const percentage = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100))
  const value = Math.round(getValueFromPercentage(percentage))

  if (isDraggingMin.value) {
    const newMin = Math.min(value, rangeMax.value - 1)
    if (newMin !== rangeMin.value) {
      localMin.value = newMin
      emit('update:modelValue', [newMin, rangeMax.value])
    }
  } else if (isDraggingMax.value) {
    const newMax = Math.max(value, rangeMin.value + 1)
    if (newMax !== rangeMax.value) {
      localMax.value = newMax
      emit('update:modelValue', [rangeMin.value, newMax])
    }
  }
}

watch(
  () => props.modelValue,
  ([nextMin, nextMax]) => {
    if (!isDragging.value) {
      localMin.value = nextMin
      localMax.value = nextMax
    }
  },
  { immediate: true }
)

// Add/remove global listeners
watch([isDraggingMin, isDraggingMax], ([draggingMin, draggingMax]) => {
  if (draggingMin || draggingMax) {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  } else {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
}, { immediate: true })

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<template>
  <div class="range-selector">
    <div class="range-container" ref="containerRef">
      <!-- Background track -->
      <div class="track-bg"></div>

      <!-- Highlighted track -->
      <div class="track-highlight" :style="trackStyle"></div>

      <!-- Min thumb -->
      <div
        class="thumb thumb-min"
        :class="{ 'is-dragging': isDraggingMin }"
        :style="minThumbStyle"
        @mousedown="handleMouseDown('min')"
      >
        <div class="thumb-inner"></div>
      </div>

      <!-- Max thumb -->
      <div
        class="thumb thumb-max"
        :class="{ 'is-dragging': isDraggingMax }"
        :style="maxThumbStyle"
        @mousedown="handleMouseDown('max')"
      >
        <div class="thumb-inner"></div>
      </div>

      <!-- Labels -->
      <div class="labels">
        <div class="label label-min" :style="minLabelStyle">
          <span class="label-value">{{ displayMin }}</span>
        </div>
        <div class="label label-max" :style="maxLabelStyle">
          <span class="label-value">{{ displayMax }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.range-selector {
  width: min(100%, 540px);
  margin: 0 auto;
  box-sizing: border-box;
}

.range-container {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  height: 38px;
  display: flex;
  align-items: center;
  user-select: none;
}

/* Background track */
.track-bg {
  position: absolute;
  left: 10px;
  right: 10px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 3px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

/* Highlighted track (selected range) */
.track-highlight {
  position: absolute;
  height: 4px;
  background: linear-gradient(90deg, #9ca3af 0%, #6b7280 100%);
  border-radius: 3px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  box-shadow: 0 1px 4px rgba(75, 85, 99, 0.2);
  transition: box-shadow 0.2s ease;
}

/* Thumbs (draggable handles) */
.thumb {
  position: absolute;
  width: 14px;
  height: 14px;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  cursor: grab;
  transition: all 0.2s ease;
}

.thumb:hover .thumb-inner {
  box-shadow: 0 0 0 4px rgba(107, 114, 128, 0.12);
}

.thumb.is-dragging {
  z-index: 5;
}

.thumb.is-dragging .thumb-inner {
  box-shadow: 0 0 0 6px rgba(107, 114, 128, 0.16);
  transform: scale(1.05);
}

.thumb-inner {
  width: 100%;
  height: 100%;
  background: white;
  border: 2px solid #6b7280;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

/* Labels showing current values */
.labels {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 3;
}

.label {
  position: absolute;
  top: -24px;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.label-value {
  display: inline-block;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .range-container {
    height: 36px;
  }

  .thumb {
    width: 16px;
    height: 16px;
  }

  .label {
    font-size: 10px;
    top: -22px;
  }
}
</style>
