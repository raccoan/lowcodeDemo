// src/store/editor.ts
import { defineStore } from 'pinia'
import type { ComponentSchema } from '../schema/components'
import { deepClone } from '../utils/deepClone'

interface EditorState {
  components: ComponentSchema[]
  selectedId: string
  // 历史记录
  history: ComponentSchema[][]
  historyIndex: number
  // 复制缓存
  copyCache: ComponentSchema | null
  // 防抖计时器
  _historyTimer: number | null
}

export const useEditorStore = defineStore('editor', {
  state: (): EditorState => ({
    components: [],
    selectedId: '',
    history: [[]], // 初始保存空状态
    historyIndex: 0,
    copyCache: null,
    _historyTimer: null
  }),

  getters: {
    // 当前选中的组件（递归查找）
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
    // 获取组件路径（面包屑用）
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
    // 保存当前状态到历史
    saveHistory() {
      // 如果有定时器，先清除
      if (this._historyTimer) {
        clearTimeout(this._historyTimer)
      }
      // 防抖：100ms内多次调用只保存最后一次
      this._historyTimer = window.setTimeout(() => {
        const snapshot = deepClone(this.components)
        // 如果当前不在最新位置，删除之后的记录
        if (this.historyIndex < this.history.length - 1) {
          this.history = this.history.slice(0, this.historyIndex + 1)
        }
        // 避免重复保存相同状态
        const lastSnapshot = this.history[this.historyIndex]
        if (JSON.stringify(snapshot) !== JSON.stringify(lastSnapshot)) {
          this.history.push(snapshot)
          this.historyIndex++
          // 限制历史记录长度（保留最近50步）
          if (this.history.length > 50) {
            this.history.shift()
            this.historyIndex--
          }
        }
        this._historyTimer = null
      }, 100)
    },

    // 撤销
    undo() {
      if (this.historyIndex > 0) {
        this.historyIndex--
        this.components = deepClone(this.history[this.historyIndex])
        this.selectedId = ''
      }
    },

    // 重做
    redo() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++
        this.components = deepClone(this.history[this.historyIndex])
        this.selectedId = ''
      }
    },

    // 选中组件
    selectComponent(id: string) {
      this.selectedId = id
    },

    // 清空选中
    clearSelected() {
      this.selectedId = ''
    },

    // 添加组件（根级别）
    addComponent(component: ComponentSchema) {
      this.components.push(component)
      this.saveHistory()
    },

    // 删除组件（递归删除）
    deleteComponent(id: string) {
      const deleteById = (list: ComponentSchema[]): boolean => {
        const index = list.findIndex(item => item.id === id)
        if (index !== -1) {
          list.splice(index, 1)
          return true
        }
        for (const item of list) {
          if (item.children && deleteById(item.children)) return true
        }
        return false
      }
      deleteById(this.components)
      if (this.selectedId === id) this.selectedId = ''
      this.saveHistory()
    },

    // 复制组件（返回深拷贝）
    copyComponent(id: string): ComponentSchema | null {
      const find = (list: ComponentSchema[]): ComponentSchema | null => {
        for (const item of list) {
          if (item.id === id) return deepClone(item)
          if (item.children) {
            const found = find(item.children)
            if (found) return found
          }
        }
        return null
      }
      return find(this.components)
    },

    // 粘贴组件
    pasteComponent(copied: ComponentSchema, parentId?: string) {
      // 深拷贝一份，并重新生成所有 id
      const newComp = deepClone(copied)
      const regenerateIds = (comp: ComponentSchema) => {
        comp.id = Date.now().toString() + Math.random()
        if (comp.children) {
          comp.children.forEach(child => regenerateIds(child))
        }
      }
      regenerateIds(newComp)

      if (parentId) {
        // 查找父组件并插入 children
        const findAndPush = (list: ComponentSchema[]): boolean => {
          for (const item of list) {
            if (item.id === parentId) {
              if (!item.children) item.children = []
              item.children.push(newComp)
              return true
            }
            if (item.children && findAndPush(item.children)) return true
          }
          return false
        }
        if (!findAndPush(this.components)) {
          // 父组件不存在，添加到根
          this.components.push(newComp)
        }
      } else {
        this.components.push(newComp)
      }
      // 可选：选中新粘贴的组件
      this.selectComponent(newComp.id)
      this.saveHistory()
    },

    // 刷新当前选中（用于拖拽后重新高亮）
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