import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input
} from "@nextui-org/react";
import { Github } from "lucide-react";
import GoogleIcon from "../icons/google-icon";
import SignInEmailPasswordForm from "./sign-in-email-password-form";

export default function SignInForm() {
  return (
    <Card className="max-w-medium w-full">
      <CardHeader>
        <h1 className="text-title">Signin</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
        <SignInEmailPasswordForm />
        <Divider />
        <div className="flex flex-col gap-2">
          <Input
            color="secondary"
            size="lg"
            label="Email"
            placeholder="Enter your email"
          />
          <Button color="secondary" size="lg">
            <span>Signin with magic link</span>
          </Button>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <Button size="lg">
            <GoogleIcon className="w-5 h-5" />
            <span>Signin with GitHub</span>
          </Button>
          <Button size="lg">
            <Github className="w-5 h-5" />
            <span>Signin with GitHub</span>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
