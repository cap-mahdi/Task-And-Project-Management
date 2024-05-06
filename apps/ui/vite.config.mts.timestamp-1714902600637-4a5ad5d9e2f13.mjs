// apps/ui/vite.config.mts
import { defineConfig } from "file:///C:/Users/ASUS/Desktop/web-proj/Task-And-Project-Management/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ASUS/Desktop/web-proj/Task-And-Project-Management/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { nxViteTsPaths } from "file:///C:/Users/ASUS/Desktop/web-proj/Task-And-Project-Management/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "c:\\Users\\ASUS\\Desktop\\web-proj\\Task-And-Project-Management\\apps\\ui";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXBwcy91aS92aXRlLmNvbmZpZy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJjOlxcXFxVc2Vyc1xcXFxBU1VTXFxcXERlc2t0b3BcXFxcd2ViLXByb2pcXFxcVGFzay1BbmQtUHJvamVjdC1NYW5hZ2VtZW50XFxcXGFwcHNcXFxcdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcImM6XFxcXFVzZXJzXFxcXEFTVVNcXFxcRGVza3RvcFxcXFx3ZWItcHJvalxcXFxUYXNrLUFuZC1Qcm9qZWN0LU1hbmFnZW1lbnRcXFxcYXBwc1xcXFx1aVxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2M6L1VzZXJzL0FTVVMvRGVza3RvcC93ZWItcHJvai9UYXNrLUFuZC1Qcm9qZWN0LU1hbmFnZW1lbnQvYXBwcy91aS92aXRlLmNvbmZpZy5tdHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz0ndml0ZXN0JyAvPlxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHsgbnhWaXRlVHNQYXRocyB9IGZyb20gJ0BueC92aXRlL3BsdWdpbnMvbngtdHNjb25maWctcGF0aHMucGx1Z2luJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcm9vdDogX19kaXJuYW1lLFxyXG4gIGNhY2hlRGlyOiAnLi4vLi4vbm9kZV9tb2R1bGVzLy52aXRlL2FwcHMvdWknLFxyXG5cclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDQyMDAsXHJcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcclxuICB9LFxyXG5cclxuICBwcmV2aWV3OiB7XHJcbiAgICBwb3J0OiA0MzAwLFxyXG4gICAgaG9zdDogJ2xvY2FsaG9zdCcsXHJcbiAgfSxcclxuXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3Qoe1xyXG4gICAgICBqc3hJbXBvcnRTb3VyY2U6ICdAZW1vdGlvbi9yZWFjdCcsXHJcbiAgICAgIGJhYmVsOiB7XHJcbiAgICAgICAgcGx1Z2luczogWydAZW1vdGlvbi9iYWJlbC1wbHVnaW4nXSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gICAgLFxyXG4gICAgbnhWaXRlVHNQYXRocygpLFxyXG4gIF0sXHJcblxyXG4gIC8vIFVuY29tbWVudCB0aGlzIGlmIHlvdSBhcmUgdXNpbmcgd29ya2Vycy5cclxuICAvLyB3b3JrZXI6IHtcclxuICAvLyAgcGx1Z2luczogWyBueFZpdGVUc1BhdGhzKCkgXSxcclxuICAvLyB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG5cclxuXHJcbiAgICBpbmNsdWRlOiBbXHJcbiAgICAgICdAZW1vdGlvbi9yZWFjdCcsXHJcbiAgICAgICdAZW1vdGlvbi9zdHlsZWQnLFxyXG4gICAgICAnQG11aS9tYXRlcmlhbC9Ub29sdGlwJ1xyXG4gICAgXSxcclxuXHJcblxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJy4uLy4uL2Rpc3QvYXBwcy91aScsXHJcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcclxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xyXG4gICAgICB0cmFuc2Zvcm1NaXhlZEVzTW9kdWxlczogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxxQkFBcUI7QUFIOUIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLEVBRVYsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixpQkFBaUI7QUFBQSxNQUNqQixPQUFPO0FBQUEsUUFDTCxTQUFTLENBQUMsdUJBQXVCO0FBQUEsTUFDbkM7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNEO0FBQUEsSUFDQSxjQUFjO0FBQUEsRUFDaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTUEsY0FBYztBQUFBLElBR1osU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUdGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixzQkFBc0I7QUFBQSxJQUN0QixpQkFBaUI7QUFBQSxNQUNmLHlCQUF5QjtBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
