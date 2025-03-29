import { Post } from '@/lib/types/model-types.d'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = Partial<Post>
const PostCard = (props: Props) => {
  const { id, title, slug, content, thumbnail, createdAt } = props

  return (
    <div className='flex flex-col bg-white shadow-md rounded-lg overflow-hidden'>
      <div className='relative h-60'>
        <Image src={thumbnail ?? '/no-img-available.svg'} alt={title ?? ''} priority fill />
      </div>

      <div className='flex flex-col flex-grow p-6'>
        <h3 className='mt-1 min-h-[3rem] font-bold text-gray-600 text-lg break-words leading-[1.5]'>{title}</h3>
        <p className='mt-4 text-gray-700 break-words'>{content?.slice(0, 100)}...</p>
        <p className='mt-2 text-gray-500 text-sm'>{new Date(createdAt ?? '').toLocaleString()}</p>
        <Link
          href={`/blog/${slug}/${id}`}
          className='block mt-auto text-indigo-600 text-right hover:underline'
        >
          Read more
        </Link>
      </div>
    </div>
  )
}

export default PostCard
