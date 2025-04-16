import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_API_BASE_URL_DEV": JSON.stringify(
      process.env.VITE_API_BASE_URL_DEV
    ),
    "process.env.VITE_API_BASE_URL_PROD": JSON.stringify(
      process.env.VITE_API_BASE_URL_PROD
    ),
  },
  server: {
    proxy: {
      "/api": {
        target: `${process.env.VITE_API_BASE_URL_PROD}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
