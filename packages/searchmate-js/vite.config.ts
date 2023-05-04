import { defineConfig } from "vite";
import postcssNesting from "postcss-nesting";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNesting()],
    },
  },
  build: {
    lib: {
      entry: resolve(process.cwd(), "src/searchmate.ts"),
      formats: ["es"],
      fileName: "index",
    },
  },
  plugins: [
    dts({
      copyDtsFiles: true,
      include: ["src/props.d.ts"],
      insertTypesEntry: true,
    }),
  ],
});
