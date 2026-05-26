<template>
  <div
    class="canvas"
    @click="clearSelected"
    @dragover.prevent
    @drop="onRootDrop"
  >
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

const onRootDrop = (e: DragEvent) => {
  const type = localStorage.getItem('drag-component')
  if (!type) return
  localStorage.removeItem('drag-component')
  const component = createComponent(type as any)
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