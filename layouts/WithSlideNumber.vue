<script setup lang="ts">
import { useNav } from '@slidev/client'

const { currentPage, total } = useNav()
</script>

<template>
  <div class="slide-with-number">
    <slot />
    <div class="slide-number">{{ currentPage }} / {{ total }}</div>
  </div>
</template>

<style scoped>
.slide-with-number {
  width: 100%;
  height: 100%;
  position: relative;
}

.slide-number {
  position: fixed;
  bottom: 12px;
  right: 16px;
  font-size: 13px;
  opacity: 0.5;
  font-family: 'Roboto', sans-serif;
  pointer-events: none;
  z-index: 40;
}
</style>
