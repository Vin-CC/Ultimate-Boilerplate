"use client";

import { useI18n, useScopedI18n } from "@/locales/client";
import { Input, InputProps } from "@nextui-org/react";

export default function EmailInput({isInvalid, errorMessage, ...props}: InputProps) {
  const t = useScopedI18n("EmailInput")
  const globalT = useI18n();
  return (
    <Input
      required
      errorMessage={globalT(errorMessage as any, {})}
      name="email"
      type="email"
      color={isInvalid ? "danger": "primary"}
      isInvalid={isInvalid}
      size="lg"
      label={t('label')}
      placeholder={t('placeholder')}
      {...props}
    />
  );
}
