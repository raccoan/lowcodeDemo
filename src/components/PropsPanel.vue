<!-- 右侧属性面板 -->

<template>

<div class="panel">
<div v-if="current">
  <div v-if="current.type=='button'">
    <a-input v-model:value="current.props.text"></a-input>
  </div>
  <div v-if="current.type=='input'">
    <a-input v-model:value="current.props.placeholder"/>
  </div>
  <div v-else>
    <p>请选择组件</p>
  </div>
</div>
</div>

</template>

<script setup lang="ts">
import {store} from '../store';
import { computed } from 'vue';
const current=computed(()=>{
  return store.components.find((i)=>i.id===store.selectedId)
})

</script>

<style scoped>
.panel{
  padding:12px
}
</style>