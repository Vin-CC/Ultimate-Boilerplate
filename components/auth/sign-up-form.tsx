import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider
} from "@nextui-org/react";
import { Github } from "lucide-react";
import Link from "next/link";
import GoogleIcon from "../icons/google-icon";
import SignUpEmailPasswordForm from "./sign-up-email-password-form";
import SignUpMagicLink from "./sign-up-magic-link";

export default function SignUpForm() {
  return (
    <Card className="max-w-medium w-full">
      <CardHeader>
        <h1 className="text-title">Signup</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
        <SignUpEmailPasswordForm />
        <Divider />
        <SignUpMagicLink />
        <Divider />
        <div className="flex flex-col gap-2">
          <Button size="lg">
            <GoogleIcon className="w-5 h-5" />
            <span>Signup with GitHub</span>
          </Button>
          <Button size="lg">
            <Github className="w-5 h-5" />
            <span>Signup with GitHub</span>
          </Button>
        </div>
      </CardBody>
      <CardFooter>
        <div className="text-sm md:text-xs">
          By continuing, you agree to our{" "}
          <Link
            aria-label="Terms of Service"
            href="/terms-of-service"
            className="font-semibold underline-offset-2 transition-all hover:underline"
          >
            ToS
          </Link>{" "}
          <br className="xs:hidden sm:block md:hidden" />
          and{" "}
          <Link
            aria-label="Privacy Policy"
            href="/confidentiality-policy"
            className="font-semibold underline-offset-2 transition-all hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </CardFooter>
    </Card>
  );
}
