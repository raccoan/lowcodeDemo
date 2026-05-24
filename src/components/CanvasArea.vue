<!-- 中间画板 -->
 <template>

<div class="canvas">
  <draggable v-model="store.components" item-key="id">
    <template #item="{element}">
      <div
        
        class="node"
        :class="{ active: store.selectedId === element.id }"
        :style="element.style"
      @click="select(element.id)"
    >
      <component :is="registry[element.type]" v-bind="element.props"/>
    </div>
    </template>
  </draggable>
</div>

 </template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import {store} from '../store';
import {registry} from '@/renderer/registry';


const select=(id:string)=>{
  store.selectedId=id; // 设置选中组件的id
}


</script>

<style scoped>
.canvas {
  min-height: 100vh;

  padding: 20px;

  background: #f5f5f5;
}

.node {
  transition: all .2s;
}

.active {
  outline: 2px solid #1677ff;
}
</style>