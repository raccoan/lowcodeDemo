<template>
  <div class="render-item" :class="{ active: isSelected }" @click.stop="select"
    @contextmenu.prevent="showContextMenu">
    <component :is="registry[item.type]" v-if="isContainer"
      v-model:children="item.children" v-bind="item.props" :style="computedStyle" />
    <component class="node" v-else :is="registry[item.type]" v-bind="item.props" :style="computedStyle"
      @update:value="handleValueUpdate" @update:label="handleLabelUpdate" @update:text="handleTextUpdate" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentSchema } from '../schema/components'
import { useEditorStore } from '../store/editor'
import { registry } from '../renderer/registry'

defineOptions({ name: 'RenderItem' })

const props = defineProps<{ item: ComponentSchema }>()
const editorStore = useEditorStore()

// 计算属性：判断是否为容器组件
const isContainer = computed(() => {
  return props.item.type === 'row' || props.item.type === 'col'
})

// 计算属性：判断是否被选中（缓存选中状态）
const isSelected = computed(() => {
  return editorStore.selectedId === props.item.id
})

// 计算属性：缓存样式计算结果，避免重复计算
const computedStyle = computed(() => {
  const baseStyle = props.item.style || {}
  // 如果是容器组件，确保有必要的布局样式
  if (isContainer.value) {
    return {
      display: 'flex',
      minHeight: '100px',
      ...baseStyle
    }
  }
  return baseStyle
})

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