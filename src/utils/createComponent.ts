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
        style: { padding: '4px 8px', },
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
        style: {
          display: 'flex',
          flexDirection: 'row',   // 强制横向
          gap: '12px',
          padding: '12px',
          border: '1px dashed #ccc',
          backgroundColor: '#fafafa',
          minHeight: '120px'      // 确保容器可见
        },
        children: [
          createComponent('col'),
          createComponent('col'),
          createComponent('col')
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
    case 'chart':
      return {
        id,
        type: 'chart',
        props: {
          type: 'line',
          xAxisData: JSON.stringify(['周一', '周二', '周三', '周四', '周五']),
          seriesData: JSON.stringify([120, 200, 150, 80, 70])
        },
        style: {
          padding: '0',
          backgroundColor: '#ffffff'
        },
        children: []
      }
    default:
      throw new Error(`Unknown type: ${type}`)
  }
}