<template>

  <a-layout class="layout">

    <!-- 左侧 -->

    <a-layout-sider
      width="220"
      class="left-sider"
    >

      <MaterialPanel />

    </a-layout-sider>

    <!-- 中间 -->

    <a-layout-content
      class="content"
    >

      <CanvasArea />

    </a-layout-content>

    <!-- 右侧 -->

    <a-layout-sider
      width="320"
      class="right-sider"
    >

      <PropsPanel />

    </a-layout-sider>

  </a-layout>

</template>

<script setup lang="ts">

import MaterialPanel
from './components/MaterialPanel.vue'

import CanvasArea
from './components/CanvasArea.vue'

import PropsPanel
from './components/PropsPanel.vue'

</script>

<style scoped>

.layout {

  height: 100vh;

}

/**
 * 左侧
 */
.left-sider {

  background: #141414;

  overflow: auto;

}

/**
 * 中间
 */
.content {

  background: #f0f2f5;

  overflow: auto;

}

/**
 * 右侧
 */
.right-sider {

  background: #1f1f1f;

  overflow: auto;

}

</style>