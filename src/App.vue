<template>
  <a-layout style="height:100vh">
    <a-layout-sider width="220">
      <MaterialPanel />
    </a-layout-sider>
    <a-layout-content>
      <CanvasArea />
    </a-layout-content>
    <a-layout-sider width="320">
      <PropsPanel />
    </a-layout-sider>
  </a-layout>
  <ContextMenu />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import MaterialPanel from './components/MaterialPanel.vue'
import CanvasArea from './components/CanvasArea.vue'
import PropsPanel from './components/PropsPanel.vue'
import ContextMenu from './components/ContextMenu.vue'
import { useEditorStore } from './store/editor'

const editorStore = useEditorStore()

const handleKeydown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'z') {
    e.preventDefault()
    editorStore.undo()
  } else if (e.ctrlKey && e.key === 'y') {
    e.preventDefault()
    editorStore.redo()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>