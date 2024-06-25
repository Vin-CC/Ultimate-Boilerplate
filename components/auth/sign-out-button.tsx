import { signOut } from "@/lib/auth/auth";
import { Button } from "@nextui-org/button";

export default function SignOutButton() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
}
