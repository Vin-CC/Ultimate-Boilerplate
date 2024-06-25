import { createI18nServer } from "next-international/server";

// https://next-international.vercel.app/
export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  fr: () => import("./fr"),
});
