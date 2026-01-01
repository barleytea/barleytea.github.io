import { Link } from 'gatsby'
import { ComponentType } from 'react'

interface Props {
  totalPages: number
  currentPage: number
}

export const Pagination: ComponentType<Props> = ({
  currentPage,
  totalPages,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      
      if (currentPage > 3) {
        pages.push('...')
      }
      
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      
      pages.push(totalPages)
    }
    
    return pages
  }

  const getPageLink = (page: number) => {
    return page === 1 ? '/' : `/posts/${page}`
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav aria-label="Pagination" className="flex items-center gap-2">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          to={getPageLink(currentPage - 1)}
          className="flex items-center gap-1 rounded-lg border border-gray-700 bg-gray-800/30 px-4 py-2 text-[color:var(--text-color)] transition-all duration-300 hover:border-[color:var(--primary-color)] hover:text-[color:var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)]"
          aria-label="Go to previous page"
        >
          <span aria-hidden="true">←</span>
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <span className="flex cursor-not-allowed items-center gap-1 rounded-lg border border-gray-700 bg-gray-800/30 px-4 py-2 text-gray-600">
          <span aria-hidden="true">←</span>
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}

      {/* Page Numbers */}
      <ul className="flex list-none gap-1 pl-0">
        {pageNumbers.map((page, idx) => {
          if (page === '...') {
            return (
              <li key={`ellipsis-${idx}`} className="flex h-10 w-10 items-center justify-center text-[color:var(--text-color)]">
                <span>...</span>
              </li>
            )
          }

          const pageNum = page as number
          const isCurrentPage = pageNum === currentPage

          return (
            <li key={`page-${pageNum}`}>
              <Link
                to={getPageLink(pageNum)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)] ${
                  isCurrentPage
                    ? 'border-[color:var(--primary-color)] bg-[color:var(--primary-color)] font-bold text-white'
                    : 'border-gray-700 bg-gray-800/30 text-[color:var(--text-color)] hover:border-[color:var(--primary-color)] hover:text-[color:var(--primary-color)]'
                }`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {pageNum}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          to={getPageLink(currentPage + 1)}
          className="flex items-center gap-1 rounded-lg border border-gray-700 bg-gray-800/30 px-4 py-2 text-[color:var(--text-color)] transition-all duration-300 hover:border-[color:var(--primary-color)] hover:text-[color:var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)]"
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className="flex cursor-not-allowed items-center gap-1 rounded-lg border border-gray-700 bg-gray-800/30 px-4 py-2 text-gray-600">
          <span className="hidden sm:inline">Next</span>
          <span aria-hidden="true">→</span>
        </span>
      )}
    </nav>
  )
}
