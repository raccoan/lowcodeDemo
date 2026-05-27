<!-- ComponentTree.vue -->
<!--没搞懂  -->
<template>
  <div class="component-tree">
    <a-tree
      v-if="treeData.length > 0"
      :tree-data="treeData"
      :selected-keys="selectedKeys"
      @select="onSelect"
      :expanded-keys="expandedKeys"
      @expand="onExpand"
    />
    <div v-else class="empty-tree">
      暂无组件，请从左侧拖拽添加
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useEditorStore } from '../store/editor'
import type { ComponentSchema } from '../schema/components'

const editorStore = useEditorStore()

// 转换组件树为 a-tree 需要的格式
const toTreeData = (components: ComponentSchema[]): any[] => {
  return components.map(comp => ({
    key: comp.id,
    title: getComponentLabel(comp),
    children: comp.children?.length ? toTreeData(comp.children) : undefined
  }))
}

const getComponentLabel = (comp: ComponentSchema) => {
  const typeMap: Record<string, string> = {
    button: '按钮',
    input: '输入框',
    row: '行容器',
    col: '列容器'
  }
  return typeMap[comp.type] || comp.type
}

const treeData = computed(() => toTreeData(editorStore.components))

const selectedKeys = computed(() => {
  return editorStore.selectedId ? [editorStore.selectedId] : []
})

const onSelect = (keys: any[]) => {
  if (keys.length) {
    editorStore.selectComponent(keys[0])
  }
}

const expandedKeys = ref<string[]>([])
const onExpand = (keys: string[]) => {
  expandedKeys.value = keys
}

// 自动展开当前选中组件的父级路径
watch(selectedKeys, (newKeys) => {
  if (newKeys.length) {
    const id = newKeys[0]
    const path = editorStore.getComponentPath(id)
    const keysToExpand = path.slice(0, -1).map(p => p.id)
    expandedKeys.value = [...new Set([...expandedKeys.value, ...keysToExpand])]
  }
}, { immediate: true })
</script>

<style scoped>
.component-tree {
  padding: 8px;
  min-height: 200px;
}
.empty-tree {
  text-align: center;
  color: #999;
  padding: 40px 20px;
}
/* 覆盖 a-tree 样式，适配深色背景 */
:deep(.ant-tree) {
  background: transparent;
  color: #e0e0e0;
}
:deep(.ant-tree .ant-tree-node-content-wrapper) {
  color: #e0e0e0;
}
:deep(.ant-tree .ant-tree-node-content-wrapper:hover) {
  background-color: #30cdcd;
}
:deep(.ant-tree .ant-tree-node-selected) {
  background-color: #30cdcd;
  color: #fff;
}
:deep(.ant-tree .ant-tree-switcher) {
  color: #aaa;
}
</style>