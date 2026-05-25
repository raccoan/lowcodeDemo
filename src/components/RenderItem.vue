<template>

  <div
    class="render-item"

    @click.stop="select"
  >

    <!-- Row -->

    <div
      v-if="item.type === 'row'"
      class="row"
      :style="item.style"
    >

      <!-- Row children -->

      <div

        class="drop-area"

        @dragover.prevent

        @drop.stop="onDrop"
      >

        <RenderItem
          v-for="child in children"
          :key="child.id"
          :item="child"
        />

      </div>

    </div>

    <!-- Col -->

    <div
      v-else-if="
        item.type === 'col'
      "
      class="col"
      :style="item.style"
    >

      <div

        class="drop-area"

        @dragover.prevent

        @drop.stop="onDrop"
      >

        <RenderItem
          v-for="child in children"
          :key="child.id"
          :item="child"
        />

      </div>

    </div>

    <!-- 普通组件 -->

    <div
      v-else
      class="node"
      :style="item.style"
    >

      <component
        :is="
          registry[item.type]
        "
        v-bind="item.props"
      />

    </div>

  </div>

</template>

<script setup lang="ts">

import { computed } from 'vue'

import type {
  ComponentSchema
} from '../schema/components'

import {
  useEditorStore
} from '../store/editor'

import {
  registry
} from '../renderer/registry'

import {
  createComponent
} from '../utils/createComponent'

defineOptions({
  name:'RenderItem'
})

const props =
  defineProps<{

    item:ComponentSchema

  }>()

const editorStore =
  useEditorStore()

/**
 * 选中组件
 */
const select = () => {

  editorStore.selectComponent(
    props.item.id
  )

}

/**
 * children
 */
const children = computed({

  get() {

    return props.item.children || []

  },

  set(value) {

    props.item.children = value

  }

})

/**
 * 子容器 drop
 */
const onDrop = () => {

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
   * 加入 children
   */
  children.value.push(
    component
  )

}

</script>

<style scoped>

.render-item {

  margin-bottom:12px;

}

/**
 * Row
 */
.row {

  display:flex;

  gap:12px;

}

/**
 * Col
 */
.col {

  flex:1;

}

/**
 * drop 区域
 */
.drop-area {

  width:100%;

  min-height:120px;

}

/**
 * 普通组件
 */
.node {

  transition:all .2s;

}

</style>