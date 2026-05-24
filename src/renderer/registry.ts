// 组件注册表
import {h} from 'vue'
import {Input,Button} from 'ant-design-vue'
// h是vue的createElement函数，作用是创建虚拟DOM节点，比如说h(组件，属性对象（传给组件的pros等），子节点（可以为数组，函数等等）)
// h(Button,null,()=>props.text) 这段代码的意思是创建一个Button组件，属性对象为null，子节点为一个函数，这个函数返回props.text
export const registry:Record<string,any>={
  button:(props:any)=>h(Button,null,()=>props.text),
  input:(props:any)=>h(Input,{placeholder:props.placeholder})
}