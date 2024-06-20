"use server";

import axios from "axios";

export async function createContact({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) {
  await axios.post(
    `https://app.loops.so/api/v1/contacts/create`,
    {
      email,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
      },
    }
  );
}

export async function sendTransactionalEmail(options: {
  email: string;
  transactionalId: string;
  dataVariables: Record<string, string>;
}) {
  await axios.post("https://app.loops.so/api/v1/transactional", options, {
    headers: {
      Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
    },
  });
}
