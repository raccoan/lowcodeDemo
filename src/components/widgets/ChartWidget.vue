<template>
  <div ref="chartRef" class="chart-widget" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script setup>
import { computed } from 'vue'
// ... 其他导入
const xAxisDataFinal = computed(() => {
  if (typeof props.xAxisData === 'string') {
    try { return JSON.parse(props.xAxisData) } catch { return [] }
  }
  return props.xAxisData || []
})
const seriesDataFinal = computed(() => {
  if (typeof props.seriesData === 'string') {
    try { return JSON.parse(props.seriesData) } catch { return [] }
  }
  return props.seriesData || []
})
// 在 getChartOption 中使用 xAxisDataFinal.value 和 seriesDataFinal.value
</script>

<style scoped>
.chart-widget {
  background: #fff;
  border-radius: 8px;
  padding: 8px;
}
</style>