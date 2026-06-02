<template>
    <Teleport to="body">
        <div v-show="visible" class="context-menu" :style="{ left: x + 'px', top: y + 'px' }" @click.stop>
            <div @click="handleCopy">复制</div>
            <div @click="handlePaste">粘贴</div>
            <div @click="handleDelete">删除</div>
            <div @click="handleUndo">撤销</div>
            <div @click="handleRedo">重做</div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Modal } from 'ant-design-vue'
import { useEditorStore } from '../store/editor'

const editorStore = useEditorStore()
const visible = ref(false)
const x = ref(0)
const y = ref(0)

// 显示菜单
const showMenu = (event: MouseEvent, componentId?: string) => {
    // 如果右键在空白处（没有传入 componentId），则清空选中
    if (!componentId) {
        editorStore.clearSelected()
    } else if (editorStore.selectedId !== componentId) {
        editorStore.selectComponent(componentId)
    }
    x.value = event.clientX
    y.value = event.clientY
    visible.value = true
    event.preventDefault()
    event.stopPropagation()
}

// 隐藏菜单
const hideMenu = () => {
    visible.value = false
}

// 复制
const handleCopy = () => {
    const id = editorStore.selectedId
    if (id) {
        editorStore.copyCache = editorStore.copyComponent(id)
    } else {
        // 提示没有选中任何组件
        Modal.info({ title: '提示', content: '请先选中要复制的组件' })
    }
    hideMenu()
}

// 粘贴
const handlePaste = () => {
    if (!editorStore.copyCache) {
        Modal.info({ title: '提示', content: '没有可粘贴的内容，请先复制组件' })
        return
    }
    // 获取当前选中的组件（可能为 undefined）
    const parent = editorStore.currentComponent
    // 如果选中的是容器（有 children 属性），则粘贴到容器内，否则粘贴到根
    const parentId = parent && parent.children !== undefined ? parent.id : undefined
    editorStore.pasteComponent(editorStore.copyCache, parentId)
    hideMenu()
}

// 删除（带确认框）
const handleDelete = () => {
    const id = editorStore.selectedId
    if (!id) {
        Modal.info({ title: '提示', content: '请先选中要删除的组件' })
        return
    }
    Modal.confirm({
        title: '确认删除',
        content: '删除后不可撤销，确定要删除该组件吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
            editorStore.deleteComponent(id)
        }
    })
    hideMenu()
}

// 撤销
const handleUndo = () => {
    editorStore.undo()
    hideMenu()
}

// 重做
const handleRedo = () => {
    editorStore.redo()
    hideMenu()
}

// 全局点击隐藏菜单
const onClickOutside = () => {
    if (visible.value) hideMenu()
}
onMounted(() => {
    document.addEventListener('click', onClickOutside)
        // 暴露 showMenu 给全局，供 RenderItem 和 CanvasArea 调用
        ; (window as any).__contextMenu = showMenu
})
onUnmounted(() => {
    document.removeEventListener('click', onClickOutside)
    delete (window as any).__contextMenu
})
</script>

<style scoped>
.context-menu {
    position: fixed;
    background: #2a2a2a;
    border: 1px solid #555;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    min-width: 120px;
}

.context-menu div {
    padding: 8px 16px;
    cursor: pointer;
    color: #e0e0e0;
    font-size: 14px;
    transition: background 0.2s;
}

.context-menu div:hover {
    background: #3c9eff;
    color: white;
}
</style>