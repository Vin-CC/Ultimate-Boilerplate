import { getSession } from "next-auth/react";
import Image from "next/image";

export default async function Home() {
  const auth = await getSession();
  return (
    <div>
      {auth ? (
        <div>
          <h1>Welcome {auth.user.email}</h1>
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </div>
      ) : (
        <h1>Pas connecté</h1>
      )}
    </div>
  );
}
