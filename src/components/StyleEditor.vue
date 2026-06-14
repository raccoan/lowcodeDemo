<template>
  <div class="style-editor">
    <div class="form-item">
      <span>宽度 (Width)</span>
      <a-input v-model:value="localStyle.width" placeholder="例如: 200px" allow-clear />
    </div>
    <div class="form-item">
      <span>高度 (Height)</span>
      <a-input v-model:value="localStyle.height" placeholder="例如: 100px" allow-clear />
    </div>
    <div class="form-item">
      <span>内边距 (Padding)</span>
      <a-input v-model:value="localStyle.padding" placeholder="例如: 12px" allow-clear />
    </div>
    <div class="form-item">
      <span>外边距 (Margin)</span>
      <a-input v-model:value="localStyle.margin" placeholder="例如: 10px 0" allow-clear />
    </div>
    <div class="form-item">
      <span>圆角 (Border Radius)</span>
      <a-input v-model:value="localStyle.borderRadius" placeholder="例如: 6px" allow-clear />
    </div>
    <div class="form-item">
      <span>边框 (Border)</span>
      <a-input v-model:value="localStyle.border" placeholder="例如: 1px solid #ccc" allow-clear />
    </div>
    <div class="form-item">
      <span>背景颜色 (Background Color)</span>
      <a-input v-model:value="localStyle.backgroundColor" placeholder="例如: #f5f5f5" allow-clear />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{
  style: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'update:style', value: Record<string, any>): void
}>()

// 本地副本，避免直接修改 prop
const localStyle = reactive({ ...props.style })

// 监听外部 prop 变化，同步到本地
watch(() => props.style, (newVal) => {
  Object.keys(localStyle).forEach(key => delete localStyle[key])
  Object.assign(localStyle, newVal)
}, { deep: true })

// 监听本地变化，同步到父组件
watch(localStyle, (newVal) => {
  emit('update:style', { ...newVal })
}, { deep: true })
</script>

<style scoped>
.style-editor {
  width: 100%;
}

.form-item {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item span {
  color: #d9d9d9;
  font-size: 14px;
}
</style>