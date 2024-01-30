import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), reactRefresh()],

  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    chunkSizeWarningLimit: 5000, // Set the limit to an appropriate value
  },
  base: "/AlumniAdmin/",
});
