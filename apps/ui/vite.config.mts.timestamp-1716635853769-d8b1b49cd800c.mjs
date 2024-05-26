// apps/ui/vite.config.mts
import { defineConfig } from "file:///D:/HOUSSEM/2023-2024/semestre_2/projet%20web/Task-And-Project-Management/node_modules/vite/dist/node/index.js";
import react from "file:///D:/HOUSSEM/2023-2024/semestre_2/projet%20web/Task-And-Project-Management/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { nxViteTsPaths } from "file:///D:/HOUSSEM/2023-2024/semestre_2/projet%20web/Task-And-Project-Management/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "d:\\HOUSSEM\\2023-2024\\semestre_2\\projet web\\Task-And-Project-Management\\apps\\ui";
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
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"]
      }
    }),
    ,
    nxViteTsPaths()
  ],
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXBwcy91aS92aXRlLmNvbmZpZy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJkOlxcXFxIT1VTU0VNXFxcXDIwMjMtMjAyNFxcXFxzZW1lc3RyZV8yXFxcXHByb2pldCB3ZWJcXFxcVGFzay1BbmQtUHJvamVjdC1NYW5hZ2VtZW50XFxcXGFwcHNcXFxcdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcImQ6XFxcXEhPVVNTRU1cXFxcMjAyMy0yMDI0XFxcXHNlbWVzdHJlXzJcXFxccHJvamV0IHdlYlxcXFxUYXNrLUFuZC1Qcm9qZWN0LU1hbmFnZW1lbnRcXFxcYXBwc1xcXFx1aVxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2Q6L0hPVVNTRU0vMjAyMy0yMDI0L3NlbWVzdHJlXzIvcHJvamV0JTIwd2ViL1Rhc2stQW5kLVByb2plY3QtTWFuYWdlbWVudC9hcHBzL3VpL3ZpdGUuY29uZmlnLm10c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPSd2aXRlc3QnIC8+XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgeyBueFZpdGVUc1BhdGhzIH0gZnJvbSAnQG54L3ZpdGUvcGx1Z2lucy9ueC10c2NvbmZpZy1wYXRocy5wbHVnaW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByb290OiBfX2Rpcm5hbWUsXHJcbiAgY2FjaGVEaXI6ICcuLi8uLi9ub2RlX21vZHVsZXMvLnZpdGUvYXBwcy91aScsXHJcblxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogNDIwMCxcclxuICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxyXG4gIH0sXHJcblxyXG4gIHByZXZpZXc6IHtcclxuICAgIHBvcnQ6IDQzMDAsXHJcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcclxuICB9LFxyXG5cclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCh7XHJcbiAgICAgIGpzeEltcG9ydFNvdXJjZTogJ0BlbW90aW9uL3JlYWN0JyxcclxuICAgICAgYmFiZWw6IHtcclxuICAgICAgICBwbHVnaW5zOiBbJ0BlbW90aW9uL2JhYmVsLXBsdWdpbiddLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgICAsXHJcbiAgICBueFZpdGVUc1BhdGhzKCksXHJcbiAgXSxcclxuXHJcbiAgLy8gVW5jb21tZW50IHRoaXMgaWYgeW91IGFyZSB1c2luZyB3b3JrZXJzLlxyXG4gIC8vIHdvcmtlcjoge1xyXG4gIC8vICBwbHVnaW5zOiBbIG54Vml0ZVRzUGF0aHMoKSBdLFxyXG4gIC8vIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcblxyXG5cclxuICAgIGluY2x1ZGU6IFtcclxuICAgICAgJ0BlbW90aW9uL3JlYWN0JyxcclxuICAgICAgJ0BlbW90aW9uL3N0eWxlZCcsXHJcbiAgICAgICdAbXVpL21hdGVyaWFsL1Rvb2x0aXAnXHJcbiAgICBdLFxyXG5cclxuXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiAnLi4vLi4vZGlzdC9hcHBzL3VpJyxcclxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiB0cnVlLFxyXG4gICAgY29tbW9uanNPcHRpb25zOiB7XHJcbiAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixTQUFTLHFCQUFxQjtBQUg5QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFFVixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLGlCQUFpQjtBQUFBLE1BQ2pCLE9BQU87QUFBQSxRQUNMLFNBQVMsQ0FBQyx1QkFBdUI7QUFBQSxNQUNuQztBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0Q7QUFBQSxJQUNBLGNBQWM7QUFBQSxFQUNoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNQSxjQUFjO0FBQUEsSUFHWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBR0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLHNCQUFzQjtBQUFBLElBQ3RCLGlCQUFpQjtBQUFBLE1BQ2YseUJBQXlCO0FBQUEsSUFDM0I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
