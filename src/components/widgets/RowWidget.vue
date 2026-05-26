<template>
  <!-- 外层 div 负责接收 drop -->
  <div :style="style" class="row-widget" @dragover.prevent @drop="onDrop">
    <draggable
      v-model="localChildren"
      item-key="id"
      :group="{ name: 'components', pull: false, put: false }"
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

const props = defineProps<{
  style?: Record<string, any>
  children?: ComponentSchema[]
}>()

const emit = defineEmits<{
  (e: 'update:children', value: ComponentSchema[]): void
}>()

const editorStore = useEditorStore()

const localChildren = computed({
  get: () => props.children || [],
  set: (val) => emit('update:children', val)
})

const onDrop = (e: DragEvent) => {
  e.stopPropagation()
  e.preventDefault()
  const type = localStorage.getItem('drag-component')
  console.log('Row onDrop, type:', type)   // 确认触发
  if (!type) return
  localStorage.removeItem('drag-component')
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
  min-height: 80px;
  background: #fafafa;
}
</style>