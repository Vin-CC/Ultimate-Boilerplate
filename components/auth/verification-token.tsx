"use client";

import { verifyToken } from "@/lib/actions/auth";
import { toastPromise } from "@/lib/toast/toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Juste là pour vérifier la validité du token
export default function VerificationToken({
  token
} : {
  token?: string
}) {
  const router = useRouter();

  useEffect(() => {
    if(!token) return;

    toastPromise(async (resolve, reject) => {
      try {
        await verifyToken({ token });
        router.push("/signin");
        resolve();
      } catch (error) {
        reject(error);
      }
    })
  }, [token])
  return (
    <></>
  )
}
