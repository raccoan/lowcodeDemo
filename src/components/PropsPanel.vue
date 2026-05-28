<template>
  <div class="props-panel">
    <!-- 面包屑（始终显示，如果有选中组件） -->
    <div class="breadcrumb-wrapper">
      <Breadcrumb />
    </div>

    <!-- 使用 Tabs 切换属性编辑和组件树 -->
    <a-tabs v-model:activeKey="activeTab" type="card" class="panel-tabs">
      <!-- 属性编辑 Tab -->
      <a-tab-pane key="props" tab="属性">
        <!-- 有选中组件时显示属性编辑表单，否则显示提示 -->
        <div v-if="currentComponent" class="props-editor">
          <h3>组件属性</h3>
          <a-divider />

          <!-- 动态渲染当前组件的特有属性（根据配置） -->
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
              <a-textarea
                v-else-if="editor.type === 'textarea'"
                v-model:value="currentComponent.props[editor.key]"
                :rows="4"
                allow-clear
              />
            </div>
          </template>

          <a-divider />
          <h3>样式</h3>
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
        <div v-else class="empty-tab">
          未选中组件，无法编辑属性
        </div>
      </a-tab-pane>

      <!-- 组件树 Tab -->
      <a-tab-pane key="tree" tab="组件树">
        <div class="tree-wrapper">
          <ComponentTree />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEditorStore } from '../store/editor'
import { componentMetaMap } from '../config/componentMeta'
import Breadcrumb from './Breadcrumb.vue'
import ComponentTree from './ComponentTree.vue'

const editorStore = useEditorStore()
const currentComponent = computed(() => editorStore.currentComponent)

// 当前激活的 Tab（'props' 或 'tree'）
const activeTab = ref('props')

// 获取当前组件类型的属性编辑器配置
const propsEditors = computed(() => {
  if (!currentComponent.value) return []
  const meta = componentMetaMap[currentComponent.value.type]
  return meta?.propsEditors || []
})
</script>

<style scoped>
.props-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #413f3f;
  color: white;
  overflow: hidden;
}


.breadcrumb-wrapper {
  background: #2a2a2a;
  border-bottom: 1px solid #333;
  padding: 8px 12px;
  
  border-radius: 0 0 8px 8px;
}

.panel-tabs {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 16px 16px;
}

.props-editor {
  
  color: #e0e0e0;

}

.form-item {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item span {
  color: #d9d9d9;
  font-size: 14px;
}

.empty-tab {
  padding: 40px;
  text-align: center;
  color: #999;
}

.tree-wrapper {
  padding: 8px 0;
  
}

/* 覆盖 Tabs 标签颜色 */
:deep(.ant-tabs-tab) {
  color: #d9d9d9 !important;
}
:deep( .ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #50bcbc !important;
}
:deep(.ant-tabs-tab:hover) {
  color: #5fcadc !important;
}

/* 可选：调整标签栏背景 */
:deep(.ant-tabs-nav) {
  background-color: #393c3b;
  margin-bottom: 12px;
}
</style>

