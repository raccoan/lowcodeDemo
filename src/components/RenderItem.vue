<template>
  <div class="render-item" @click.stop="select">
    <!-- Row 容器 -->
    <div v-if="item.type === 'row'" class="row" :style="item.style">
      <!-- 使用 draggable 实现子组件排序 -->
      <draggable
        v-model="children"
        item-key="id"
        group="components"
        class="drop-area"
        @dragover.prevent
        @drop="onDraggableDrop"
      >
        <template #item="{ element }">
          <RenderItem :item="element" />
        </template>
      </draggable>
    </div>

    <!-- Col 容器 -->
    <div v-else-if="item.type === 'col'" class="col" :style="item.style">
      <draggable
        v-model="children"
        item-key="id"
        group="components"
        class="drop-area"
        @dragover.prevent
        @drop="onDraggableDrop"
      >
        <template #item="{ element }">
          <RenderItem :item="element" />
        </template>
      </draggable>
    </div>

    <!-- 普通组件 -->
    <div v-else class="node" :style="item.style">
      <component :is="registry[item.type]" v-bind="item.props" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import draggable from 'vuedraggable'
import type { ComponentSchema } from '../schema/components'
import { useEditorStore } from '../store/editor'
import { registry } from '../renderer/registry'
import { createComponent } from '../utils/createComponent'

defineOptions({ name: 'RenderItem' })

const props = defineProps<{ item: ComponentSchema }>()
const editorStore = useEditorStore()

const select = () => {
  editorStore.selectComponent(props.item.id)
}

// children 计算属性（支持响应式更新）
const children = computed({
  get: () => props.item.children || [],
  set: (value) => {
    props.item.children = value
  }
})

/**
 * 从物料库拖拽添加子组件
 */
const onDraggableDrop = (e: DragEvent) => {
  e.stopPropagation()
  const type = localStorage.getItem('drag-component')
  if (!type) return
  localStorage.removeItem('drag-component') // 可选
  const component = createComponent(type as any)
  children.value.push(component)
}
</script>

<style scoped>
.render-item {
  margin-bottom: 12px;
}
.row {
  display: flex;
  gap: 12px;
}
.col {
  flex: 1;
}
.drop-area {
  width: 100%;
  min-height: 120px;
}
.node {
  transition: all 0.2s;
}
</style>