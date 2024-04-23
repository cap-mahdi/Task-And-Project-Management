// vite.config.mts
import { defineConfig } from "file:///C:/Users/Mehdi/Desktop/Task-And-Project-Management/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Mehdi/Desktop/Task-And-Project-Management/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { nxViteTsPaths } from "file:///C:/Users/Mehdi/Desktop/Task-And-Project-Management/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "C:\\Users\\Mehdi\\Desktop\\Task-And-Project-Management\\apps\\ui";
var vite_config_default = defineConfig({
  root: __vite_injected_original_dirname,
  cacheDir: "../../node_modules/.vite/apps/ui",
  server: {
    port: 4200,
    host: "localhost"
  },
  preview: {
    port: 4300,
    host: "localhost"
  },
  plugins: [react(), nxViteTsPaths()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"]
  },
  build: {
    outDir: "../../dist/apps/ui",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTWVoZGlcXFxcRGVza3RvcFxcXFxUYXNrLUFuZC1Qcm9qZWN0LU1hbmFnZW1lbnRcXFxcYXBwc1xcXFx1aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTWVoZGlcXFxcRGVza3RvcFxcXFxUYXNrLUFuZC1Qcm9qZWN0LU1hbmFnZW1lbnRcXFxcYXBwc1xcXFx1aVxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL01laGRpL0Rlc2t0b3AvVGFzay1BbmQtUHJvamVjdC1NYW5hZ2VtZW50L2FwcHMvdWkvdml0ZS5jb25maWcubXRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9J3ZpdGVzdCcgLz5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IG54Vml0ZVRzUGF0aHMgfSBmcm9tICdAbngvdml0ZS9wbHVnaW5zL254LXRzY29uZmlnLXBhdGhzLnBsdWdpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJvb3Q6IF9fZGlybmFtZSxcbiAgY2FjaGVEaXI6ICcuLi8uLi9ub2RlX21vZHVsZXMvLnZpdGUvYXBwcy91aScsXG5cbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNDIwMCxcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgfSxcblxuICBwcmV2aWV3OiB7XG4gICAgcG9ydDogNDMwMCxcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgfSxcblxuICBwbHVnaW5zOiBbcmVhY3QoKSwgbnhWaXRlVHNQYXRocygpXSxcblxuICAvLyBVbmNvbW1lbnQgdGhpcyBpZiB5b3UgYXJlIHVzaW5nIHdvcmtlcnMuXG4gIC8vIHdvcmtlcjoge1xuICAvLyAgcGx1Z2luczogWyBueFZpdGVUc1BhdGhzKCkgXSxcbiAgLy8gfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogWydAZW1vdGlvbi9yZWFjdCcsICdAZW1vdGlvbi9zdHlsZWQnLCAnQG11aS9tYXRlcmlhbC9Ub29sdGlwJ10sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnLi4vLi4vZGlzdC9hcHBzL3VpJyxcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcbiAgICBjb21tb25qc09wdGlvbnM6IHtcbiAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxxQkFBcUI7QUFIOUIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLEVBRVYsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFFQSxTQUFTLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNbEMsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGtCQUFrQixtQkFBbUIsdUJBQXVCO0FBQUEsRUFDeEU7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLHNCQUFzQjtBQUFBLElBQ3RCLGlCQUFpQjtBQUFBLE1BQ2YseUJBQXlCO0FBQUEsSUFDM0I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
