<template>
  <div
    class="render-item"
    :class="{ active: editorStore.selectedId === item.id }"
    @click.stop="select"
  >
    <!-- 容器组件：使用 v-model:children 传递 children -->
    <component
      :is="registry[item.type]"
      v-if="item.type === 'row' || item.type === 'col'"
      v-model:children="item.children"
      v-bind="item.props"
      :style="item.style"
    />
    <!-- 基础组件：不传递 children -->
    <component
      v-else
      :is="registry[item.type]"
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
}
.render-item.active {
  outline: 2px solid #1677ff;
}
</style>