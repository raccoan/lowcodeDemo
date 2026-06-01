import type { CSSProperties } from 'vue'

export type ComponentType = 'button' | 'input' | 'row' | 'col' | 'chart'

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

export interface ComponentSchema {
  id: string
  type: ComponentType
  props: Record<string, any>
  style?: ComponentStyle   // 注意这里 style 是可选的，但你可以设为必选
  children?: ComponentSchema[]
}