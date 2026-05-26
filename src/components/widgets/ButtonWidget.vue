<template>
  <a-button
    :type="type"
    :danger="danger"
    :disabled="disabled"
  >
    {{ text }}
  </a-button>
</template>

<script setup lang="ts">
export interface ButtonWidgetProps {
  text?: string
  type?: 'default' | 'primary' | 'dashed' | 'text' | 'link'
  danger?: boolean
  disabled?: boolean
}

withDefaults(defineProps<ButtonWidgetProps>(), {
  text: '按钮',
  type: 'default',
  danger: false,
  disabled: false
})
</script>