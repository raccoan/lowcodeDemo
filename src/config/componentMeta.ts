// 直接在文件内定义类型，无需导入外部文件
// src/config/componentMeta.ts
// PropEditorConfig 定义了属性编辑器的配置，包括属性的 key、显示标签、编辑器类型和可选项
export interface PropEditorConfig {
  key: string
  label: string
  type: 'input' | 'select' | 'switch' | 'number'
  options?: { label: string; value: any }[]
}
// ComponentMeta 定义了组件的元信息，包括显示标签、属性编辑器配置和默认样式
export interface ComponentMeta {
  label: string
  propsEditors: PropEditorConfig[]
  defaultStyle?: Record<string, string>
}
// componentMetaMap 是一个记录组件元信息的对象，键是组件类型，值是对应的 ComponentMeta
export const componentMetaMap: Record<string, ComponentMeta> = {
  button: {
    label: '按钮',
    propsEditors: [
      { key: 'text', label: '按钮文字', type: 'input' },
      {
        key: 'type',
        label: '按钮类型',
        type: 'select',
        options: [
          { label: '默认', value: 'default' },
          { label: '主要', value: 'primary' },
          { label: '虚线', value: 'dashed' },
          { label: '文字', value: 'text' },
          { label: '链接', value: 'link' }
        ]
      },
      { key: 'danger', label: '危险按钮', type: 'switch' },
      { key: 'disabled', label: '禁用', type: 'switch' }
    ]
  },
  input: {
    label: '输入框',
    propsEditors: [
      { key: 'placeholder', label: '占位文字', type: 'input' },
      { key: 'disabled', label: '禁用', type: 'switch' }
    ]
  },
  row: {
    label: '行容器',
    propsEditors: []
  },
  col: {
    label: '列容器',
    propsEditors: []
  },
  // src/config/componentMeta.ts
  chart: {
    label: '图表',
    propsEditors: [
      {
        key: 'type',
        label: '图表类型',
        type: 'select',
        options: [
          { label: '折线图', value: 'line' },
          { label: '柱状图', value: 'bar' },
          { label: '饼图', value: 'pie' }
        ]
      }
    ]
  }
}