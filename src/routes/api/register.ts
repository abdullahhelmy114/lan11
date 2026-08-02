import { createFileRoute } from "@tanstack/react-router";
import { Route as PublicRegisterRoute } from "./public/register";

// Alias kept for older clients/bundles that still POST to /api/register.
export const Route = createFileRoute("/api/register")({
  server: {
    handlers: {
      POST: async (ctx) => {
        const handlers = (PublicRegisterRoute.options as any).server.handlers;
        return handlers.POST(ctx);
      },
    },
  },
});
