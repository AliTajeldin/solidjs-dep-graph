import { defineConfig } from "vite";
import solidPlugin from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [solidPlugin({ ssr: false }), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'SolidDepGraph',
      fileName: 'solid-dep-graph',
    },
    target: 'esnext',
    minify: false
  },
  base: '/solidjs-dep-graph/',
});
