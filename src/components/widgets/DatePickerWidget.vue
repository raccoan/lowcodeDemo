<template>
  <div :style="style" class="date-picker-widget">
    <a-date-picker
      v-model:value="selectedValue"
      :show-time="showTime"
      :picker="picker"
      :style="{ ...style, width: '100%' }"
      placeholder="请选择日期"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Dayjs } from 'dayjs'

const props = defineProps<{
  value?: string
  showTime?: boolean
  picker?: 'date' | 'week' | 'month' | 'year'
  style?: Record<string, any>
}>()

const emit = defineEmits<{ (e: 'update:value', val: string): void }>()

const selectedValue = ref<Dayjs | null>(null)
watch(selectedValue, (val) => {
  emit('update:value', val ? val.format('YYYY-MM-DD HH:mm:ss') : '')
})
</script>