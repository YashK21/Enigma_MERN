import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_LOCALHOST': JSON.stringify(process.env.VITE_LOCALHOST),
    'process.env.VITE_PROD': JSON.stringify(process.env.VITE_PROD),
 },
 server: {
  proxy: {
    '/api': {
      target: `${process.env.VITE_PROD}`,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
})
