import React from "react";
import "./Pagination.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const maxPageNumbersToShow = 5; // Number of page buttons to display

  // Calculate start and end page numbers
  const calculatePageNumbers = () => {
    const pages: number[] = [];
    const halfRange = Math.floor(maxPageNumbersToShow / 2);

    let start = Math.max(currentPage - halfRange, 1);
    let end = Math.min(currentPage + halfRange, totalPages);

    if (currentPage <= halfRange) {
      end = Math.min(maxPageNumbersToShow, totalPages);
    } else if (currentPage + halfRange >= totalPages) {
      start = Math.max(totalPages - maxPageNumbersToShow + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = calculatePageNumbers();

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${
            page === currentPage ? "active" : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
