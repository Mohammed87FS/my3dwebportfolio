import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    // Optimize build output - Cache bust 2025-06-28
    target: "esnext",
    minify: "esbuild",
    sourcemap: false,
  },
});
