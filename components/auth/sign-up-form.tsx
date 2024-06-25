import Link from "next/link";
import H1 from "../h1";
import TextDivider from "../text-divider";
import GithubProviderButton from "./github-provider-button";
import GoogleProviderButton from "./google-provider-button copy";
import SignUpEmailPasswordForm from "./sign-up-email-password-form";
import SignUpMagicLink from "./sign-up-magic-link";

export default function SignUpForm() {
  return (
    <div className="max-w-medium p-5 sm:p-10 h-full flex flex-col justify-center w-full">
      <div className="flex grow justify-center flex-col gap-8">
        <div className="flex flex-col">
          <H1>Signup</H1>
          <p className="text-center text-foreground-700 font-medium">
            Create an account to get started
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <SignUpEmailPasswordForm />
          <TextDivider>Or connect with magic link</TextDivider>
          <SignUpMagicLink />
          <TextDivider>Or connect with providers</TextDivider>
          <div className="flex flex-col gap-2">
            <GoogleProviderButton>Signup with Google</GoogleProviderButton>
            <GithubProviderButton>Signup with GitHub</GithubProviderButton>
          </div>
          <p>
            Already have an account?{" "}
            <Link
              aria-label="Sign in"
              href="/signin"
              className="font-semibold underline-offset-2 transition-all hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
      <div className="text-sm text-center flex justify-end flex-col md:text-xs">
        <p>
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
        </p>
      </div>
    </div>
  );
}
