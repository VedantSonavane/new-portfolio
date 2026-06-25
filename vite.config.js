import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port:  2611, // ✅ 4-digit port
    strictPort: true, // optional: fails if port is busy
  },
});
