"use server";

import { Prisma, Role, UserOneTimePasswordType } from "@prisma/client";
import { randomInt } from "crypto";
import moment from "moment";
import { z } from "zod";
import { db } from "../db";
import { sendTransactionalEmail } from "../loops";
import { passwordAuthSchema } from "../zod-schemas";
import { ActionError } from "./error";
import { hashPassword, isWithinExpirationDate } from "./server-utils";
const jwt = require("jsonwebtoken");

export const generateOneTimePassword = async ({
  userId,
  type,
  identifier,
  expireDuration = 1000 * 60 * 60 * 2,
}: {
  userId: string;
  type: UserOneTimePasswordType;
  identifier: string;
  expireDuration?: number;
}) => {
  const storedUserTokens = await db.userOneTimePassword.findMany({
    where: {
      userId,
    },
  });

  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token: any) => {
      const tokenExpirationDate = new Date(Number(token.expires));
      const expireDuration = 3600 * 1000; // 1 heure en millisecondes

      return isWithinExpirationDate(tokenExpirationDate, expireDuration);
    });
    if (reusableStoredToken) {
      return reusableStoredToken.code;
    }
  }

  const otp = await randomInt(100000, 999999).toString();

  await db.userOneTimePassword.create({
    data: {
      code: otp,
      type,
      identifier,
      expires: new Date(new Date().getTime() + expireDuration),
      userId,
    },
  });

  return otp;
};

export const generateVerificationToken = async ({
  userId,
  expireDuration = 1000 * 60 * 60 * 2,
}: {
  userId: string;
  expireDuration?: number;
}) => {
  const storedUserTokens = await db.userVerificationToken.findMany({
    where: {
      userId,
    },
  });

  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      const tokenExpirationDate = new Date(Number(token.expires));
      const expireDuration = 3600 * 1000; // 1 heure en millisecondes

      return isWithinExpirationDate(tokenExpirationDate, expireDuration);
    });
    if (reusableStoredToken) {
      return reusableStoredToken.token;
    }
  }

  const token = jwt.sign(
    {
      userId,
    },
    process.env.EMAIL_SECRET_KEY as string,
    {
      expiresIn: "1h",
    }
  );

  await db.userVerificationToken.create({
    data: {
      token,
      expires: new Date(new Date().getTime() + expireDuration),
      userId,
    },
  });

  return token;
};

export async function signUpWithPassword({
  password,
  email,
  callbackUrl,
}: z.infer<typeof passwordAuthSchema> & { callbackUrl: string }) {
  try {
    const passwordHash = await hashPassword(password);
    const user = await db.user.create({
      data: {
        email,
        role: Role.USER,
        passwordHash,
      },
    });

    // Jeton de vérification pour vérifier l'email de l'utilisateur
    const token = await generateVerificationToken({
      userId: user.id,
    });

    // OTP Password (Ex: 284590)
    const otp = await generateOneTimePassword({
      userId: user.id,
      type: "SIGNUP",
      identifier: email,
    });

    const url = new URL(process.env.NEXT_PUBLIC_BASE_URL + callbackUrl);
    url.searchParams.set("token", token);
    url.searchParams.set("type", "SIGNUP");
    url.searchParams.set("identifier", email);

    await sendTransactionalEmail({
      transactionalId: process.env.SIGNUP_EMAIL_TRANSACTIONAL_ID!,
      email,
      dataVariables: {
        redirect_url: url.toString(),
        otp_code: otp,
        product_name: process.env.NEXT_PUBLIC_PRODUCT_NAME!,
      },
    });
  } catch (error) {
    console.error(error);

    // Vérifier si l'erreur est une violation de contrainte d'unicité sur l'email
    // Prisma doc : https://www.prisma.io/docs/orm/reference/error-reference#error-codes
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new ActionError("user_already_exist");
      }
    }

    throw new ActionError("something_went_wrong");
  }
}

export async function resendVerificationEmail({
  email,
  type,
}: {
  email: string;
  type: string;
}) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new ActionError("user_not_found");
  }
  const latestOTP = await db.userOneTimePassword.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      expires: "desc",
    },
  });
  if (!latestOTP || latestOTP.type !== type) {
    throw new ActionError("otp_not_found");
  }
  if (moment().subtract(2, "minutes").isBefore(moment(latestOTP.createdAt))) {
    throw new ActionError("ost_not_expired");
  }

  await db.userOneTimePassword.deleteMany({
    where: {
      userId: user.id,
      type,
    },
  });
  await db.userVerificationToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  // Jeton de vérification pour vérifier l'email de l'utilisateur
  const token = await generateVerificationToken({
    userId: user.id,
  });

  // OTP Password (Ex: 284590)
  const otp = await generateOneTimePassword({
    userId: user.id,
    type: "SIGNUP",
    identifier: email,
  });

  const url = new URL(process.env.NEXT_PUBLIC_BASE_URL + "/otp");
  url.searchParams.set("token", token);

  await sendTransactionalEmail({
    transactionalId: process.env.SIGNUP_EMAIL_TRANSACTIONAL_ID!,
    email,
    dataVariables: {
      redirect_url: url.toString(),
      otp_code: otp,
      product_name: process.env.NEXT_PUBLIC_PRODUCT_NAME!,
    },
  });
}

export async function verifyOtp({
  otp,
  identifier,
  type,
}: {
  otp: string;
  identifier: string;
  type: string;
}) {
  const user = await db.user.findUnique({
    where: {
      email: identifier,
    },
  });
  if (!user) {
    throw new ActionError("user_not_found");
  }
  const latestOTP = await db.userOneTimePassword.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      expires: "desc",
    },
  });
  if (!latestOTP || latestOTP.type !== type) {
    throw new ActionError("otp_not_found");
  }
  if (latestOTP.code !== otp) {
    throw new ActionError("otp_invalid");
  }
  if (moment().isAfter(moment(latestOTP.expires))) {
    throw new ActionError("otp_expired");
  }
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: moment().toDate(),
    },
  });

  await db.userOneTimePassword.deleteMany({
    where: {
      userId: user.id,
      type,
    },
  });
  await db.userVerificationToken.deleteMany({
    where: {
      userId: user.id,
    },
  });
}

export async function verifyToken({ token }: { token?: string }) {
  const decoded = jwt.verify(token, process.env.EMAIL_SECRET_KEY as string);

  if (!decoded) {
    throw new ActionError("invalid_token");
  }

  await db.user.update({
    where: {
      id: decoded.userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  await db.userOneTimePassword.deleteMany({
    where: {
      userId: decoded.userId,
    },
  });
  await db.userVerificationToken.deleteMany({
    where: {
      userId: decoded.userId,
    },
  });
}

export async function sendResetPasswordEmail({ email }: { email: string }) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new ActionError("user_not_found");
  }
  const userVerificationToken = await db.userVerificationToken.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (
    userVerificationToken &&
    moment()
      .subtract(2, "minutes")
      .isBefore(moment(userVerificationToken.createdAt))
  ) {
    throw new ActionError("token_not_expired");
  }

  await db.userVerificationToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  // Jeton de vérification pour vérifier l'email de l'utilisateur
  const token = await generateVerificationToken({
    userId: user.id,
  });

  const url = new URL(
    process.env.NEXT_PUBLIC_BASE_URL + "/reset-password/new-password"
  );
  url.searchParams.set("token", token);

  await sendTransactionalEmail({
    transactionalId: process.env.RESET_PASSWORD_EMAIL_TRANSACTIONAL_ID!,
    email,
    dataVariables: {
      redirect_url: url.toString(),
      product_name: process.env.NEXT_PUBLIC_PRODUCT_NAME!,
    },
  });
}

export async function resetPassword({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  const decoded = jwt.verify(token, process.env.EMAIL_SECRET_KEY as string);

  if (!decoded) {
    throw new ActionError("invalid_token");
  }

  const currentToken = await db.userVerificationToken.findFirst({
    where: {
      userId: decoded.userId,
    },
  });

  if (currentToken && moment().isAfter(moment(currentToken.expires))) {
    throw new ActionError("token_expired");
  }

  const user = await db.user.findUnique({
    where: {
      id: decoded.userId,
    },
  });
  if (!user) {
    throw new ActionError("user_not_found");
  }

  const passwordHash = await hashPassword(password);

  await db.user.update({
    where: {
      id: decoded.userId,
    },
    data: {
      passwordHash,
    },
  });

  await db.userVerificationToken.deleteMany({
    where: {
      userId: decoded.userId,
    },
  });
}
