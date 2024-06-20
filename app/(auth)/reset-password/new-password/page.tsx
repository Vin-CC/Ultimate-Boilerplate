import ResetPasswordNewPassword from "@/components/auth/reset-password-new-password";
import { isString } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const token = searchParams.token;
  if (!isString(token)) {
    return redirect("/signin");
  }
  return <ResetPasswordNewPassword token={token} />;
}
