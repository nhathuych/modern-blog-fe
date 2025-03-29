import { Post } from '@/lib/types/model-types.d'
import Image from 'next/image'
import React from 'react'

type Props = Partial<Post>
const PostCard = (props: Props) => {
  const { id, title, slug, content, thumbnail, createdAt } = props

  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden'>
      <div className='relative h-60'>
        <Image
          src={thumbnail ?? '/no-img-available.svg'}
          alt={title ?? ''}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority
          fill
        />
      </div>
    </div>
  )
}

export default PostCard
