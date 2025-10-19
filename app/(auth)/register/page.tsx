"use client";

import logo from "../../../public/ricky-morty-logo.png";
import Image from "next/image";
import ProfileForm from "@/components/shared/ProfileForm";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="container px-4 mx-auto flex flex-col items-center justify-center flex-1">
      <div className="flex flex-col items-center justify-center mb-6">
        <Image
          src={logo}
          alt="Rick and Morty"
          width={100}
          height={100}
          className="mb-5"
        />
        <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-lime-600 mb-4">
          Rick and Morty Universe
        </h1>
      </div>
      <ProfileForm
        isRegister
        onSuccess={() => router.replace("/information")}
      />
    </div>
  );
}
