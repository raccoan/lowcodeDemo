<template>

  <div class="panel">

    <!-- Button -->

    <div
      class="material-item"
      draggable="true"
      @dragstart="
        onDragStart('button')
      "
    >

      Button

    </div>

    <!-- Input -->

    <div
      class="material-item"
      draggable="true"
      @dragstart="
        onDragStart('input')
      "
    >

      Input

    </div>

    <!-- Row -->

    <div
      class="material-item"
      draggable="true"
      @dragstart="
        onDragStart('row')
      "
    >

      Row

    </div>

  </div>

</template>

<script setup lang="ts">

/**
 * 拖拽开始
 *
 * 往 dataTransfer
 * 存入组件类型
 */
const onDragStart = (
  type: string
) => {

  event?.dataTransfer?.setData(
    'componentType',
    type
  )

}

</script>

<style scoped>

.panel {

  height: 100%;

  background: #141414;

  color: white;

  padding: 16px;

}

.material-item {

  background: #262626;

  border: 1px solid #434343;

  padding: 12px;

  border-radius: 8px;

  cursor: grab;

  margin-bottom: 12px;

  transition: all .2s;

}

.material-item:hover {

  background: #1677ff;

}

</style>