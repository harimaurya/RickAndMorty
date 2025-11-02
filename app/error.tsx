"use client";
import { useEffect } from "react";
import AppError from "@/components/shared/AppError";

export default function AppErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error occurred:", error.message);
  }, [error]);

  return <AppError error={error} reset={reset} />;
}
