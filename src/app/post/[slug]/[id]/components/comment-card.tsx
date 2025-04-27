'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Comment } from '@/lib/types/model-types.d'
import { UserCircleIcon } from 'lucide-react'

type Props = {
  comment: Comment
}
const CommentCard = ({ comment }: Props) => {
  return (
    <div className='shadow p-2 rounded'>
      <div className='flex items-center gap-2 text-slate-500'>
        <Avatar className='border-2'>
          <AvatarImage src={comment.user.avatar} />
          <AvatarFallback>
            <UserCircleIcon className='w-8' />
          </AvatarFallback>
        </Avatar>
        <span className='font-semibold text-lg'>{comment.user.name}</span>
        <span className='text-sm'> | {new Date(comment.createdAt).toLocaleString()}</span>
      </div>

      <p className='mt-4 text-slate-800'>{comment.content}</p>
    </div>
  )
}

export default CommentCard
