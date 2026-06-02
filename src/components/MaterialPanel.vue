<template>

  <div class="panel">

    <div
      v-for="item in materials"
      :key="item.type"
      class="material-item"
      :class="{ dragging: isDragging }"
      draggable="true"
      @dragstart="handleDragStart($event, item)"
      @dragend="handleDragEnd"
    >

      {{ item.label }}

    </div>

  </div>

</template>

<script setup lang="ts">
import { useDragDrop } from '../composables/useDragDrop'

const { onDragStart, onDragEnd, isDragging } = useDragDrop()

/**
 * 左侧组件库
 */
const materials = [
  { type: 'button', label: 'Button' },
  { type: 'input', label: 'Input' },
  { type: 'row', label: 'Row' },
  { type: 'col', label: 'Col' },
  { type: 'chart', label: 'Chart' },
  {type: 'text', label: 'Text' },
  { type: 'datePicker', label: 'DatePicker' },
  { type: 'select', label: 'Select' },
  { type: 'image', label: 'Image' }
]


/**
 * 开始拖拽
 */
const handleDragStart = (e: DragEvent, item: any) => {
  const result = onDragStart(item.type)
  result.setData(e)
  console.log('dragstart type:', item.type)
}

/**
 * 拖拽结束
 */
const handleDragEnd = () => {
  onDragEnd()
}

</script>

<style scoped>

.panel {

  height:100%;

  padding:16px;

  box-sizing:border-box;

}

.material-item {

  background:#262626;

  border:1px solid #434343;

  color:white;

  padding:12px;

  border-radius:8px;

  cursor:grab;

  transition:all .2s;

  user-select:none;

  margin-bottom:12px;

}

.material-item:hover {

  background:#1677ff;

}

</style>