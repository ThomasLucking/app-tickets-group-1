// backend/src/controllers/auth.controller.ts
import { corsHeaders } from "backend/utils/headers";
import { auth } from "../auth";

export const postRegister = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Name, email and password are required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    return new Response(
      JSON.stringify({
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      }),
      { status: 201, headers: corsHeaders }
    );
  } catch (e) {
    console.error("Register error", e);
    return new Response(
      JSON.stringify({ error: "Registration failed" }),
      { status: 400, headers: corsHeaders }
    );
  }
};

export const postLogin = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await auth.api.signInEmail({
      body: { email, password },
    });

    return new Response(
      JSON.stringify({
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        token: result.token,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (e) {
    console.error("Login error", e);
    return new Response(
      JSON.stringify({ error: "Invalid email or password" }),
      { status: 401, headers: corsHeaders }
    );
  }
};