<template>
  <div
    class="canvas"
    @click="clearSelected"
    @dragover.prevent
    @drop="onDrop"
  >
    <!-- 使用 draggable 实现根组件排序 -->
    <draggable
      v-model="editorStore.components"
      item-key="id"
      group="components"
      class="root-draggable"
      @dragover.prevent
      @drop="onDraggableDrop"
    >
      <template #item="{ element }">
        <RenderItem :item="element" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import RenderItem from './RenderItem.vue'
import { useEditorStore } from '../store/editor'
import { createComponent } from '../utils/createComponent'

const editorStore = useEditorStore()

const clearSelected = () => {
  editorStore.clearSelected()
}

/**
 * 根画布 drop（从物料库添加新组件）
 */
const onDrop = (e: DragEvent) => {
  const type = localStorage.getItem('drag-component')
  if (!type) return
  localStorage.removeItem('drag-component') // 可选：清除
  const component = createComponent(type as any)
  editorStore.components.push(component)
}

/**
 * draggable 内部的 drop 事件（防止冒泡导致重复添加）
 */
const onDraggableDrop = (e: DragEvent) => {
  e.stopPropagation()
}
</script>

<style scoped>
.canvas {
  min-height: 100vh;
  padding: 24px;
  background: #f0f2f5;
}
.root-draggable {
  min-height: 100%;
}
</style>