import { defineStore } from 'pinia'
import type { ComponentSchema } from '../schema/components'

interface EditorState {
  components: ComponentSchema[]
  selectedId: string
}

export const useEditorStore = defineStore('editor', {
  state: (): EditorState => ({
    components: [],
    selectedId: ''
  }),
  getters: {
    currentComponent(state) {
      const find = (list: ComponentSchema[]): ComponentSchema | undefined => {
        for (const item of list) {
          if (item.id === state.selectedId) return item
          if (item.children?.length) {
            const found = find(item.children)
            if (found) return found
          }
        }
      }
      return find(state.components)
    },

    // 在 getters 内部添加
    getComponentPath: (state) => (id: string) => {
      const path: ComponentSchema[] = []
      const find = (list: ComponentSchema[], ancestors: ComponentSchema[]): boolean => {
        for (const item of list) {
          if (item.id === id) {
            path.push(...ancestors, item)
            return true
          }
          if (item.children?.length) {
            if (find(item.children, [...ancestors, item])) return true
          }
        }
        return false
      }
      find(state.components, [])
      return path
    }

  },
  actions: {
    selectComponent(id: string) {
      this.selectedId = id
    },
    clearSelected() {
      this.selectedId = ''
    },
    addComponent(component: ComponentSchema) {
      this.components.push(component)
    },
    refreshSelectedId() {
      const currentId = this.selectedId
      if (currentId) {
        this.selectedId = ''
        import('vue').then(({ nextTick }) => {
          nextTick(() => {
            this.selectedId = currentId
          })
        })
      }
    }
  }
})