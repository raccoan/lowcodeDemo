import { defineStore } from 'pinia'

import type {
  ComponentSchema
} from '../schema/components'

interface EditorState {

  /**
   * 页面组件树
   */
  components: ComponentSchema[]

  /**
   * 当前选中的组件 id
   */
  selectedId: string

}

export const useEditorStore =
  defineStore('editor', {

    state: (): EditorState => ({

      components: [],

      selectedId: ''

    }),

    getters: {

      /**
       * 获取当前选中组件
       */
      currentComponent(state) {

        /**
         * 递归查找组件
         */
        const findComponent = (
          list: ComponentSchema[]
        ): ComponentSchema | undefined => {

          for (const item of list) {

            if (
              item.id === state.selectedId
            ) {

              return item

            }

            if (
              item.children?.length
            ) {

              const target =
                findComponent(
                  item.children
                )

              if (target) {

                return target

              }

            }

          }

        }

        return findComponent(
          state.components
        )

      }

    },

    actions: {

      /**
       * 选中组件
       */
      selectComponent(id: string) {

        this.selectedId = id

      },

      /**
       * 清空选中
       */
      clearSelected() {

        this.selectedId = ''

      },

      /**
       * 添加根组件
       */
      addComponent(
        component: ComponentSchema
      ) {

        this.components.push(component)

      }

    }

  })