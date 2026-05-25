<template>

  <!-- Row -->

  <div
    v-if="item.type === 'row'"
    class="row"
    :style="item.style"
    @click.stop="select"
  >

    <!-- 递归渲染 children -->

    <RenderItem
      v-for="child in item.children"
      :key="child.id"
      :item="child"
    />

  </div>

  <!-- Col -->

  <div
    v-else-if="item.type === 'col'"
    class="col"
    :style="item.style"
    @click.stop="select"
  >

    <!-- children -->

    <RenderItem
      v-for="child in item.children"
      :key="child.id"
      :item="child"
    />

  </div>

  <!-- 普通组件 -->

  <div
    v-else
    class="node"
    :style="item.style"
    @click.stop="select"
  >

    <component
      :is="registry[item.type]"
      v-bind="item.props"
    />

  </div>

</template>

<script setup lang="ts">

import type {
  ComponentSchema
} from '../schema/components'

import {
  useEditorStore
} from '../store/editor'

import {
  registry
} from '../renderer/registry'

defineOptions({
  name: 'RenderItem'
})

const props =
  defineProps<{

    item: ComponentSchema

  }>()

const editorStore =
  useEditorStore()

const select = () => {

  editorStore.selectComponent(
    props.item.id
  )

}

</script>

<style scoped>

.row {

  display: flex;

  gap: 12px;

}

.col {

  flex: 1;

}

.node {

  transition: all .2s;

}

</style>