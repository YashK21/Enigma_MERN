import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_LOCALHOST': JSON.stringify(process.env.VITE_LOCALHOST),
 },
 server: {
  proxy: {
    '/api': {
      target: 'https://enigma-mern.onrender.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
})
