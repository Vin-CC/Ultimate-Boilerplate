import AuthXL from "@/app/images/auth-xl.jpg";
import Image from "next/image";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full xl:grid xl:grid-cols-2">
      <div className="flex justify-center items-center w-full h-full">
        {children}
      </div>
      <div className="w-full h-full overflow-hidden">
        <Image
          className="w-full h-full object-cover object-center"
          width={1000}
          height={2000}
          src={AuthXL}
          alt="Auth Decoration"
        />
      </div>
    </div>
  );
}
