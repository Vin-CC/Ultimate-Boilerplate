"use client";

import { signUpWithPassword } from "@/lib/actions/auth";
import { getErrorMessage } from "@/lib/actions/error";
import { toastPromise } from "@/lib/toast/toast";
import { passwordAuthSchema } from "@/lib/zod-schemas";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import EmailInput from "../form/email-input";
import PasswordInput from "../form/password-input";

export default function SignUpEmailPasswordForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(passwordAuthSchema),
    onSubmit: async (params) => {
      await toastPromise(async (resolve: any, reject: any) => {
        try {
          await signUpWithPassword({
            email: params.email,
            password: params.password,
            callbackUrl: "/otp",
          });
          router.push("/otp?type=SIGNUP&identifier=" + params.email);
          resolve();
        } catch (error) {
          formik.setErrors({
            email: getErrorMessage(error),
          });
          reject(error);
        }
      });
    },
  });
  return (
    <div className="flex flex-col gap-2">
      <EmailInput
        isInvalid={!!formik.errors.email}
        errorMessage={formik.errors.email}
        {...formik.getFieldProps("email")}
      />
      <PasswordInput
        isInvalid={!!formik.errors.password}
        errorMessage={formik.errors.password}
        {...formik.getFieldProps("password")}
      />
      <Button
        disabled={!formik.isValid}
        isLoading={formik.isSubmitting}
        onClick={() => formik.handleSubmit()}
        color="primary"
        size="lg"
      >
        <span>Signup with password</span>
      </Button>
    </div>
  );
}
