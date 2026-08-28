import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/plagiarism-scan": {
        target: "https://preface-wildness-elves.ngrok-free.dev",
        changeOrigin: true,
        rewrite: () => "/webhook-test/plagiarism-scan",
      },
    },
  },
});
