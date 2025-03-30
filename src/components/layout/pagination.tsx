import { calculatePageNumbers } from '@/lib/pagy'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Props = {
  totalPages: number
  currentPage: number
  pageNeighbors?: number
  className?: string
}
const Pagination = (props: Props) => {
  const { totalPages, currentPage, pageNeighbors = 2, className } = props
  const pageNumbers = calculatePageNumbers({ pageNeighbors, totalPages, currentPage })

  return (
    <div className={cn('flex justify-center items-center gap-2', className)}>
      {/* previous page button */}
      {currentPage !== 1 && (
        <button className={cn('bg-slate-200 px-2 py-1 rounded-md')}>
          <Link href={`?page=${currentPage - 1}`}>
            <ChevronLeftIcon className='w-4' />
          </Link>
        </button>
      )}

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={cn('rounded-md transition hover:text-indigo-600 px-3 py-1', {
            'bg-slate-200': currentPage !== page && page !== '...',
            'bg-blue-500 text-white': currentPage === page,
            'cursor-not-allowed': page === '...',
          })}
        >
          {page === '...' ? '...' : (<Link href={`?page=${page}`}>{page}</Link>)}
        </button>
      ))}

      {/* next page button */}
      {currentPage !== totalPages && (
        <button className='bg-slate-200 px-2 py-1 rounded-md'>
          <Link href={`?page=${currentPage + 1}`}>
            <ChevronRight className='w-4' />
          </Link>
        </button>
      )}
    </div>
  )
}

export default Pagination
