<template>

  <!-- Row -->

  <div
    v-if="item.type === 'row'"
    class="row"
    :style="item.style"
    @click.stop="select"
  >

    <!-- children sortable -->

    <draggable

      v-model="item.children"

      item-key="id"

      group="components"

      class="drag-area"

      @dragover.prevent

      @drop="onDrop"

    >

      <template #item="{ element }">

        <RenderItem
          :item="element"
        />

      </template>

    </draggable>

  </div>

  <!-- Col -->

  <div
    v-else-if="item.type === 'col'"
    class="col"
    :style="item.style"
    @click.stop="select"
  >

    <draggable

      v-model="item.children"

      item-key="id"

      group="components"

      class="drag-area"

      @dragover.prevent

      @drop="onDrop"

    >

      <template #item="{ element }">

        <RenderItem
          :item="element"
        />

      </template>

    </draggable>

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

import draggable
from 'vuedraggable'

import type {
  ComponentSchema
} from '../schema/components'

import {
  useEditorStore
} from '../store/editor'

import {
  registry
} from '../renderer/registry'

import {
  createComponent
} from '../utils/createComponent'

defineOptions({
  name: 'RenderItem'
})

const props =
  defineProps<{

    item: ComponentSchema

  }>()

const editorStore =
  useEditorStore()

/**
 * 选中组件
 */
const select = () => {

  editorStore.selectComponent(
    props.item.id
  )

}

/**
 * 接收左侧拖入
 */
const onDrop = (
  e: DragEvent
) => {

  const type =
    e.dataTransfer?.getData(
      'componentType'
    )

  /**
   * 如果不是左侧拖入
   * 直接结束
   */
  if (!type) return

  /**
   * 没 children
   * 说明不是容器
   */
  if (!props.item.children) return

  props.item.children.push(

    createComponent(type as any)

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

.drag-area {

  width: 100%;

  min-height: 120px;

}

.node {

  transition: all .2s;

}

</style>