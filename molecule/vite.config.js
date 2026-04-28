import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    open: "/pages/home.html",
  },
  build: {
    rollupOptions: {
      input: {
        home: "pages/home.html",
        catalog: "pages/catalog.html",
      },
    },
  },
  plugins: [tailwindcss()],
});
