import { auth } from "./auth";
import { authRoutes } from "./routes/auth.routes";
import { ticketRoutes } from "./routes/tickets.route";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

const _server = Bun.serve({
  port: 3001,
  routes: {
    ...ticketRoutes,
    ...authRoutes,
  },
  async fetch(req) {
    const url = new URL(req.url);

    // Handle preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname.startsWith("/api/auth")) {
      const response = await auth.handler(req);
      // 👇 inject CORS headers into better-auth's responses
      const newResponse = new Response(response.body, response);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        newResponse.headers.set(key, value);
      });
      return newResponse;
    }

    return new Response("Not found", { status: 404 });
  },
});