import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import cssnesting from 'postcss-nesting'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [cssnesting()]
    }
  }
})
