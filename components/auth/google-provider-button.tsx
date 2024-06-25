"use client";

import { Button } from "@nextui-org/button";

import { signIn } from "next-auth/react";
import GoogleIcon from "../icons/google-icon";

export default function GoogleProviderButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={() => {
        signIn("google");
      }}
      size="lg"
    >
      <GoogleIcon className="w-5 h-5" />
      {children || "Sign in with Google"}
    </Button>
  );
}
