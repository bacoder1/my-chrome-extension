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
      matches: ["https://*.index-education.net/pronote/*"]
    }
  ],
  background: {
    service_worker: "background.js"
  },
  web_accessible_resources: [
    {
      resources: ["fonts/fixel/*.ttf"],
      matches: ["<all_urls>"],
      use_dynamic_url: false
    },
    {
      resources: ["intercept.js"],
      matches: ["https://3310001c.index-education.net/*"]
    }
  ],
  permissions: [
    "debugger",
    "storage",
    "unlimitedStorage",
    "webRequest"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXExFTk9WTyBMRUdJT05cXFxcRGVza3RvcFxcXFxteS1jaHJvbWUtZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMRU5PVk8gTEVHSU9OXFxcXERlc2t0b3BcXFxcbXktY2hyb21lLWV4dGVuc2lvblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTEVOT1ZPJTIwTEVHSU9OL0Rlc2t0b3AvbXktY2hyb21lLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBjcnggfSBmcm9tIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgbWFuaWZlc3QgZnJvbSBcIi4vbWFuaWZlc3QuanNvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRwbHVnaW5zOiBbcmVhY3QoKSwgY3J4KHsgbWFuaWZlc3QgfSldLFxufSk7XG4iLCAie1xyXG4gIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxyXG4gIFwibmFtZVwiOiBcIkNvbGlicmlcIixcclxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIENocm9tZSBleHRlbnNpb24gYnVpbHQgd2l0aCBWaXRlIGFuZCBSZWFjdFwiLFxyXG4gIFwiYWN0aW9uXCI6IHtcclxuICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcImluZGV4Lmh0bWxcIixcclxuICAgIFwiZGVmYXVsdF9pY29uXCI6IFwibG9nby5wbmdcIlxyXG4gIH0sXHJcbiAgXCJjb250ZW50X3NjcmlwdHNcIjogW1xyXG4gICAge1xyXG4gICAgICBcImpzXCI6IFtcInNyYy9zY3JpcHRzL2NvbnRlbnQudHN4XCJdLFxyXG4gICAgICBcIm1hdGNoZXNcIjogW1wiaHR0cHM6Ly8qLmluZGV4LWVkdWNhdGlvbi5uZXQvcHJvbm90ZS8qXCJdXHJcbiAgICB9XHJcbiAgXSxcclxuICBcImJhY2tncm91bmRcIjoge1xyXG4gICAgXCJzZXJ2aWNlX3dvcmtlclwiOiBcImJhY2tncm91bmQuanNcIlxyXG4gIH0sXHJcbiAgXCJ3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXNcIjogW1xyXG4gICAge1xyXG4gICAgICBcInJlc291cmNlc1wiOiBbXCJmb250cy9maXhlbC8qLnR0ZlwiXSxcclxuICAgICAgXCJtYXRjaGVzXCI6IFtcIjxhbGxfdXJscz5cIl0sXHJcbiAgICAgIFwidXNlX2R5bmFtaWNfdXJsXCI6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcInJlc291cmNlc1wiOiBbXCJpbnRlcmNlcHQuanNcIl0sXHJcbiAgICAgIFwibWF0Y2hlc1wiOiBbXCJodHRwczovLzMzMTAwMDFjLmluZGV4LWVkdWNhdGlvbi5uZXQvKlwiXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXHJcbiAgICBcImRlYnVnZ2VyXCIsXHJcbiAgICBcInN0b3JhZ2VcIixcclxuICAgIFwidW5saW1pdGVkU3RvcmFnZVwiLFxyXG4gICAgXCJ3ZWJSZXF1ZXN0XCJcclxuICBdLFxyXG4gIFwiaG9zdF9wZXJtaXNzaW9uc1wiOiBbXCI8YWxsX3VybHM+XCJdXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVixTQUFTLG9CQUFvQjtBQUNqWCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxXQUFXOzs7QUNGcEI7QUFBQSxFQUNFLGtCQUFvQjtBQUFBLEVBQ3BCLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLGFBQWU7QUFBQSxFQUNmLFFBQVU7QUFBQSxJQUNSLGVBQWlCO0FBQUEsSUFDakIsY0FBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakI7QUFBQSxNQUNFLElBQU0sQ0FBQyx5QkFBeUI7QUFBQSxNQUNoQyxTQUFXLENBQUMseUNBQXlDO0FBQUEsSUFDdkQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDWixnQkFBa0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsMEJBQTRCO0FBQUEsSUFDMUI7QUFBQSxNQUNFLFdBQWEsQ0FBQyxtQkFBbUI7QUFBQSxNQUNqQyxTQUFXLENBQUMsWUFBWTtBQUFBLE1BQ3hCLGlCQUFtQjtBQUFBLElBQ3JCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsV0FBYSxDQUFDLGNBQWM7QUFBQSxNQUM1QixTQUFXLENBQUMsd0NBQXdDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxhQUFlO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGtCQUFvQixDQUFDLFlBQVk7QUFDbkM7OztBRC9CQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSwyQkFBUyxDQUFDLENBQUM7QUFDckMsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
