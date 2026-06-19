import { serve } from "bun";
import index from "./index.html";

const port = Number(process.env.PORT ?? 3006);
const apiPort =
  process.env.BUN_PUBLIC_SERVER_API_PORT ??
  process.env.BUN_PUBLIC_API_PORT ??
  "3001";
const apiHost = process.env.BUN_PUBLIC_API_HOST ?? "localhost";
const apiUrl =
  process.env.BUN_PUBLIC_API_URL ?? `http://${apiHost}:${apiPort}`;

const server = serve({
  routes: {
    "/env.json": () =>
      Response.json({
        apiUrl,
        apiHost,
        apiPort,
      }),
    // Serve index.html for all unmatched routes.
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
  port,
});

console.log(`🚀 Server running at ${server.url}`);
