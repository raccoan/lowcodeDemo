// 组件定义
export type componentType='button' | 'input';

export interface componentStyle{
  width?: string
  height?: string

  padding?: string
  margin?: string

  border?: string
  borderRadius?: string

  backgroundColor?: string
}

export interface componentSchema{
  id:string;
  type:componentType;
  props:Record<string,any>;
  style?: componentStyle;
}