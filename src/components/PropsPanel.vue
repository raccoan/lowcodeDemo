<!-- 右侧属性面板 -->

<template>

<div class="panel">
<div v-if="current">
  <h3>属性面板</h3>
  <a-divider></a-divider>
  <div class="form-item">
    <span>Padding</span>
    <a-input v-model:value="current.style.padding"></a-input>
  </div>
  <div class="form-item">
        <span>Margin</span>
        <a-input v-model:value="current.style.margin" />
      </div>

      <div class="form-item">
        <span>Border</span>
        <a-input v-model:value="current.style.border" />
      </div>

      <div class="form-item">
        <span>Border Radius</span>
        <a-input v-model:value="current.style.borderRadius" />
      </div>

      <div class="form-item">
        <span>Background</span>
        <a-input v-model:value="current.style.backgroundColor" />
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
  padding:16px
}
.form-item{
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;

}
</style>