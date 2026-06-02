import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/lowcodeDemo/',
  build: {
    outDir: 'docs'   // 直接输出到 docs
  }
})