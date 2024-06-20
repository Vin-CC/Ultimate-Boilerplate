"use client";

import { passwordPattern } from "@/lib/patterns";
import { Input, InputProps } from "@nextui-org/react";
import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({isInvalid, label = "Password", ...props}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      pattern={passwordPattern}
      required
      isInvalid={isInvalid}
      name="password"
      color={isInvalid ? "danger" : "primary"}
      size="lg"
      label={label}
      placeholder="Enter your password"
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
