import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import { getThemeVariables } from 'antd/dist/theme';
// @ts-ignore
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          ...getThemeVariables({
            dark: true,
          }),
          ...{
            "primary-color": "#1DA57A",
            "link-color": "#1DA57A",
            "border-radius-base": "2px",
          },
        }
      },
    }
  },
  resolve: {
    alias: [{
      find: '@components',
      replacement: path.resolve(__dirname, "src/components"),
    }, {
      find: '@views',
      replacement: path.resolve(__dirname, "src/views"),
    }, {
      find: '@utils',
      replacement: path.resolve(__dirname, "src/utils"),
    }, {
      find: '@static',
      replacement: path.resolve(__dirname, "src/static"),
    }],
  },
  server: {
    host: '0.0.0.0',
    port: 3004,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
