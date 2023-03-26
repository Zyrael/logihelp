import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const serverUrl = "http://localhost:4000";
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/graphql": serverUrl,
      "/login": serverUrl,
    },
  },
});
