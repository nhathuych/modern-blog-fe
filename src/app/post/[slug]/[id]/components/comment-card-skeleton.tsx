import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CommentCardSkeleton = () => {
  return (
    <div className='flex flex-col gap-3 shadow p-2 rounded'>
      <div className='flex items-center gap-2'>
        <Skeleton className='rounded-full size-12' />
        <Skeleton className='w-48 h-4' />
      </div>
      <Skeleton className='w-96 h-8' />
    </div>
  )
}

export default CommentCardSkeleton
