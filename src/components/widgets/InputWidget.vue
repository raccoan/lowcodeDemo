<template>
  <a-input
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>

<script setup lang="ts">
export interface InputWidgetProps {
  placeholder?: string
  disabled?: boolean
}

withDefaults(defineProps<InputWidgetProps>(), {
  placeholder: '请输入',
  disabled: false
})
</script>