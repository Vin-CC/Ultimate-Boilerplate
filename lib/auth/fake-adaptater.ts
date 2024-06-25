import { VerificationToken } from "@prisma/client";
import { NextAuthConfig } from "next-auth";

// Here to avoid this error (due to edge) 👇️
/**
    [auth][error] MissingAdapterMethods: Required adapter methods were missing: useVerificationToken, getUserByEmail. Read more at https://errors.authjs.dev#missingadaptermethods
    at assertConfig (webpack-internal:///(middleware)/./node_modules/.pnpm/@auth+core@0.32.0/node_modules/@auth/core/lib/utils/assert.js:165:20)
    at Auth (webpack-internal:///(middleware)/./node_modules/.pnpm/@auth+core@0.32.0/node_modules/@auth/core/index.js:88:95)
*/

export const FakeAdapter: NextAuthConfig["adapter"] = {
  createVerificationToken: (verificationToken: VerificationToken) => undefined,
  useVerificationToken: (params: { identifier: string; token: string }) => null,
  getUserByEmail: (email: string) => null,
};
