import { ref } from 'vue'

const DRAG_DATA_KEY = 'drag-component'

export const useDragDrop = () => {
  const draggedType = ref<string | null>(null)
  const isDragging = ref(false)

  /**
   * 开始拖拽
   */
  const onDragStart = (type: string) => {
    draggedType.value = type
    isDragging.value = true

    // 使用 localStorage 传递数据（兼容跨 iframe 等场景）
    localStorage.setItem(DRAG_DATA_KEY, type)

    // 也可以通过 dataTransfer 传递
    return {
      type,
      setData: (e: DragEvent) => {
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'copy'
          e.dataTransfer.setData('text/plain', type)
        }
      }
    }
  }

  /**
   * 拖拽结束
   */
  const onDragEnd = () => {
    draggedType.value = null
    isDragging.value = false
    localStorage.removeItem(DRAG_DATA_KEY)
  }

  /**
   * 拖拽经过
   */
  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy'
    }
  }

  /**
   * 获取拖拽类型
   */
  const getDragType = (e: DragEvent): string | null => {
    // 优先从 dataTransfer 获取
    if (e.dataTransfer) {
      const type = e.dataTransfer.getData('text/plain')
      if (type) return type
    }

    // 从 localStorage 获取
    return localStorage.getItem(DRAG_DATA_KEY) || null
  }

  /**
   * 检查是否有有效的拖拽数据
   */
  const hasDragData = (): boolean => {
    return draggedType.value !== null ||
      localStorage.getItem(DRAG_DATA_KEY) !== null
  }

  /**
   * 清除拖拽数据
   */
  const clearDragData = () => {
    draggedType.value = null
    isDragging.value = false
    localStorage.removeItem(DRAG_DATA_KEY)
  }

  return {
    draggedType,
    isDragging,
    onDragStart,
    onDragEnd,
    onDragOver,
    getDragType,
    hasDragData,
    clearDragData
  }
}
