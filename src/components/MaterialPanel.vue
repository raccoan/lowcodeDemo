<!-- 左侧组件库 -->
<template>
 <div class="panel">
  <a-button block @click="add('button')">按钮</a-button>
  <a-button block @click="add('input')" style="margin-top: 10px;">输入框</a-button>
 </div>
</template>

<script setup lang="ts">
import {store} from '../store';
import type { componentType} from '@/schema/components';

const add=(type:componentType)=>{
  store.components.push({
    id:Date.now().toString(),
    type,
    props:type=='button'?{text:'按钮'}:{placeholder:'请输入内容'}}); // 添加组件到全局状态
}

</script>

<style scoped>
.panel{
  padding:12px
}
</style>