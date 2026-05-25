import { h } from 'vue'

import {
  Button,
  Input
} from 'ant-design-vue'

/**
 * 组件注册表
 *
 * type -> renderer
 */
export const registry:
Record<string, any> = {

  /**
   * 按钮
   */
  button: (props: any) =>

    h(
      Button,
      null,
      () => props.text
    ),

  /**
   * 输入框
   */
  input: (props: any) =>

    h(
      Input,
      {
        placeholder:
          props.placeholder
      }
    )

}