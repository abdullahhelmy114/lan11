import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Vite config override for self-hosting (Coolify / Docker / Node.js).
// Uses the Node.js server preset instead of the Cloudflare Workers preset
// and keeps the output paths aligned with package.json's "start" script.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "node-server",
    output: {
      dir: "dist",
      serverDir: "dist/server",
      publicDir: "dist/client",
    },
  },
});
