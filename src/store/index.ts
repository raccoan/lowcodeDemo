// 简单状态
import { reactive } from "vue";
import type { componentSchema } from "@/schema/components";

export const store=reactive({
  components: [] as componentSchema[], // 画布上的组件列表
  selectedId:'' as string, // 当前选中组件的id
})

