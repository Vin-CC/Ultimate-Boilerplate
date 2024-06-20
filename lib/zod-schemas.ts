import { z } from "zod";

export const password = z
  .string()
  .min(8, "min_8_characters")
  .max(40, "max_40_characters")
  .refine((password) => /[^A-Za-z0-9]/.test(password), {
    message: "need_special_character",
  });

export const passwordAuthSchema = z.object({
  email: z.string().email(),
  password,
});
