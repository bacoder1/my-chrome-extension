import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

export default defineConfig({
	plugins: [react(), crx({ manifest })],
	build: {
    rollupOptions: {
      input: {
        web: 'index.html', // 👈 this is the one for Vercel
        // popup: 'public/popup.html' // optional: for extension build
      }
    }
  }
});
