<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item
        v-for="(comp, index) in path"
        :key="comp.id"
        @click="select(comp.id)"
        :class="{ 'current': index === path.length - 1 }"
      >
        {{ getComponentLabel(comp) }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '../store/editor'

const editorStore = useEditorStore()

const path = computed(() => {
  const id = editorStore.selectedId
  if (!id) return []
  return editorStore.getComponentPath(id)
})

const select = (id: string) => {
  editorStore.selectComponent(id)
}

const getComponentLabel = (comp: any) => {
  // 可以根据组件类型返回可读名称
  const typeMap: Record<string, string> = {
    button: '按钮',
    input: '输入框',
    row: '行容器',
    col: '列容器'
  }
  return typeMap[comp.type] || comp.type
}
</script>

<style scoped>
.breadcrumb {
  padding: 8px 16px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  
  border-radius:  8px;
}
.current {
  color: #2ecacd;
  font-weight: 500;
}


</style>