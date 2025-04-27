import { calculatePageNumbers } from '@/lib/pagy'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  totalPages: number
  currentPage: number
  pageNeighbors?: number
  setCurrentPage: (page: number) => void
  className?: string
}
const CommentPagination = (props: Props) => {
  const { totalPages, currentPage, pageNeighbors = 2, setCurrentPage, className } = props
  const pageNumbers = calculatePageNumbers({ pageNeighbors, totalPages, currentPage })

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page > 0 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <div className={cn(className, 'flex items-center justify-center gap-2')}>
      {/* previous page button */}
      {currentPage !== 1 && (
        <button onClick={() => handlePageClick(currentPage - 1)} className={cn('bg-slate-200 px-2 py-1 rounded-md cursor-pointer')}>
          <ChevronLeftIcon className='w-4' />
        </button>
      )}

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          disabled={page === '...'}
          className={cn('rounded-md transition hover:text-indigo-600 cursor-pointer px-3 py-1', {
            'bg-slate-200': currentPage !== page && page !== '...',
            'bg-blue-500 text-white': currentPage === page,
            'cursor-not-allowed': page === '...',
          })}
        >
          {page === '...' ? '...' : <span>{page}</span>}
        </button>
      ))}

      {/* next page button */}
      {currentPage !== totalPages && (
        <button onClick={() => handlePageClick(currentPage + 1)} className='bg-slate-200 px-2 py-1 rounded-md cursor-pointer'>
          <ChevronRight className='w-4' />
        </button>
      )}
    </div>
  )
}

export default CommentPagination
