/**
 * 所有组件类型
 */
export type ComponentType =
  | 'button'
  | 'input'
  | 'row'
  | 'col'

/**
 * 组件样式
 */

import type { CSSProperties } from 'vue'
 
export interface ComponentStyle extends CSSProperties {

  width?: string

  height?: string

  padding?: string

  margin?: string

  border?: string

  borderRadius?: string

  backgroundColor?: string

}

/**
 * 低代码组件 schema
 *
 * 真正的低代码平台本质：
 * 页面 = JSON Tree
 */
export interface ComponentSchema {

  /**
   * 唯一 id
   */
  id: string

  /**
   * 组件类型
   */
  type: ComponentType

  /**
   * 组件属性
   */
  props: Record<string, any>

  /**
   * 组件样式
   */
  style: ComponentStyle

  /**
   * 子组件
   */
  children?: ComponentSchema[]

}