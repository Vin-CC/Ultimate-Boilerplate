import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import GithubProviderButton from "./github-provider-button";
import GoogleProviderButton from "./google-provider-button";
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
          <GoogleProviderButton>Signin with Google</GoogleProviderButton>
          <GithubProviderButton>Signin with GitHub</GithubProviderButton>
        </div>
      </CardBody>
    </Card>
  );
}
