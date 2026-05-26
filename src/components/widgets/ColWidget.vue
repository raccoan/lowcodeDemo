<template>
  <div class="col-widget" @dragover.prevent @drop="onDrop">
    <draggable
      v-model="localChildren"
      item-key="id"
      :group="{ name: 'components', pull: true, put: true }"
      class="col-drag-area"
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
  if (!type) return
  localStorage.removeItem('drag-component')
  const component = createComponent(type as any)
  localChildren.value = [...localChildren.value, component]
  setTimeout(() => editorStore.refreshSelectedId(), 0)
}
</script>

<style scoped>
.col-widget {
  width: 100%;
  height: 100%;
}
.col-drag-area {
  min-height: 100px;
  background: #fff;
  border-radius: 6px;
}
</style>