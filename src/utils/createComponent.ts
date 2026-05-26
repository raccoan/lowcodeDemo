import { nanoid } from 'nanoid'
import type { ComponentSchema, ComponentType } from '../schema/components'

export function createComponent(type: ComponentType): ComponentSchema {
  const id = nanoid()

  switch (type) {
    case 'button':
      return {
        id,
        type: 'button',
        props: { text: '按钮', type: 'default', danger: false, disabled: false },
        style: { padding: '8px 16px' },
        children: []
      }
    case 'input':
      return {
        id,
        type: 'input',
        props: { placeholder: '请输入内容', disabled: false },
        style: {},
        children: []
      }
    case 'row':
      return {
        id,
        type: 'row',
        props: {},
        style: { padding: '12px', border: '1px dashed #ccc', backgroundColor: '#fafafa' },
        children: [
          createComponent('col'),
          createComponent('col'),
          createComponent('col')   // 三列
        ]
      }
    case 'col':
      return {
        id,
        type: 'col',
        props: {},
        style: {
          flex: 1,
          minWidth: '100px',
          minHeight: '100px',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          backgroundColor: '#fff'
        },
        children: []
      }
    default:
      throw new Error(`Unknown type: ${type}`)
  }
}