// apps/ui/vite.config.mts
import { defineConfig } from "file:///D:/HOUSSEM/2023-2024/semestre_2/projet%20web/Task-And-Project-Management/node_modules/vite/dist/node/index.js";
import react from "file:///D:/HOUSSEM/2023-2024/semestre_2/projet%20web/Task-And-Project-Management/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { nxViteTsPaths } from "file:///D:/HOUSSEM/2023-2024/semestre_2/projet%20web/Task-And-Project-Management/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "D:\\HOUSSEM\\2023-2024\\semestre_2\\projet web\\Task-And-Project-Management\\apps\\ui";
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
    include: [
      "@emotion/react",
      "@emotion/styled",
      "@mui/material/Tooltip"
    ]
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXBwcy91aS92aXRlLmNvbmZpZy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxIT1VTU0VNXFxcXDIwMjMtMjAyNFxcXFxzZW1lc3RyZV8yXFxcXHByb2pldCB3ZWJcXFxcVGFzay1BbmQtUHJvamVjdC1NYW5hZ2VtZW50XFxcXGFwcHNcXFxcdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEhPVVNTRU1cXFxcMjAyMy0yMDI0XFxcXHNlbWVzdHJlXzJcXFxccHJvamV0IHdlYlxcXFxUYXNrLUFuZC1Qcm9qZWN0LU1hbmFnZW1lbnRcXFxcYXBwc1xcXFx1aVxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0hPVVNTRU0vMjAyMy0yMDI0L3NlbWVzdHJlXzIvcHJvamV0JTIwd2ViL1Rhc2stQW5kLVByb2plY3QtTWFuYWdlbWVudC9hcHBzL3VpL3ZpdGUuY29uZmlnLm10c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPSd2aXRlc3QnIC8+XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgeyBueFZpdGVUc1BhdGhzIH0gZnJvbSAnQG54L3ZpdGUvcGx1Z2lucy9ueC10c2NvbmZpZy1wYXRocy5wbHVnaW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByb290OiBfX2Rpcm5hbWUsXHJcbiAgY2FjaGVEaXI6ICcuLi8uLi9ub2RlX21vZHVsZXMvLnZpdGUvYXBwcy91aScsXHJcblxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogNDIwMCxcclxuICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxyXG4gIH0sXHJcblxyXG4gIHByZXZpZXc6IHtcclxuICAgIHBvcnQ6IDQzMDAsXHJcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcclxuICB9LFxyXG5cclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgbnhWaXRlVHNQYXRocygpXSxcclxuXHJcbiAgLy8gVW5jb21tZW50IHRoaXMgaWYgeW91IGFyZSB1c2luZyB3b3JrZXJzLlxyXG4gIC8vIHdvcmtlcjoge1xyXG4gIC8vICBwbHVnaW5zOiBbIG54Vml0ZVRzUGF0aHMoKSBdLFxyXG4gIC8vIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbXHJcbiAgICAgICdAZW1vdGlvbi9yZWFjdCcsXHJcbiAgICAgICdAZW1vdGlvbi9zdHlsZWQnLFxyXG4gICAgICAnQG11aS9tYXRlcmlhbC9Ub29sdGlwJ1xyXG4gICAgXSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6ICcuLi8uLi9kaXN0L2FwcHMvdWknLFxyXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IHRydWUsXHJcbiAgICBjb21tb25qc09wdGlvbnM6IHtcclxuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBSDlCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFVBQVU7QUFBQSxFQUVWLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBRUEsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTWxDLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1Isc0JBQXNCO0FBQUEsSUFDdEIsaUJBQWlCO0FBQUEsTUFDZix5QkFBeUI7QUFBQSxJQUMzQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
