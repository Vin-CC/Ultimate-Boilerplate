import { getUserByEmail, getUserById } from "@/lib/actions/user";
import { sendTransactionalEmail } from "@/lib/loops";
import { passwordAuthSchema } from "@/lib/zod-schemas";
import bcryptjs from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { FakeAdapter } from "./fake-adaptater";

// Why the auth options is created without PrismaAdapter and JWT strategy ? See 👉️ https://authjs.dev/guides/edge-compatibility
export default {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user.id) {
        return false;
      }

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const validatedCredentials =
          passwordAuthSchema.safeParse(rawCredentials);

        if (validatedCredentials.success) {
          const user = await getUserByEmail(validatedCredentials.data.email);
          if (!user || !user.passwordHash) {
            throw new Error("credentials_signin");
          }

          if (!user.emailVerified) {
            throw new Error("email_not_verified");
          }

          const passwordIsValid = await bcryptjs.compare(
            validatedCredentials.data.password,
            user.passwordHash
          );

          if (passwordIsValid) return user;
        }
        throw new Error("credentials_signin");
      },
    }),
    {
      id: "email",
      type: "email",
      from: "email",
      server: {},
      maxAge: 24 * 60 * 60,
      name: "Email",
      options: {},
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await sendTransactionalEmail({
          transactionalId: process.env.MAGIC_LINK_TRANSACTIONAL_ID!,
          email,
          dataVariables: {
            redirect_url: url,
            product_name: process.env.NEXT_PUBLIC_PRODUCT_NAME!,
          },
        });
      },
    },
  ],
  adapter: FakeAdapter,
} satisfies NextAuthConfig;
