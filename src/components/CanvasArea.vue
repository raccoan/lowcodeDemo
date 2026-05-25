<template>

  <div
    class="canvas"

    @click="clearSelected"

    @dragover.prevent

    @drop="onDrop"
  >

    <!-- 页面组件 -->

    <RenderItem
      v-for="item in editorStore.components"
      :key="item.id"
      :item="item"
    />

  </div>

</template>

<script setup lang="ts">

import RenderItem
from './RenderItem.vue'

import {
  useEditorStore
} from '../store/editor'

import {
  createComponent
} from '../utils/createComponent'

const editorStore =
  useEditorStore()

/**
 * 清除选中
 */
const clearSelected = () => {

  editorStore.clearSelected()

}

/**
 * 根画布 drop
 */
const onDrop = () => {

  /**
   * 获取拖拽组件类型
   */
  const type =
    localStorage.getItem(
      'drag-component'
    )

  if (!type) {

    return

  }

  /**
   * 创建组件
   */
  const component =
    createComponent(type as any)

  /**
   * 加入页面
   */
  editorStore.components.push(
    component
  )

}

</script>

<style scoped>

.canvas {

  min-height:100vh;

  padding:24px;

  background:#f0f2f5;

}

</style>