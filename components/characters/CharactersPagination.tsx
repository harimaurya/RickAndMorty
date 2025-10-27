"use client";

import { useRouter } from "next/navigation";
import Paginations from "../shared/Pagination";
import { memo, useCallback } from "react";

export interface CharactersPaginationProps {
  currentPage: number;
  totalPages: number;
}

function CharactersPagination({
  currentPage,
  totalPages,
}: CharactersPaginationProps) {
  const router = useRouter();

  const handlePageChange = useCallback(
    (page: number) => {
      router.push(`/information?page=${page}`);
    },
    [router]
  );

  return (
    <Paginations
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  );
}

export default memo(CharactersPagination);
