<template>
  <div class="render-item" :class="{ active: editorStore.selectedId === item.id }" @click.stop="select"
    @contextmenu.prevent="showContextMenu">
    <component :is="registry[item.type]" v-if="item.type === 'row' || item.type === 'col'"
      v-model:children="item.children" v-bind="item.props" :style="item.style" />
    <component class="node" v-else :is="registry[item.type]" v-bind="item.props" :style="item.style"
      @update:value="handleValueUpdate" @update:label="handleLabelUpdate" @update:text="handleTextUpdate" />
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

// 处理子组件更新事件
const handleValueUpdate = (val: string) => {
  props.item.props.value = val
  // 触发响应式更新
  editorStore.components = [...editorStore.components]
}
const handleLabelUpdate = (val: string) => {
  props.item.props.label = val
  // 触发响应式更新
  editorStore.components = [...editorStore.components]
}
const handleTextUpdate = (val: string) => {
  props.item.props.text = val
  // 触发响应式更新
  editorStore.components = [...editorStore.components]
}

// 显示右键菜单
const showContextMenu = (e: MouseEvent) => {
  if (editorStore.selectedId !== props.item.id) {
    editorStore.selectComponent(props.item.id)
  }
  if ((window as any).__contextMenu) {
    (window as any).__contextMenu(e, props.item.id)
  }
}
</script>

<style scoped>
.render-item {
  margin-bottom: 12px;
}

.render-item.active {
  outline: 2px solid #1677ff;
}

.node {
  display: flex;
  justify-content: center;
  align-items: center;
}

.node>* {
  width: 100%;
}
</style>