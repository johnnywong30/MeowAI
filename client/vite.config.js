import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      '/chat': {
        target: 'http://meowai.eba-pm8tsbpj.us-west-2.elasticbeanstalk.com/',
        changeOrigin: true,
      },
      '/classify': {
        target: 'http://meowai.eba-pm8tsbpj.us-west-2.elasticbeanstalk.com/',
        changeOrigin: true,
      },
      '/code': {
        target: 'http://meowai.eba-pm8tsbpj.us-west-2.elasticbeanstalk.com/',
        changeOrigin: true,
      },
      '/image': {
        target: 'http://meowai.eba-pm8tsbpj.us-west-2.elasticbeanstalk.com/',
        changeOrigin: true,
      },
    },
  },
})
