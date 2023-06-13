import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";

dotenv.config();

const serverUrl = `http://127.0.0.1:${process.env.PORT}`;
export default defineConfig({
  plugins: [react(), svgr(), splitVendorChunkPlugin()],
  server: {
    proxy: {
      "/graphql": serverUrl,
      "/login": serverUrl,
      "/logout": serverUrl,
      "/auth": serverUrl,
    },
    open: true,
  },
});
