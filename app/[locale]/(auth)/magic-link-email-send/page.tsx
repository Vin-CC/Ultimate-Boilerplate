import { getScopedI18n } from "@/locales/server";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default async function page() {
  const t = await getScopedI18n("magic-link-email-send");
  return (
    <Card className="max-w-xl w-full pb-6">
    <CardHeader>
      <h1 className="text-title">{t('h1')}</h1>
    </CardHeader>
    <CardBody className="flex flex-col gap-6 !px-6">
      <p>
      {t('subtitle')}
      </p>
    </CardBody>
  </Card>
  )
}
