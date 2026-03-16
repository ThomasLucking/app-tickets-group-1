// backend/src/auth.ts
import { betterAuth } from "better-auth";
import Database from "bun:sqlite";

export const auth = betterAuth({
  baseURL: "http://localhost:3001",
  trustedOrigins: ["http://localhost:5173"],
  database: new Database("./backend/src/data/mydb.sqlite"),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
});