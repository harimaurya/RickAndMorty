"use client";

import { useEffect } from "react";
import AppError from "@/components/shared/AppError";

export default function CharactersDetailErrorPage({
  error,
  reset,
}: {
  error?: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error occurred:", error?.message);
  }, [error]);

  return <AppError reset={reset} />;
}
