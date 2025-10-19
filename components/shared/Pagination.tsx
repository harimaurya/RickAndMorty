import { getPaginationPages } from "@/lib/utils";
import { Button } from "../ui/button";

interface PaginationsProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default function Paginations({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationsProps) {
  const pageNumbers = getPaginationPages(currentPage, totalPages);
  return (
    <div className="flex flex-wrap justify-center items-center space-x-2 md:space-x-4 mt-8">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="order-1"
      >
        &larr;
      </Button>

      {/* Dynamic Page Numbers */}
      <div className="flex space-x-2 mx-2 order-2 my-2">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={"ellipsis-" + index}
                className="px-3 py-2 text-gray-500 dark:text-gray-400 self-center"
              >
                ...
              </span>
            );
          }
          const isCurrent = page === currentPage;
          return (
            <Button
              key={page}
              variant={isCurrent ? "default" : "ghost"}
              onClick={() => handlePageChange(+page)}
              className={`w-10 h-10 p-0 text-sm ${
                isCurrent ? "" : "shadow-none"
              }`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="order-3"
      >
        &rarr;
      </Button>
    </div>
  );
}
