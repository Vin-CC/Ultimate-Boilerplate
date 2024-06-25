"use client";
import { createI18nClient } from "next-international/client";

// https://next-international.vercel.app/
export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  fr: () => import("./fr"),
});
