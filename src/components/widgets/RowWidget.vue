<!-- Row Widget -->
<template>
  <div :style="style" class="row-widget">
    <draggable
      v-model="localChildren"
      item-key="id"
      :group="{ name: 'components', pull: true, put: true }"
      class="row-drag-area"
      @dragover.prevent
      @drop="onDrop"
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
import type { ComponentSchema , ComponentType} from '@/schema/components'
import RenderItem from '../RenderItem.vue'
import { createComponent } from '../../utils/createComponent'
import { useEditorStore } from '../../store/editor'

const props = withDefaults(defineProps<{
  style?: Record<string, any>
  children?: ComponentSchema[]
}>(), {
  style: () => ({}),
  children: () => []
})

const emit = defineEmits<{
  (e: 'update:children', value: ComponentSchema[]): void
}>()

const editorStore = useEditorStore()

const localChildren = computed({
  get: () => props.children,
  set: (val) => emit('update:children', val)
})

const onDrop = (e: DragEvent) => {
  e.stopPropagation()
  const type = localStorage.getItem('drag-component')
  if (!type) return
  localStorage.removeItem('drag-component')
  const component = createComponent(type as ComponentType)
  localChildren.value = [...localChildren.value, component]
  setTimeout(() => editorStore.refreshSelectedId(), 0)
}
</script>

<style scoped>
.row-widget { width: 100%; }
.row-drag-area {
  min-height: 60px;
  transition: all 0.2s;
}
</style>