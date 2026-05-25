<template>

  <div
    class="canvas"
    @click="clearSelected"
  >

    <RenderItem
      v-for="item in editorStore.components"
      :key="item.id"
      :item="item"
    />

  </div>

</template>

<script setup lang="ts">

import {
  useEditorStore
} from '../store/editor'

import RenderItem from './RenderItem.vue'

const editorStore =
  useEditorStore()

const clearSelected = () => {

  editorStore.clearSelected()

}

</script>

<style scoped>

.canvas {

  min-height: 100vh;

  padding: 24px;

  background: #f0f2f5;

}

</style>