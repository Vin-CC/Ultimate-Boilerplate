import NextAuth from "next-auth";
import { createI18nMiddleware } from "next-international/middleware";
import authConfig from "./lib/auth/auth.config";

const { auth } = NextAuth(authConfig);

const i18nMiddleware = createI18nMiddleware({
  locales: ["fr"],
  defaultLocale: "fr",
});

export default auth((req) => {
  return i18nMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
