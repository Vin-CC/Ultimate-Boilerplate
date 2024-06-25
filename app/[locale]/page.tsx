import SignOutButton from "@/components/auth/sign-out-button";
import { auth } from "@/lib/auth/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  console.log(session)
  return (
    <div>
      {session ? (
        <div>
          <h1>Welcome {session.user.email}</h1>
          <Image src="/logo.png" alt="logo" width={200} height={200} />
          <SignOutButton />
        </div>
      ) : (
        <h1>Pas connecté</h1>
      )}
    </div>
  );
}
