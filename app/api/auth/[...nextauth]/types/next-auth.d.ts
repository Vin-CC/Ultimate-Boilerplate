import "next-auth";
import { DefaultSession } from "next-auth";

// https://next-auth.js.org/getting-started/typescript
declare module "next-auth" {
  interface Session {
    user: {
      // error?: string;
    } & DefaultSession["user"];
  }
}
