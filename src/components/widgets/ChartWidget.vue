<template>
  <div ref="chartRef" class="chart-widget" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  type?: 'line' | 'bar' | 'pie'
  xAxisData?: string   // JSON 字符串，如 '["周一","周二"]'
  seriesData?: string  // JSON 字符串，如 '[120,200]'
}>()

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 解析 JSON 字符串，安全返回数组
const parseJsonArray = (str?: string, defaultValue: any[] = []) => {
  if (!str) return defaultValue
  try {
    const parsed = JSON.parse(str)
    return Array.isArray(parsed) ? parsed : defaultValue
  } catch {
    return defaultValue
  }
}

// 计算属性：x轴数据
const xAxisDataArray = computed(() => {
  if (props.type === 'pie') return []
  return parseJsonArray(props.xAxisData, ['周一', '周二', '周三', '周四', '周五'])
})

// 计算属性：系列数据
const seriesDataArray = computed(() => {
  if (props.type === 'pie') return []
  return parseJsonArray(props.seriesData, [120, 200, 150, 80, 70])
})

// 饼图数据（简单示例，也可扩展为可配置）
const pieData = ref([
  { name: '类别A', value: 335 },
  { name: '类别B', value: 310 },
  { name: '类别C', value: 234 }
])

const getChartOption = () => {
  if (props.type === 'pie') {
    return {
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: '50%',
        data: pieData.value,
        emphasis: { scale: true }
      }]
    }
  } else {
    return {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: xAxisDataArray.value },
      yAxis: { type: 'value' },
      series: [{
        type: props.type,
        data: seriesDataArray.value,
        smooth: props.type === 'line'
      }]
    }
  }
}

const initChart = () => {
  if (chartRef.value) {
    if (chartInstance) chartInstance.dispose()
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(getChartOption())
  }
}

// 监听所有相关数据变化，更新图表
watch([() => props.type, xAxisDataArray, seriesDataArray], () => {
  if (chartInstance) {
    chartInstance.setOption(getChartOption())
  }
}, { deep: true })

onMounted(() => {
  initChart()
})
</script>

<style scoped>
.chart-widget {
  background: #fff;
  border-radius: 8px;
  padding: 8px;
}
</style>