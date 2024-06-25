"use client";

import { toastPromise } from "@/lib/toast/toast";
import { Button } from "@nextui-org/button";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import EmailInput from "../form/email-input";

const schema = z.object({
  email: z.string().email(),
});

export default function SignUpMagicLink() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (params) => {
      toastPromise(async (resolve, reject) => {
        try {
          signIn("email", {
            email: params.email,
            redirect: false,
          });
          router.push("/magic-link-email-send")
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  });
  return (
    <div className="flex flex-col gap-2">
      <EmailInput
        color="secondary"
        isInvalid={!!formik.errors.email}
        errorMessage={formik.errors.email}
        {...formik.getFieldProps("email")}
      />
      <Button
        disabled={!formik.isValid}
        isLoading={formik.isSubmitting}
        onClick={() => formik.handleSubmit()}
        color="secondary"
        size="lg"
      >
        <span>Signup with magic link</span>
      </Button>
    </div>
  );
}
