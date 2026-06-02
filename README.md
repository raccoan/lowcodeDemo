低代码平台
这是一个基于 Vue 3 + TypeScript + Pinia开发的低代码平台，支持通过拖拽组件、配置属性的方式快速生成页面。 
技术栈

| 技术 | 用途 |
|------|------|
| Vue 3 (Composition API) | 渐进式框架 |
| TypeScript | 类型安全 |
| Pinia | 状态管理 |
| Vite | 构建工具 |
| Ant Design Vue | UI 组件库 |
| vuedraggable | 拖拽排序 |
| ECharts | 图表可视化 |
| nanoid | 生成唯一 id |

本地运行

```bash
# 克隆仓库
git clone https://github.com/raccoan/lowcodeDemo.git

# 进入项目目录
cd lowcodeDemo

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器访问 http://localhost:5173

在线预览
https://raccoan.github.io/lowcodeDemo/
提示：页面为纯前端演示，数据存储于内存中，刷新后丢失。

未来计划
添加导出/导入页面 JSON（持久化）
支持组件复制/删除
增加更多组件（图片、视频、开关等）
提供页面预览模式（只读）
