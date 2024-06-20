"use client";

import { resetPassword } from "@/lib/actions/auth";
import { getErrorMessage } from "@/lib/actions/error";
import { toastPromise } from "@/lib/toast/toast";
import { password } from "@/lib/zod-schemas";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import PasswordInput from "../form/password-input";

const schema = z
  .object({
    password,
    confirmPassword: password,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "confirm-password.error.passwords_do_not_match",
        path: ["confirmPassword"],
      });
    }
  });

export default function ResetPasswordNewPassword({
  token
}: {
  token: string;
}) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (params) => {
      await toastPromise(async (resolve, reject) => {
        try {
          await resetPassword({
            token,
            password: params.password,
          });
          router.push("/auth/signin");
          resolve("Password reset successfully");
        } catch (error) {
          formik.setErrors({
            password: getErrorMessage(error),
          });
          reject(error);
        }
      
      })
    },
  });
  return (
    <Card className="max-w-xl w-full pb-6">
      <CardHeader>
        <h1 className="text-title">Reset password</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-6 !px-6">
        <PasswordInput
          isInvalid={!!formik.errors.password}
          errorMessage={formik.errors.password}
          {...formik.getFieldProps("password")}
        />
        <PasswordInput
          label="Confirm password"
          isInvalid={!!formik.errors.confirmPassword}
          errorMessage={formik.errors.confirmPassword}
          {...formik.getFieldProps("confirmPassword")}
        />
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button
          disabled={!formik.isValid}
          isLoading={formik.isSubmitting}
          onClick={() => formik.handleSubmit()}
          color="primary"
          size="lg"
        >
          <span>Reset your e-mail</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
