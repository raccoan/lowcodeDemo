<template>
  <div class="canvas" :class="{ 'drag-over': isDragging }" @click="clearSelected" @dragover="handleDragOver"
    @drop="onRootDrop" @contextmenu.prevent="onCanvasContextMenu">
    <draggable v-model="editorStore.components" item-key="id" group="components" class="root-draggable"
      @dragover="handleDragOver" @drop="onDraggableDrop" @end="() => editorStore.saveHistory()"
      @contextmenu.prevent="onCanvasContextMenu">
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

const onCanvasContextMenu = (e: MouseEvent) => {
  // 调用全局右键菜单，不传递组件 id（表示空白区域）
  if ((window as any).__contextMenu) {
    (window as any).__contextMenu(e)
  }
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