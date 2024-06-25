"use client";

import { passwordPattern } from "@/lib/patterns";
import { useI18n, useScopedI18n } from "@/locales/client";
import { Input, InputProps } from "@nextui-org/react";
import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({
  isInvalid,
  label,
  errorMessage,
  ...props
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const globalT = useI18n();
  const t = useScopedI18n("PasswordInput");

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      errorMessage={globalT(errorMessage as any, {})}
      pattern={passwordPattern}
      required
      isInvalid={isInvalid}
      name="password"
      color={isInvalid ? "danger" : "primary"}
      size="lg"
      label={label}
      placeholder={t("placeholder")}
      {...props}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {!isVisible ? (
            <EyeOffIcon className="text-2xl my-auto pointer-events-none" />
          ) : (
            <Eye className="text-2xl my-auto pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
}
