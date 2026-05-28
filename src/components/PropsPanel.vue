<template>
  <div class="props-panel">
    <!-- 面包屑导航：始终显示当前选中组件的层级路径 -->
    <div class="breadcrumb-wrapper">
      <Breadcrumb />
    </div>

    <!-- 使用 Ant Design Tabs 切换属性编辑和组件树 -->
    <a-tabs v-model:activeKey="activeTab" type="card" class="panel-tabs">
      <!-- 标签页1：属性编辑 -->
      <a-tab-pane key="props" tab="属性">
        <div v-if="currentComponent" class="props-editor">
          <h3>组件属性</h3>
          <a-divider />

          <!-- 动态生成当前组件类型的特有属性编辑器（配置驱动） -->
          <template v-for="editor in filteredPropsEditors" :key="editor.key">
            <div class="form-item">
              <span>{{ editor.label }}</span>
              <a-input
                v-if="editor.type === 'input'"
                v-model:value="currentComponent.props[editor.key]"
                allow-clear
              />

              <a-textarea
                v-else-if="editor.type === 'textarea'"
                v-model:value="currentComponent.props[editor.key]"
                :rows="3"
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
          <h3>样式</h3>
          <!-- 通用样式编辑器：抽离公共样式属性（Padding, Margin, BorderRadius） -->
          <StyleEditor
            :style="currentComponent.style"
            @update:style="val => currentComponent.style = val"
          />
        </div>
        <div v-else class="empty-tab">
          未选中组件，无法编辑属性
        </div>
      </a-tab-pane>

      <!-- 标签页2：组件树导航 -->
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
import StyleEditor from './StyleEditor.vue'

// 获取全局编辑器 store
const editorStore = useEditorStore()
// 当前选中的组件（响应式）
const currentComponent = computed(() => editorStore.currentComponent)

// 当前激活的 Tab（'props' 或 'tree'）
const activeTab = ref('props')

// 根据当前组件类型，获取其属性编辑器配置（从 componentMetaMap 读取）
const propsEditors = computed(() => {
  if (!currentComponent.value) return []
  const meta = componentMetaMap[currentComponent.value.type]
  return meta?.propsEditors || []
})

// 新增：根据图表类型过滤后的编辑器列表
const filteredPropsEditors = computed(() => {
  const editors = propsEditors.value
  // 非图表组件，不过滤
  if (currentComponent.value?.type !== 'chart') {
    return editors
  }
  const chartType = currentComponent.value.props?.type || 'line'
  return editors.filter(editor => {
    if (editor.key === 'xAxisData' || editor.key === 'seriesData') {
      return chartType !== 'pie'   // 饼图时隐藏这两个
    }
    if (editor.key === 'pieData') {
      return chartType === 'pie'    // 非饼图时隐藏这个
    }
    return true
  })
})
</script>

<style scoped>
/* ===== 整体面板 ===== */
.props-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #18181a;
  color: #f5f5f5;
  overflow: hidden;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

/* ===== 面包屑 ===== */
.breadcrumb-wrapper {
  padding: 12px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: #1c1c1f;
  backdrop-filter: blur(10px);
}

/* ===== Tabs ===== */
.panel-tabs {
  flex: 1;
  overflow-y: auto;
  padding: 0 18px 18px;
}

/* ===== 属性编辑区域 ===== */
.props-editor {
  color: #f3f4f6;
}

/* ===== 标题 ===== */
.props-editor h3 {
  margin: 0;
  margin-bottom: 14px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 0.2px;
}

/* ===== 表单项 ===== */
.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.form-item span {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 400;
  letter-spacing: 0.2px;
}

/* ===== 空状态 ===== */
.empty-tab {
  padding: 56px 20px;
  text-align: center;
  color: #6b7280;
  font-size: 13px;
}

/* ===== 树容器 ===== */
.tree-wrapper {
  padding-top: 4px;
}

/* =========================================================
   Ant Design 样式覆盖
========================================================= */

/* ===== Tabs ===== */
:deep(.ant-tabs-nav) {
  margin-bottom: 18px;
}

:deep(.ant-tabs-nav::before) {
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

:deep(.ant-tabs-tab) {
  color: #56bce8 !important;
  padding: 10px 0 !important;
  margin-right: 24px !important;
  font-size: 13px;
  font-weight: 400;
  transition: all 0.2s ease;
}

:deep(.ant-tabs-tab:hover) {
  color: #d1d5db !important;
}

:deep(.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #29bae6 !important;
  font-weight: 500;
}

:deep(.ant-tabs-ink-bar) {
  height: 1px !important;
  background: #25deec !important;
  border-radius: 999px;
}

/* ===== Divider ===== */
:deep(.ant-divider) {
  border-color: rgba(255,255,255,0.06);
  margin: 18px 0;
}

/* ===== Input ===== */
:deep(.ant-input) {
  background: transparent;
  border: 1px solid transparent;
  color: #040000;
  border-radius: 8px;
  padding: 7px 11px;
  font-size: 13px;
  transition: all 0.2s ease;
  box-shadow: none;
}

:deep(.ant-input:hover) {
  border-color: #3a3a3d;
}

:deep(.ant-input:focus) {
  border-color: #4096ff;
  box-shadow: none;
}

:deep(.ant-input::placeholder) {
  color: #6b7280;
}

/* ===== Select ===== */
:deep(.ant-select-selector) {
  background: #232325 !important;
  border: 1px solid transparent !important;
  color: #f5f5f5 !important;
  border-radius: 8px !important;
  min-height: 36px !important;
  box-shadow: none !important;
  transition: all 0.2s ease;
}

:deep(.ant-select-selector:hover) {
  border-color: #3a3a3d !important;
}

:deep(.ant-select-focused .ant-select-selector) {
  border-color: #4096ff !important;
  box-shadow: none !important;
}

:deep(.ant-select-selection-item) {
  color: #f5f5f5 !important;
  font-size: 13px;
}

:deep(.ant-select-arrow) {
  color: #9ca3af;
}

/* ===== Select 下拉菜单 ===== */
:deep(.ant-select-dropdown) {
  background: #232325;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  padding: 4px;
  box-shadow:
    0 10px 30px rgba(0,0,0,0.35);
}

:deep(.ant-select-item) {
  color: #f3f4f6;
  border-radius: 6px;
  min-height: 34px;
  line-height: 34px;
  transition: all 0.15s ease;
}

:deep(.ant-select-item-option-active) {
  background: rgba(255,255,255,0.05);
}

:deep(.ant-select-item-option-selected) {
  background: rgba(64,150,255,0.18) !important;
  color: #ffffff;
}

/* ===== Switch ===== */
:deep(.ant-switch) {
  background: #3a3a3d;
}

:deep(.ant-switch-checked) {
  background: #4096ff;
}

/* ===== Tree ===== */
:deep(.ant-tree) {
  background: transparent;
  color: #e5e7eb;
  font-size: 13px;
}

:deep(.ant-tree-node-content-wrapper) {
  border-radius: 6px;
  min-height: 32px;
  line-height: 32px;
  transition: all 0.15s ease;
}

:deep(.ant-tree-node-content-wrapper:hover) {
  background: rgba(255,255,255,0.05);
}

:deep(.ant-tree-node-selected) {
  background: rgba(64,150,255,0.18) !important;
  color: #ffffff !important;
}

:deep(.ant-tree-switcher) {
  color: #6b7280;
}

/* ===== Breadcrumb ===== */
:deep(.ant-breadcrumb) {
  font-size: 12px;
  color: #9ca3af;
}

:deep(.ant-breadcrumb a) {
  color: #9ca3af;
  transition: color 0.2s ease;
}

:deep(.ant-breadcrumb a:hover) {
  color: #ffffff;
}

:deep(.ant-breadcrumb-separator) {
  color: #6b7280;
}

:deep(.ant-breadcrumb .current) {
  color: #ffffff;
  font-weight: 500;
}

/* ===== Scrollbar ===== */
.panel-tabs::-webkit-scrollbar {
  width: 6px;
}

.panel-tabs::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
}

.panel-tabs::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.14);
}

.panel-tabs::-webkit-scrollbar-track {
  background: transparent;
}
</style>