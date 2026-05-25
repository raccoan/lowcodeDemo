<template>

  <div class="panel">

    <div
      v-for="item in materials"
      :key="item.type"
      class="material-item"
      draggable="true"
      @dragstart="onDragStart(item)"
    >

      {{ item.label }}

    </div>

  </div>

</template>

<script setup lang="ts">

/**
 * 左侧组件库
 */
const materials = [

  {
    type:'button',
    label:'Button'
  },

  {
    type:'input',
    label:'Input'
  },

  {
    type:'row',
    label:'Row'
  }

]

/**
 * 开始拖拽
 */
const onDragStart = (
  item:any
) => {

  /**
   * 保存当前拖拽组件类型
   */
  localStorage.setItem(
    'drag-component',
    item.type
  )

}

</script>

<style scoped>

.panel {

  height:100%;

  padding:16px;

  box-sizing:border-box;

}

.material-item {

  background:#262626;

  border:1px solid #434343;

  color:white;

  padding:12px;

  border-radius:8px;

  cursor:grab;

  transition:all .2s;

  user-select:none;

  margin-bottom:12px;

}

.material-item:hover {

  background:#1677ff;

}

</style>