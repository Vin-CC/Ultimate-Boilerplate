"use client";

import { sendResetPasswordEmail } from "@/lib/actions/auth";
import { getErrorMessage } from "@/lib/actions/error";
import { toastPromise } from "@/lib/toast/toast";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import EmailInput from "../form/email-input";

const schema = z.object({
  email: z.string().email(),
});

export default function ResetPasswordSendForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (params) => {
      await toastPromise(async (resolve: any, reject: any) => {
        try {
          let res = await sendResetPasswordEmail({
            email: params.email,
          });
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
    <Card className="max-w-xl w-full pb-6">
      <CardHeader>
        <h1 className="text-title">Reset your password</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-6 !px-6">
        <EmailInput
          isInvalid={!!formik.errors.email}
          errorMessage={formik.errors.email}
          {...formik.getFieldProps("email")}
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
          <span>Send me an email</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
