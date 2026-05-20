// 组件定义
export type componentType='button' | 'input';

export interface componentSchema{
  id:string;
  type:componentType;
  props:Record<string,any>;
}