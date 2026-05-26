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