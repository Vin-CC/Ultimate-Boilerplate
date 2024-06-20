"use client";

import { Input, InputProps } from "@nextui-org/react";

export default function EmailInput({isInvalid, ...props}: InputProps) {
  return (
    <Input
      required
      name="email"
      type="email"
      color={isInvalid ? "danger": "primary"}
      isInvalid={isInvalid}
      size="lg"
      label="Email"
      placeholder="Enter your email"
      {...props}
    />
  );
}
