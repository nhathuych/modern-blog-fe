import { EditIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  postId: number
}
const PostActions = ({ postId }: Props) => {
  return (
    <div className='flex justify-center items-center gap-3'>
      <Link
        href={`/user/post/${postId}/edit`}
        title='Edit Post'
        className='p-2 border border-yellow-500 hover:border-yellow-700 rounded-md text-yellow-500 hover:text-yellow-700 transition-colors'
      >
        <EditIcon className='size-4' />
      </Link>

      <Link
        href={`/user/post/${postId}/delete`}
        title='Delete Post'
        className='p-2 border border-red-500 hover:border-red-700 rounded-md text-red-500 hover:text-red-700 transition-colors'
      >
        <Trash2Icon className='size-4' />
      </Link>
    </div>
  )
}

export default PostActions
