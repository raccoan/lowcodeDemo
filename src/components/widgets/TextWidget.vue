<template>
  <div
    class="text-widget"
    contenteditable="true"
    :style="widgetStyle"
    @blur="updateText"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ text?: string; style?: Record<string, any> }>()
const emit = defineEmits<{ (e: 'update:text', val: string): void }>()

// 合并外部传入的 style 和默认内边距
const widgetStyle = computed(() => ({
  padding: '8px 12px',
  background: '#f5f5f5',
  borderRadius: '6px',
  ...props.style,
}))

const updateText = (e: FocusEvent) => {
  const target = e.target as HTMLElement
  emit('update:text', target.innerText || '')
}
</script>