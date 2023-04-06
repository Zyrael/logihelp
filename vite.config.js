import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";

dotenv.config();

const serverUrl = `http://localhost:${process.env.PORT}`;
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/graphql": serverUrl,
      "/login": serverUrl,
      "/auth": serverUrl,
    },
  },
});
