<template>
  <div
    class="canvas"
    :class="{ 'drag-over': isDragging }"
    @click="clearSelected"
    @dragover="handleDragOver"
    @drop="onRootDrop"
  >
    <draggable
      v-model="editorStore.components"
      item-key="id"
      group="components"
      class="root-draggable"
      @dragover="handleDragOver"
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
import type { ComponentType } from '../schema/components'
import { useDragDrop } from '../composables/useDragDrop'

const editorStore = useEditorStore()
const { onDragOver, getDragType, clearDragData, isDragging } = useDragDrop()

const clearSelected = () => {
  editorStore.clearSelected()
}

const handleDragOver = (e: DragEvent) => {
  onDragOver(e)
}

const onRootDrop = (e: DragEvent) => {
  const type = getDragType(e)
  if (!type) return
  clearDragData()
  const component = createComponent(type as ComponentType)
  editorStore.components.push(component)
}

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
<!-- first -->