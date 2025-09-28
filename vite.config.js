// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react' // Assuming you're using React
import path from "path" // Import the 'path' module

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()], // Or your framework's plugin
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Add this line
        // If your src folder is, for example, 'client/src', use:
        // "@": path.resolve(__dirname, "./client/src"),
      },
    },
  }
})
