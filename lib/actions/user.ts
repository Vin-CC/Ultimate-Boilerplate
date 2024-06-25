"use server";

import { User } from "@prisma/client";
import { db } from "../db";

// function name = [get,post,put,del][Entity][Action]

export async function getUserByEmail(email: string): Promise<User | null> {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
}
