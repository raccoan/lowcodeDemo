<template>
  <div class="row-widget" @dragover="handleDragOver" @drop="onDrop">
    <draggable
      v-model="localChildren"
      item-key="id"
      :group="{ name: 'components', pull: true, put: true }"
      class="row-drag-area"
    >
      <template #item="{ element }">
        <RenderItem :item="element" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import draggable from 'vuedraggable'
import type { ComponentSchema } from '../../schema/components'
import RenderItem from '../RenderItem.vue'
import { createComponent } from '../../utils/createComponent'
import { useEditorStore } from '../../store/editor'
import { useDragDrop } from '../../composables/useDragDrop'

const props = defineProps<{
  style?: Record<string, any>
  children?: ComponentSchema[]
}>()

const emit = defineEmits<{
  (e: 'update:children', value: ComponentSchema[]): void
}>()

const editorStore = useEditorStore()
const { onDragOver, getDragType, clearDragData } = useDragDrop()

const localChildren = computed({
  get: () => props.children || [],
  set: (val) => emit('update:children', val)
})

const handleDragOver = (e: DragEvent) => {
  onDragOver(e)
}

const onDrop = (e: DragEvent) => {
  e.stopPropagation()
  const type = getDragType(e)
  if (!type) return
  clearDragData()
  const component = createComponent(type as any)
  localChildren.value = [...localChildren.value, component]
  setTimeout(() => editorStore.refreshSelectedId(), 0)
}
</script>

<style scoped>
.row-widget {
  width: 100%;
}
.row-drag-area {
  display: flex;
  flex-direction: row;   /* 确保横向 */
  gap: 12px;
  min-height: 120px;
}
/* 每个子项（即 Col）等宽 */
.row-drag-area > * {
  flex: 1;
  min-width: 0;          /* 防止溢出 */
}
</style>
