"use client";

import { resendVerificationEmail } from "@/lib/actions/auth";
import { toastPromise } from "@/lib/toast/toast";

export default function ResendVerificationEmail({
  identifier,
  type,
}: {
  identifier: string;
  type: string;
}) {
  return (
    <p className="text-neutral-600">
      Vous n&apos;avez pas reçu de code ?{" "}
      <button
        onClick={() => {
          toastPromise(async(resolve, reject) => {
            try {
              await resendVerificationEmail({ email: identifier, type });
              resolve();
            } catch (err) {
              reject(err);
            }
          })
        }}
        type="button"
        role="button"
        className="text-black"
      >
        Renvoyer un code
      </button>
    </p>
  );
}
