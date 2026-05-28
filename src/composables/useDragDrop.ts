// src/composables/useDragDrop.ts
import { useEditorStore } from '../store/editor'
import { createComponent } from '../utils/createComponent'
import type { ComponentType } from '../schema/components'

export function useDragDrop() {
  const editorStore = useEditorStore()

  const onDragStart = (type: ComponentType, e?: DragEvent) => {
    localStorage.setItem('drag-component', type)
    if (e?.dataTransfer) {
      e.dataTransfer.effectAllowed = 'copy'
    }
  }

  const onDrop = (targetArray: any[], e?: DragEvent) => {
    e?.preventDefault()
    const type = localStorage.getItem('drag-component') as ComponentType | null
    if (!type) return false
    localStorage.removeItem('drag-component')
    const component = createComponent(type)
    targetArray.push(component)
    // 可选：刷新选中状态
    if (editorStore.refreshSelectedId) {
      setTimeout(() => editorStore.refreshSelectedId(), 0)
    }
    return true
  }

  return { onDragStart, onDrop }
}