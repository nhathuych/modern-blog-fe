'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCommentsByPost } from '@/lib/actions/comment-actions'
import { DEFAULT_PAGE_SIZE } from '@/lib/constants'
import CommentCard from './comment-card'
import CommentPagination from './comment-pagination'
import CommentCardSkeleton from './comment-card-skeleton'

type Props = {
  postId: number
}
const Comments = ({ postId }: Props) => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery({
    queryKey: ['GET_COMMENTS_BY_POST', postId, page],
    queryFn: () => {
      return getCommentsByPost({
        postId,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE,
      })
    }
  })

  const totalPages = Math.ceil((data?.total ?? 0) / DEFAULT_PAGE_SIZE)

  return (
    <div className='shadow-md mt-3 p-2 rounded-md'>
      <h6 className='my-3 text-slate-700 text-lg'>Comments</h6>

      <div className='flex flex-col gap-6 mb-2'>
        {isLoading && Array.from({length: 12}).map((_, index) => <CommentCardSkeleton key={index} />)}
        {!isLoading && data?.comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
      </div>

      <CommentPagination totalPages={totalPages} currentPage={page} setCurrentPage={(p) => setPage(p)} className='p-2' />
    </div>
  )
}

export default Comments
