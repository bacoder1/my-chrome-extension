// vite.config.ts
import { defineConfig } from "file:///C:/Users/LENOVO%20LEGION/Desktop/my-chrome-extension/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/LENOVO%20LEGION/Desktop/my-chrome-extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { crx } from "file:///C:/Users/LENOVO%20LEGION/Desktop/my-chrome-extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Colibri",
  version: "1.0.0",
  description: "A Chrome extension built with Vite and React",
  action: {
    default_popup: "index.html",
    default_icon: "logo.png"
  },
  content_scripts: [
    {
      js: ["src/scripts/content.tsx"],
      matches: ["https://*.index-education.net/pronote/eleve.html"]
    }
  ],
  background: {
    service_worker: "service-worker.js"
  },
  web_accessible_resources: [
    {
      resources: ["fonts/fixel/*.ttf"],
      matches: ["<all_urls>"],
      use_dynamic_url: false
    }
  ],
  permissions: [
    "storage",
    "webRequest",
    "webRequestBlocking",
    "host_permissions"
  ],
  host_permissions: ["<all_urls>"]
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [react(), crx({ manifest: manifest_default })]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXExFTk9WTyBMRUdJT05cXFxcRGVza3RvcFxcXFxteS1jaHJvbWUtZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMRU5PVk8gTEVHSU9OXFxcXERlc2t0b3BcXFxcbXktY2hyb21lLWV4dGVuc2lvblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTEVOT1ZPJTIwTEVHSU9OL0Rlc2t0b3AvbXktY2hyb21lLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBjcnggfSBmcm9tIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgbWFuaWZlc3QgZnJvbSBcIi4vbWFuaWZlc3QuanNvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRwbHVnaW5zOiBbcmVhY3QoKSwgY3J4KHsgbWFuaWZlc3QgfSldLFxufSk7XG4iLCAie1xyXG4gIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxyXG4gIFwibmFtZVwiOiBcIkNvbGlicmlcIixcclxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIENocm9tZSBleHRlbnNpb24gYnVpbHQgd2l0aCBWaXRlIGFuZCBSZWFjdFwiLFxyXG4gIFwiYWN0aW9uXCI6IHtcclxuICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcImluZGV4Lmh0bWxcIixcclxuICAgIFwiZGVmYXVsdF9pY29uXCI6IFwibG9nby5wbmdcIlxyXG4gIH0sXHJcbiAgXCJjb250ZW50X3NjcmlwdHNcIjogW1xyXG4gICAge1xyXG4gICAgICBcImpzXCI6IFtcInNyYy9zY3JpcHRzL2NvbnRlbnQudHN4XCJdLFxyXG4gICAgICBcIm1hdGNoZXNcIjogW1wiaHR0cHM6Ly8qLmluZGV4LWVkdWNhdGlvbi5uZXQvcHJvbm90ZS9lbGV2ZS5odG1sXCJdXHJcbiAgICB9XHJcbiAgXSxcclxuICBcImJhY2tncm91bmRcIjoge1xyXG4gICAgXCJzZXJ2aWNlX3dvcmtlclwiOiBcInNlcnZpY2Utd29ya2VyLmpzXCJcclxuICB9LFxyXG4gIFwid2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzXCI6IFtcclxuICAgIHtcclxuICAgICAgXCJyZXNvdXJjZXNcIjogW1wiZm9udHMvZml4ZWwvKi50dGZcIl0sXHJcbiAgICAgIFwibWF0Y2hlc1wiOiBbXCI8YWxsX3VybHM+XCJdLFxyXG4gICAgICBcInVzZV9keW5hbWljX3VybFwiOiBmYWxzZVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXHJcblx0XHRcInN0b3JhZ2VcIixcclxuICAgIFwid2ViUmVxdWVzdFwiLFxyXG4gICAgXCJ3ZWJSZXF1ZXN0QmxvY2tpbmdcIixcclxuICAgIFwiaG9zdF9wZXJtaXNzaW9uc1wiXHJcbiAgXSxcclxuICBcImhvc3RfcGVybWlzc2lvbnNcIjogW1wiPGFsbF91cmxzPlwiXVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1YsU0FBUyxvQkFBb0I7QUFDalgsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsV0FBVzs7O0FDRnBCO0FBQUEsRUFDRSxrQkFBb0I7QUFBQSxFQUNwQixNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxhQUFlO0FBQUEsRUFDZixRQUFVO0FBQUEsSUFDUixlQUFpQjtBQUFBLElBQ2pCLGNBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCO0FBQUEsTUFDRSxJQUFNLENBQUMseUJBQXlCO0FBQUEsTUFDaEMsU0FBVyxDQUFDLGtEQUFrRDtBQUFBLElBQ2hFO0FBQUEsRUFDRjtBQUFBLEVBQ0EsWUFBYztBQUFBLElBQ1osZ0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLDBCQUE0QjtBQUFBLElBQzFCO0FBQUEsTUFDRSxXQUFhLENBQUMsbUJBQW1CO0FBQUEsTUFDakMsU0FBVyxDQUFDLFlBQVk7QUFBQSxNQUN4QixpQkFBbUI7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGFBQWU7QUFBQSxJQUNmO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0Esa0JBQW9CLENBQUMsWUFBWTtBQUNuQzs7O0FEM0JBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLDJCQUFTLENBQUMsQ0FBQztBQUNyQyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
