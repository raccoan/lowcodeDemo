/**
 * 组件类型
 */
export type ComponentType =
  | 'button'
  | 'input'
  | 'row'
  | 'col'

/**
 * 组件样式
 */
import type {CSSProperties} from 'vue'
export interface ComponentStyle extends CSSProperties {

  width?: string

  height?: string

  padding?: string

  margin?: string

  border?: string

  borderRadius?: string

  backgroundColor?: string

  minHeight?: string

}

/**
 * 页面 schema
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
   * 属性
   */
  props: Record<string, any>

  /**
   * 样式
   */
  style: ComponentStyle

  /**
   * 子组件
   */
  children?: ComponentSchema[]

}