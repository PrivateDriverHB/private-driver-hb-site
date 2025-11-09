import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        cancel: resolve(__dirname, "cancel/index.html"),
        success: resolve(__dirname, "success/index.html"),
      },
    },
  },
});


