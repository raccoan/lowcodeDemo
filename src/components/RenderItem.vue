<template>
  <div class="render-item" :class="{ active: editorStore.selectedId === item.id }" @click.stop="select">
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

const handleValueUpdate = (val: string) => {
  props.item.props.value = val
}

const handleLabelUpdate = (val: string) => {
  props.item.props.label = val
}

const handleTextUpdate = (val: string) => {
  props.item.props.text = val
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