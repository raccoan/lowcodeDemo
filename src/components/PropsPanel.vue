<template>
  <div class="props-panel">
    <div v-if="currentComponent">
      <h2 class="title">组件属性</h2>
      <a-divider />

      <template v-for="editor in propsEditors" :key="editor.key">
        <div class="form-item">
          <span>{{ editor.label }}</span>
          <a-input
            v-if="editor.type === 'input'"
            v-model:value="currentComponent.props[editor.key]"
            allow-clear
          />
          <a-select
            v-else-if="editor.type === 'select'"
            v-model:value="currentComponent.props[editor.key]"
            :options="editor.options"
            style="width:100%"
          />
          <a-switch
            v-else-if="editor.type === 'switch'"
            v-model:checked="currentComponent.props[editor.key]"
          />
        </div>
      </template>

      <a-divider />
      <h2 class="title">样式</h2>
      <div class="form-item">
        <span>Padding</span>
        <a-input v-model:value="currentComponent.style.padding" />
      </div>
      <div class="form-item">
        <span>Margin</span>
        <a-input v-model:value="currentComponent.style.margin" />
      </div>
      <div class="form-item">
        <span>Border Radius</span>
        <a-input v-model:value="currentComponent.style.borderRadius" />
      </div>
    </div>
    <div v-else class="empty-panel">未选中组件</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '../store/editor'
import { componentMetaMap } from '../config/componentMeta'

const editorStore = useEditorStore()
const currentComponent = computed(() => editorStore.currentComponent)

const propsEditors = computed(() => {
  if (!currentComponent.value) return []
  const meta = componentMetaMap[currentComponent.value.type]
  return meta?.propsEditors || []
})
</script>

<style scoped>
.props-panel {
  height: 100%;
  padding: 20px;
  background: #1f1f1f;
  color: white;
  overflow-y: auto;
}
.title {
  color: white;
  font-size: 16px;
  margin-bottom: 12px;
}
.form-item {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-item span {
  color: #d9d9d9;
}
.empty-panel {
  padding-top: 40px;
  text-align: center;
  color: #999;
}
</style>