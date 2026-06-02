<template>
  <div class="text-widget" :style="widgetStyle" contenteditable="true" @blur="updateText">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ text?: string; style?: Record<string, any> }>()
const emit = defineEmits<{ (e: 'update:text', val: string): void }>()

// 计算样式，合并默认样式和用户自定义样式
const widgetStyle = computed(() => ({
  padding: '8px 12px',
  background: '#f5f5f5',
  borderRadius: props.style?.borderRadius || '6px',
  ...props.style
}))

const updateText = (e: Event) => {
  emit('update:text', (e.target as HTMLElement).innerText)
}
</script>