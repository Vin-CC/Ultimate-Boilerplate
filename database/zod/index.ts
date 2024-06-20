import { z } from "zod";
import * as PrismaClient from "@prisma/client";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

// PRISMA GENERATED ENUMS
//------------------------------------------------------

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel);

export const AccountScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.AccountScalarFieldEnum);

export const UserVerificationTokenScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserVerificationTokenScalarFieldEnum);

export const SessionScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.SessionScalarFieldEnum);

export const UserOneTimePasswordScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserOneTimePasswordScalarFieldEnum);

export const UserScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserScalarFieldEnum);

export const VerificationTokenScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.VerificationTokenScalarFieldEnum);

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

// ACCOUNT
//------------------------------------------------------

export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  providerType: z.string(),
  providerId: z.string(),
  providerAccountId: z.string(),
  refreshToken: z.string().nullish(),
  accessToken: z.string().nullish(),
  accessTokenExpires: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// USER VERIFICATION TOKEN
//------------------------------------------------------

export const UserVerificationTokenSchema = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  expires: z.date(),
  createdAt: z.date(),
});

// SESSION
//------------------------------------------------------

export const SessionSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
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

// USER
//------------------------------------------------------

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string(),
  name: z.string().nullish(),
  surname: z.string().nullish(),
  username: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  emailVerificationToken: z.string().nullish(),
  passwordHash: z.string().nullish(),
  resetPasswordToken: z.string().nullish(),
  resetPasswordTokenExpiry: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
});

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
