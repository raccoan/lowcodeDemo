<!-- 文件路径：src/components/widgets/SelectWidget.vue -->
<template>
  <div class="select-widget" :style="widgetStyle">
    <!-- 可编辑的标题：点击可直接编辑 -->
    <div v-if="!isEditing" class="select-label" @click="startEdit">{{ label }}</div>
    <input v-else ref="editInput" v-model="editValue" class="select-label-input" @blur="finishEdit"
      @keyup.enter="finishEdit" @keyup.esc="cancelEdit" />
    <!-- Ant Design Vue 的下拉选择器 -->
    <a-select v-model:value="selectedValue" :style="selectStyle" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

// 接收外部传入的属性
const props = defineProps<{
  label?: string      // 标题文字，默认“标题”
  value?: string      // 当前选中的值（用于双向绑定）
  style?: Record<string, any>  // 样式
}>()

// 使用 computed 确保 label 有默认值且响应式
const label = computed(() => props.label || '下拉选择')

// 计算 widget 的样式，将圆角作为 CSS 变量传递
const widgetStyle = computed(() => ({
  '--border-radius': props.style?.borderRadius || '4px',
  padding: props.style?.padding || '',
  margin: props.style?.margin || ''
}))

// 计算 select 的样式
const selectStyle = computed(() => ({
  width: '100%'
}))

// 定义事件：当选中值改变时通知父组件
const emit = defineEmits<{
  (e: 'update:value', val: string): void
  (e: 'update:label', val: string): void
}>()

// 编辑状态
const isEditing = ref(false)
const editValue = ref('')
const editInput = ref<HTMLInputElement | null>(null)

// 开始编辑
const startEdit = () => {
  isEditing.value = true
  editValue.value = label.value
  // 等待 DOM 更新后聚焦输入框
  setTimeout(() => {
    editInput.value?.focus()
    editInput.value?.select()
  }, 0)
}

// 完成编辑
const finishEdit = () => {
  if (editValue.value.trim()) {
    emit('update:label', editValue.value.trim())
  } else {
    // 如果输入为空，恢复原值
    editValue.value = label.value
  }
  isEditing.value = false
}

// 取消编辑
const cancelEdit = () => {
  editValue.value = label.value
  isEditing.value = false
}

// 固定选项
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]

// 内部状态：当前选中的值
const selectedValue = ref(props.value || 'option1')

// 监听选中值变化，触发 update:value 事件
watch(selectedValue, (newVal) => {
  emit('update:value', newVal)
})

// 如果外部 value 变化，也同步内部状态（保持双向绑定）
watch(() => props.value, (newVal) => {
  if (newVal !== undefined && newVal !== selectedValue.value) {
    selectedValue.value = newVal
  }
})
</script>

<style scoped>
.select-widget {
  margin-bottom: 12px;
}

.select-label {
  margin-bottom: 8px;
  font-weight: 500;
  cursor: text;
  display: inline-block;
}

.select-label:hover {
  color: #4096ff;
}

.select-label-input {
  margin-bottom: 8px;
  font-weight: 500;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font-size: inherit;
  padding: 0;
  border-bottom: 1px dashed #4096ff;
}

/* 穿透 Ant Design Vue 的内部样式 */
::v-deep(.ant-select-selector) {
  border: 1px solid #d9d9d9 !important;
  border-radius: var(--border-radius, 4px) !important;
}
</style>