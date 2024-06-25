"use client";

import { Button } from "@nextui-org/button";
import { Github } from "lucide-react";

import { signIn } from "next-auth/react";

export default function GithubProviderButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={() => {
        signIn("github");
      }}
      size="lg"
    >
      <Github className="w-5 h-5" />
      {children || "Sign in with GitHub"}
    </Button>
  );
}
