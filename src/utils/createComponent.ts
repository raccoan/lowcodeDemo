// src/utils/createComponent.ts
import { nanoid } from 'nanoid'
import type { ComponentSchema, ComponentType } from '../schema/components'

export function createComponent(type: ComponentType): ComponentSchema {
  const id = nanoid()

  switch (type) {
    case 'button':
      return {
        id,
        type: 'button',
        props: {
          text: '按钮',
          type: 'default',
          danger: false,
          disabled: false
        },
        style: {
          padding: '8px 16px'
        },
        children: []
      }
    case 'input':
      return {
        id,
        type: 'input',
        props: {
          placeholder: '请输入内容',
          disabled: false
        },
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
          gap: '12px',
          padding: '12px',
          border: '1px dashed #ccc',
          backgroundColor: '#fafafa'
        },
        children: []
      }
    case 'col':
      return {
        id,
        type: 'col',
        props: {},
        style: {
          flex: '1',
          minHeight: '80px',
          padding: '8px',
          border: '1px dashed #1677ff',
          backgroundColor: '#fff'
        },
        children: []
      }
    default:
      // 实际上不会走到这里，因为 type 已被限制
      throw new Error(`Unknown component type: ${type}`)
  }
}