"use client";

import { toastPromise } from "@/lib/toast/toast";
import { passwordAuthSchema } from "@/lib/zod-schemas";
import { useI18n, useScopedI18n } from "@/locales/client";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import EmailInput from "../form/email-input";
import PasswordInput from "../form/password-input";

export default function SignInEmailPasswordForm() {
  const t = useScopedI18n("SignInEmailPasswordForm");
  const globalT = useI18n();
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
          if (res?.error) {
            formik.setErrors({
              email: globalT('credentials_signin'),
            });
            reject();
          } else {
            router.push("/");
          }
          resolve();
        } catch (error) {
          formik.setErrors({
            email: globalT('credentials_signin'),
          });
          reject(error);
        }
      }, globalT);
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
        label={t("password.label")}
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
        {t("button")}
      </Button>
      <a
        href="/reset-password/send-email"
        className="text-left hover:underline text-sm ml-1"
        type="button"
        role="button"
        aria-label="reset password"
      >
        {t("reset-password")}
      </a>
    </div>
  );
}
