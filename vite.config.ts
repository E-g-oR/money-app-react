import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import {vanillaExtractPlugin} from "@vanilla-extract/vite-plugin";
import viteSvgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@icons": path.resolve(__dirname, "./src/icons"),
    }
  },
  plugins: [react(), vanillaExtractPlugin(), viteSvgr()],
})
