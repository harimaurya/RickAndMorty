"use client";

import Image from "next/image";
import logo from "../../public/ricky-morty-logo.png";
import { Button } from "@/components/ui/button";

export default function AppError({
  reset,
  error,
}: {
  error?: Error;
  reset: () => void;
}) {
  return (
    <main className="site-content w-full pt-20 flex-grow">
      <div className="flex flex-col items-center justify-center mb-6">
        <Image src={logo} alt="Rick and Morty" width={100} height={100} />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">
          Wubba Lubba Dub Dub!
        </h1>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          {error?.message ?? "Something went wrong!"}
        </h3>
        <Button className="mt-4" onClick={() => reset()}>
          Retry
        </Button>
      </div>
    </main>
  );
}
