<template>
  <div ref="chartRef" class="chart-widget" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{
  type?: 'line' | 'bar' | 'pie'
}>()

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 内置示例数据
const sampleData = {
  line: {
    xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    series: [120, 200, 150, 80, 70, 110, 130]
  },
  bar: {
    xAxis: ['产品A', '产品B', '产品C', '产品D'],
    series: [320, 240, 180, 290]
  },
  pie: {
    data: [
      { name: '类别A', value: 335 },
      { name: '类别B', value: 310 },
      { name: '类别C', value: 234 },
      { name: '类别D', value: 135 }
    ]
  }
}

const getChartOption = () => {
  if (props.type === 'pie') {
    return {
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: '50%',
        data: sampleData.pie.data,
        emphasis: { scale: true }
      }]
    }
  } else {
    const data = props.type === 'line' ? sampleData.line : sampleData.bar
    return {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: data.xAxis },
      yAxis: { type: 'value' },
      series: [{
        type: props.type,
        data: data.series,
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

// 监听图表类型变化，动态更新图表
watch(() => props.type, () => {
  if (chartInstance) {
    chartInstance.setOption(getChartOption())
  }
})

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