import { z } from "zod";
import * as PrismaClient from "@prisma/client";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// PRISMA GENERATED ENUMS
//------------------------------------------------------

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel);

export const UserScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserScalarFieldEnum);

export const AccountScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.AccountScalarFieldEnum);

export const SessionScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SessionScalarFieldEnum);

export const VerificationTokenScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.VerificationTokenScalarFieldEnum);

export const AuthenticatorScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.AuthenticatorScalarFieldEnum);

export const UserOneTimePasswordScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserOneTimePasswordScalarFieldEnum);

export const SortOrderSchema = z.nativeEnum(PrismaClient.Prisma.SortOrder);

export const QueryModeSchema = z.nativeEnum(PrismaClient.Prisma.QueryMode);

export const NullsOrderSchema = z.nativeEnum(PrismaClient.Prisma.NullsOrder);

// CUSTOM ENUMS
//------------------------------------------------------

export const RoleSchema = z.nativeEnum(PrismaClient.Role);

export const UserOneTimePasswordTypeSchema = z.nativeEnum(PrismaClient.UserOneTimePasswordType);

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string(),
  name: z.string().nullish(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  passwordHash: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ACCOUNT
//------------------------------------------------------

export const AccountSchema = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// SESSION
//------------------------------------------------------

export const SessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
  userId: z.string().nullish(),
  createdAt: z.date(),
});

// AUTHENTICATOR
//------------------------------------------------------

export const AuthenticatorSchema = z.object({
  credentialID: z.string(),
  userId: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().nullish(),
});

// USER ONE TIME PASSWORD
//------------------------------------------------------

export const UserOneTimePasswordSchema = z.object({
  type: UserOneTimePasswordTypeSchema,
  id: z.string(),
  userId: z.string(),
  code: z.string(),
  identifier: z.string(),
  expires: z.date(),
  createdAt: z.date(),
});
