import { getI18n, getScopedI18n } from "@/locales/server";
import Link from "next/link";
import H1 from "../h1";
import TextDivider from "../text-divider";
import GithubProviderButton from "./github-provider-button";
import GoogleProviderButton from "./google-provider-button";
import SignMagicLink from "./sign-magic-link";
import SignUpEmailPasswordForm from "./sign-up-email-password-form";

export default async function SignUpForm() {
  const t = await getScopedI18n("SignUpForm");
  const globalT = await getI18n();
  return (
    <div className="max-w-medium p-5 sm:p-10 h-full flex flex-col justify-center w-full">
      <div className="flex grow justify-center flex-col gap-8">
        <div className="flex flex-col">
          <H1>{t("h1")}</H1>
          <p className="text-center text-foreground-700 font-medium">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <SignUpEmailPasswordForm />
          <TextDivider>{t("dividers.magic-link")}</TextDivider>
          <SignMagicLink />
          <TextDivider>{t("dividers.provider")}</TextDivider>
          <div className="flex flex-col gap-2">
            <GoogleProviderButton>{t("providers.google")}</GoogleProviderButton>
            <GithubProviderButton>{t("providers.github")}</GithubProviderButton>
          </div>
          <p>
            {t("no-account-yet")}{" "}
            <Link
              aria-label="Sign in"
              href="/signin"
              className="font-semibold underline-offset-2 transition-all hover:underline"
            >
              {t("sign-up-here")}
            </Link>
          </p>
        </div>
      </div>
      <div className="text-sm text-center flex justify-end flex-col md:text-xs">
        <p>
          {t("agree-to-terms")}{" "}
          <Link
            aria-label="Terms of Service"
            href="/terms-of-service"
            className="font-semibold underline-offset-2 transition-all hover:underline"
          >
            {t("tos")}
          </Link>{" "}
          <br className="xs:hidden sm:block md:hidden" />
          {globalT("and")}{" "}
          <Link
            aria-label="Privacy Policy"
            href="/confidentiality-policy"
            className="font-semibold underline-offset-2 transition-all hover:underline"
          >
            {t("privacy-policy")}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
