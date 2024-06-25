import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function page() {
  return (
    <Card className="max-w-xl w-full pb-6">
    <CardHeader>
      <h1 className="text-title">Magic Link email send</h1>
    </CardHeader>
    <CardBody className="flex flex-col gap-6 !px-6">
      <p>
        We have sent a magic link to your email. Click the link to verify your email. If you didn&apos;t receive the email, please check your spam folder.
      </p>
    </CardBody>
  </Card>
  )
}
