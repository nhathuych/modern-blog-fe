'use client'

import PostForm from '@/app/user/create-post/_components/post-form'
import { updatePost } from '@/lib/actions/post-actions'
import { Post } from '@/lib/types/model-types.d'
import { useActionState } from 'react'

type Props = {
  post: Post
}
const UpdatePostContainer = ({ post }: Props) => {
  const [state, action] = useActionState(updatePost, {
    data: {
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      tags: post.tags?.map(tag => tag.name).join(', '),
      previousThumbnailUrl: post.thumbnail,
    }
  })

  return (
    <PostForm state={state} action={action} />
  )
}

export default UpdatePostContainer
