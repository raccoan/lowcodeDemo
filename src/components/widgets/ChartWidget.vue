<template>
  <div ref="chartRef" class="chart-widget" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  type?: 'line' | 'bar' | 'pie'
  xAxisData?: string
  seriesData?: string
  pieData?: string
}>()

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 安全解析 JSON
const parseJson = (str?: string, defaultValue: any = []) => {
  if (!str) return defaultValue
  try {
    return JSON.parse(str)
  } catch {
    return defaultValue
  }
}

// 饼图数据
const pieDataArray = () => parseJson(props.pieData, [])

// 获取图表配置
const getChartOption = () => {
  const tooltipCommon = {
  show: true,
  backgroundColor: 'transparent',
  borderColor: '#ccc',
  borderWidth: 1,
  textStyle: { color: '#0f0303', fontSize: 11 },
  padding: [4, 8],
  extraCssText: 'box-shadow: 0 2px 8px rgba(0,0,0,0.15); max-width: 200px; white-space: normal; word-break: break-word;',
  // 可选：自定义 formatter 控制显示内容
  formatter: (params: any) => {
    if (props.type === 'pie') {
      return `${params.name}: ${params.value} (${params.percent}%)`
    } else {
      return `${params[0].axisValue}<br/>${params[0].seriesName}: ${params[0].value}`
    }
  }
}

  if (props.type === 'pie') {
    return {
      tooltip: { ...tooltipCommon, trigger: 'item' },
      series: [{
        type: 'pie',
        radius: '50%',
        data: pieDataArray(),
        emphasis: { scale: true },
        label: { show: true, formatter: '{b}: {d}%' }
      }]
    }
  } else {
    const xData = parseJson(props.xAxisData, [])
    const sData = parseJson(props.seriesData, [])
    return {
      tooltip: { ...tooltipCommon, trigger: 'axis', axisPointer: { type: 'line' } },
      xAxis: { type: 'category', data: xData },
      yAxis: { type: 'value' },
      series: [{
        type: props.type,
        data: sData,
        smooth: props.type === 'line',
        itemStyle: { borderRadius: [4,4,0,0] }
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

// 监听数据变化，更新图表
watch(
  [() => props.type, () => props.xAxisData, () => props.seriesData, () => props.pieData],
  () => {
    if (chartInstance) {
      chartInstance.setOption(getChartOption(), true)
    }
  },
  { deep: true }
)

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