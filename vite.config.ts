import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 组件自动导入
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: [
        './src/stores' // 这里指定你的 Pinia 仓库文件夹路径
      ],
      dts: 'auto-imports.d.ts'
    }),
    // element ui 组件自动注册
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    open: true
  }
})
