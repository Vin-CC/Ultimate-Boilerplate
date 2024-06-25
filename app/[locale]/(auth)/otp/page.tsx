import ResendVerificationEmail from "@/components/auth/resend-verification-email";
import VerificationToken from "@/components/auth/verification-token";
import OtpInput from "@/components/form/otp-input";
import { isString } from "@/lib/utils";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { redirect } from "next/navigation";

export default function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const type = searchParams.type;
  const identifier = searchParams.identifier;
  const token = searchParams.token as string | undefined;
  if (!isString(type) || !isString(identifier)) {
    return redirect("/signup");
  }
  return (
    <Card className="max-w-xl w-full pb-6">
      <CardHeader>
        <h1 className="text-title">Votre code</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-6 !px-6">
        <OtpInput identifier={identifier} type={type} />
      </CardBody>
      <CardFooter>
        <ResendVerificationEmail identifier={identifier} type={type} />
      </CardFooter>
      <VerificationToken token={token} />
    </Card>
  );
}
