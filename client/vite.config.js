import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  server: {
    proxy: {
      '/chat': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/classify': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/code': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/image': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
