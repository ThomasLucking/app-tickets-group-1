// backend/src/routes/auth.routes.ts
import { corsHeaders } from "backend/utils/headers";
import { postRegister, postLogin } from "backend/src/controllers/auth.controller.ts";

export const authRoutes = {
  "/api/auth/register": {
    OPTIONS: (_req: Request) =>
      new Response(null, { headers: corsHeaders, status: 204 }),
    POST: postRegister,
  },
  "/api/auth/login": {
    OPTIONS: (_req: Request) =>
      new Response(null, { headers: corsHeaders, status: 204 }),
    POST: postLogin,
  },
};