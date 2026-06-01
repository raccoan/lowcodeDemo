import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 添加这一行：将 vue 指向包含编译器的完整版
      'vue': 'vue/dist/vue.esm-bundler.js',
      // 已有的 @ 别名可以保留
      '@': path.resolve(__dirname, './src'),
    },
  },
})