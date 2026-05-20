<!-- 中间画板 -->
 <template>

<div class="canvas">

  <div
      v-for="item in store.components"
      :key="item.id"
      class="node"
      :class="{ active: store.selectedId === item.id }"
      @click="select(item.id)"
    >
  <component :is="resolveComponent(item)"/>
</div>

</div>

 </template>

<script setup lang="ts">
import {store} from '../store';
const select=(id:string)=>{
  store.selectedId=id; // 设置选中组件的id
}

const resolveComponent=(item:any)=>{
 if(item.type=='button'){
  return {
    template:`<a-button block>{{text}}</a-button>`,
    setup(){
      return {text:item.props.text}
    }
 }
}
if(item.type=='input'){
  return {
    template:`<a-input :placeholder="placeholder"/>`,
    setup(){
      return {placeholder:item.props.placeholder}
    }
 }
}}
</script>

<style scoped>
.canvas {
  min-height: 600px;
  border: 1px dashed #ccc;
  padding: 12px;
}
.node {
  margin-bottom: 10px;
  padding: 4px;
}
.active {
  outline: 2px solid #1890ff;
}
</style>