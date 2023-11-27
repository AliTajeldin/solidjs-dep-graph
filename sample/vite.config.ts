import { defineConfig } from "vite";
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [solidPlugin({ ssr: false }), tsconfigPaths()],
  server: {
    port: 3000,
    hmr: true,
  },
  build: {
    minify: false,
    target: 'esnext',
    sourcemap: false,
  },
});
