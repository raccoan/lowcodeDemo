<template>
  <!-- 材料面板外层容器 -->
  <div class="panel">

    <!-- Button 物料项 -->
    <!-- @click 点击时调用 addButton 方法，向画布添加一个按钮组件 -->
    <div class="material-item" @click="addButton">
      Button
    </div>

    <!-- Input 物料项 -->
    <div class="material-item" @click="addInput">
      Input
    </div>

    <!-- Row 容器物料项（支持嵌套子组件） -->
    <div class="material-item" @click="addRow">
      Row
    </div>

  </div>
</template>

<script setup lang="ts">
// 导入 Pinia 的 editor store，用于操作全局组件树
import { useEditorStore } from '../store/editor'

// 获取 editorStore 实例（响应式）
const editorStore = useEditorStore()

/**
 * 默认样式：每个组件添加时会继承的基础外观
 * 包含内边距、外边距、边框、圆角、背景色
 */
const baseStyle = {
  padding: '12px',
  margin: '10px 0',
  border: '1px solid #d9d9d9',
  borderRadius: '6px',
  backgroundColor: '#ffffff'
}

/**
 * 添加按钮组件
 * 生成一个符合 ComponentSchema 的对象，推入 store.components 数组（根组件）
 */
const addButton = () => {
  editorStore.addComponent({
    id: Date.now().toString(),      // 唯一标识，使用时间戳
    type: 'button',                 // 组件类型，用于 registry 映射
    props: { text: '按钮' },         // 组件属性，按钮显示文字
    style: { ...baseStyle }         // 克隆默认样式（避免引用共享）
  })
}

/**
 * 添加输入框组件
 */
const addInput = () => {
  editorStore.addComponent({
    id: Date.now().toString(),
    type: 'input',
    props: { placeholder: '请输入' }, // 输入框占位符
    style: { ...baseStyle }
  })
}

/**
 * 添加 Row 容器组件
 * 容器组件的关键是 children 数组，可以包含子组件（此处预置一个 Col）
 */
const addRow = () => {
  editorStore.addComponent({
    id: Date.now().toString(),
    type: 'row',                    // 组件类型，需要确保 registry 中有 row 对应的渲染组件
    props: {},                      // 无特殊属性
    style: {
      padding: '20px',
      margin: '10px 0',
      border: '1px dashed #999',
      backgroundColor: '#fafafa'
    },
    /**
     * children 是容器核心：表示该组件内部的子组件列表
     * 这里预置了一个 Col 子组件，并给 Col 也预置了空 children（支持嵌套）
     */
    children: [
      {
        id: Date.now() + '_col',    // 注意：实际运行中 Date.now() 相同会导致 id 冲突？应该用单独时间戳或 uuid
        type: 'col',
        props: {},
        style: {
          // 有问题
          height: '120px',
          padding: '10px',
          border: '1px dashed #1677ff',
          backgroundColor: '#ffffff'
        },
        children: []                // Col 也可以继续添加子组件
      }
    ]
  })
}
</script>

<style scoped>
/* 面板整体样式：深色背景、白色文字、内边距 */
.panel {
  height: 100%;
  background: #141414;
  color: white;
  padding: 16px;
}

/* 每个物料项的样式：灰色背景、边框、圆角、指针、间距，以及悬停变蓝效果 */
.material-item {
  background: #262626;
  border: 1px solid #434343;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 12px;
  transition: all .2s;
}

.material-item:hover {
  background: #1677ff;
}
</style>