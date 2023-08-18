import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import cssnesting from 'postcss-nesting'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    copyDtsFiles: true,
  }),],
  css: {
    postcss: {
      plugins: [cssnesting()]
    }
  },
  build: {
    lib: {
      entry: "src/components/index.ts",
      name: "searchmate-react",
      fileName: (format) => `searchmate-react.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    }
  }
})
