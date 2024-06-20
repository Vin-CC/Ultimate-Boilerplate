import bcrypt from "bcrypt";
import { randomBytes } from "crypto";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  hashedPassword: string,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateRandomString(length: number): string {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

export function isWithinExpirationDate(
  expirationDate: Date,
  expireDuration: number
): boolean {
  const currentDate = new Date();
  const expirationThreshold = new Date(
    expirationDate.getTime() - expireDuration / 2
  );

  return currentDate <= expirationThreshold;
}
