import { getUserByEmail } from "@/lib/actions/user";
import { db } from "@/lib/db";
import { sendTransactionalEmail } from "@/lib/loops";
import { passwordAuthSchema } from "@/lib/zod-schemas";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/signin",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
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
    EmailProvider({
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
    }),
  ],
};

export default NextAuth(authOptions);
