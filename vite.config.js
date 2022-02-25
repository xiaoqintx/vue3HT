import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8082,
    proxy: {
      // '/api'的意思是前端后端一致
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // 后端忽略api前缀1
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

