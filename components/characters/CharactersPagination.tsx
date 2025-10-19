"use client";

import { useRouter } from "next/navigation";
import Paginations from "../shared/Pagination";

interface CharactersPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function CharactersPagination({
  currentPage,
  totalPages,
}: CharactersPaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    // Update the URL with the new page number
    router.push(`/information?page=${page}`);
  };
  return (
    <Paginations
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  );
}
