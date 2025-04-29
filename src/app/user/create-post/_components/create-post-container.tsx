'use client'

import { savePost } from '@/lib/actions/post-actions'
import { useActionState } from 'react'
import PostForm from './post-form'

const CreatePostContainer = () => {
  const [state, action] = useActionState(savePost, undefined)

  return (
    <PostForm state={state} action={action} />
  )
}

export default CreatePostContainer
