
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const Pagination = ({ currentPage, totalPages, onPageChange, isLoading }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page, last page, current page, and pages before and after current
    const pages = [1];
    
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust if we're at the beginning
    if (currentPage <= 2) {
      endPage = Math.min(totalPages - 1, 4);
    }
    
    // Adjust if we're at the end
    if (currentPage >= totalPages - 1) {
      startPage = Math.max(2, totalPages - 3);
    }
    
    // Add ellipsis if there's a gap between 1 and startPage
    if (startPage > 2) {
      pages.push(-1); // -1 represents ellipsis
    }
    
    // Add the middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if there's a gap between endPage and totalPages
    if (endPage < totalPages - 1) {
      pages.push(-2); // -2 represents ellipsis (different key than the first one)
    }
    
    // Add the last page if we're not already at it
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <nav className="flex justify-center items-center space-x-1 mt-6">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) => (
        page < 0 ? (
          <span key={`ellipsis-${page}`} className="px-3 py-2">
            ...
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Button>
        )
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
};

export default Pagination;
