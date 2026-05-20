<template>
<a-layout style="height: 100vh">
  <a-layout-sider width="200">
    <MaterialPanel/>
  </a-layout-sider>

  <a-layout-content>
    <CanvasArea/>
  </a-layout-content>

  <a-layout-sider width="200">
    <PropsPanel/>
  </a-layout-sider>
</a-layout>
</template>

<script setup lang="ts">
import MaterialPanel from './components/MaterialPanel.vue';
import CanvasArea from './components/CanvasArea.vue';
import PropsPanel from './components/PropsPanel.vue';
</script>