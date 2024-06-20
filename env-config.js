// Ce fichier est uniquement utile pour vérifier si les variables d'environnement sont correctement définies lors du build (donc en production et éviter de faire une big erreur). Il n'est pas nécessaire de le modifier SAUF si vous avez besoin de définir des variables d'environnement supplémentaires.

const { z } = require("zod");

const envSchema = z.object({
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  POSTGRES_URL_NON_POOLING: z.string(),
  POSTGRES_PRISMA_URL: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),
  LOOPS_API_KEY: z.string(),
  NEXT_PUBLIC_PRODUCT_NAME: z.string(),
  EMAIL_SECRET_KEY: z.string(),
  SIGNUP_EMAIL_TRANSACTIONAL_ID: z.string(),
  SIGNIN_EMAIL_TRANSACTIONAL_ID: z.string(),
  RESET_PASSWORD_EMAIL_TRANSACTIONAL_ID: z.string(),
  MAGIC_LINK_TRANSACTIONAL_ID: z.string()
});

function validateEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("Invalid environment variables:", result.error.errors);
    process.exit(1);
  }
}

module.exports = validateEnv;
