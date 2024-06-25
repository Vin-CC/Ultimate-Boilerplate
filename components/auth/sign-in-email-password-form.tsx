"use client";

import { getErrorMessage } from "@/lib/actions/error";
import { toastPromise } from "@/lib/toast/toast";
import { passwordAuthSchema } from "@/lib/zod-schemas";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import EmailInput from "../form/email-input";
import PasswordInput from "../form/password-input";

export default function SignInEmailPasswordForm() {
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
          let res = await signIn("credentials", {
            email: params.email,
            password: params.password,
            redirect: false,
          });
          console.log("SignIn response:", res);
          if (res?.error) {
            formik.setErrors({
              email: getErrorMessage(res.error),
            });
            reject();
          } else {
            router.push("/");
          }
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
        <span>Signin with password</span>
      </Button>
      <a href="/reset-password/send-email" className="text-left hover:underline text-sm ml-1" type="button" role="button" aria-label="reset password">
        Reset your password
      </a>
    </div>
  );
}
