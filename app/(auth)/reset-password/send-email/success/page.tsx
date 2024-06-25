import { Card, CardBody, CardHeader } from '@nextui-org/card'

export default function page() {
  return (
    <Card className="max-w-xl w-full pb-6">
    <CardHeader>
      <h1 className="text-title">E-mail send</h1>
    </CardHeader>
    <CardBody className="flex flex-col gap-6 !px-6">
      <div>
      Check your email for a link to reset your password. If it doesn&apos;t appear within a few minutes, check your spam folder.
      </div>
    </CardBody>
  </Card>
  )
}
