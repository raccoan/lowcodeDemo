<template>
  <div
    class="render-item"
    :class="{ active: editorStore.selectedId === item.id }"
    @click.stop="select"
  >
    <component
      :is="registry[item.type]"
      v-model:children="item.children"
      v-bind="item.props"
      :style="item.style"
    />
  </div>
</template>

<script setup lang="ts">
import type { ComponentSchema } from '../schema/components'
import { useEditorStore } from '../store/editor'
import { registry } from '../renderer/registry'

defineOptions({ name: 'RenderItem' })

const props = defineProps<{ item: ComponentSchema }>()
const editorStore = useEditorStore()

const select = () => {
  editorStore.selectComponent(props.item.id)
}
</script>

<style scoped>
.render-item {
  margin-bottom: 12px;
  transition: all 0.2s;
}
.render-item.active {
  outline: 2px solid #1677ff;
}
</style>