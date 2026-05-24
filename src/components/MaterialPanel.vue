<!-- 左侧组件库 -->
<template>
 <div class="panel">
  <div class="material-item" @click="addButton">Button</div>
  <div class="material-item" @click="addInput">Input</div>
 </div>
</template>

<script setup lang="ts">
import {store} from '../store';
import type { componentType} from '@/schema/components';

const baseStyle = {
  width: 'auto',
  height: 'auto',

  padding: '12px',
  margin: '10px 0',

  border: '1px solid #d9d9d9',
  borderRadius: '6px',

  backgroundColor: '#ffffff'
}

const addButton=()=>{
  store.components.push({
    id:Date.now().toString(),
    type:'button',
    props:{text:'按钮'},
    style:{...baseStyle}
  })
}

const addInput=()=>{
  store.components.push({
    id:Date.now().toString(),
    type:'input',
    props:{placeholder:'请输入内容'},
    style:{...baseStyle}
  })
}
</script>

<style scoped>
.panel{
  padding:12px
}

.material-item {
  border: 1px solid #ddd;

  padding: 10px;

  margin-bottom: 10px;

  cursor: pointer;

  border-radius: 6px;
}

</style>