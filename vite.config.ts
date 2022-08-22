import { defineConfig } from "vite";
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin({ ssr: false })],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
