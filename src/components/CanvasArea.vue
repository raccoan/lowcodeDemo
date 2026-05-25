<template>

  <div
    class="canvas"
    @click="clearSelected"
    @dragover.prevent
    @drop="onDrop"
  >

    <!-- 根级 sortable -->

    <draggable
      v-model="
        editorStore.components
      "
      item-key="id"
      group="components"
    >

      <template #item="{ element }">

        <RenderItem
          :item="element"
        />

      </template>

    </draggable>

  </div>

</template>

<script setup lang="ts">

import draggable
from 'vuedraggable'

import {
  useEditorStore
} from '../store/editor'

import RenderItem
from './RenderItem.vue'

import {
  createComponent
} from '../utils/createComponent'

const editorStore =
  useEditorStore()

/**
 * 清空选中
 */
const clearSelected = () => {

  editorStore.clearSelected()

}

/**
 * 接收左侧拖拽
 */
const onDrop = (
  e: DragEvent
) => {

  const type =
    e.dataTransfer?.getData(
      'componentType'
    )

  if (!type) return

  const component =
    createComponent(type as any)

  editorStore.components.push(
    component
  )

}

</script>

<style scoped>

.canvas {

  min-height: 100vh;

  padding: 24px;

  background: #f0f2f5;

}

</style>