import type {
  ComponentSchema,
  ComponentType
} from '../schema/components'

/**
 * 创建组件 schema
 *
 * 工业级低代码：
 * 所有 schema 创建必须统一
 */
export function createComponent(
  type: ComponentType
): ComponentSchema {

  const id =
    Date.now().toString()
    +
    Math.random()

  /**
   * Button
   */
  if (type === 'button') {

    return {

      id,

      type,

      props: {
        text: '按钮'
      },

      style: {

        padding: '12px',

        margin: '10px 0',

        border:
          '1px solid #d9d9d9',

        borderRadius: '6px',

        backgroundColor: '#ffffff'

      }

    }

  }

  /**
   * Input
   */
  if (type === 'input') {

    return {

      id,

      type,

      props: {
        placeholder: '请输入'
      },

      style: {

        padding: '12px',

        margin: '10px 0',

        border:
          '1px solid #d9d9d9',

        borderRadius: '6px',

        backgroundColor: '#ffffff'

      }

    }

  }

  /**
   * Row
   */
  if (type === 'row') {

    return {

      id,

      type,

      props: {},

      style: {

        display: 'flex',

        gap: '12px',

        padding: '20px',

        margin: '10px 0',

        border:
          '1px dashed #999',

        backgroundColor:
          '#fafafa'

      },

      children: [

        createComponent('col'),
        createComponent('col'),
        createComponent('col')

      ]

    }

  }

  /**
   * Col
   */
  return {

    id,

    type: 'col',

    props: {},

    style: {

      flex: '1',

      minHeight: '120px',

      padding: '12px',

      border:
        '1px dashed #1677ff',

      backgroundColor:
        '#ffffff'

    },

    children: []

  }

}