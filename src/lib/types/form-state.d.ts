export type SignUpFormState = {
  data: {
    name?: string
    email?: string
    password?: string
  }
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string
} | undefined

export type CreateCommentFormState = {
  data?: {
    postId?: number
    comment?: string
  }
  errors?: {
    content?: string[]
  }
  message?: string
  ok?: boolean
  open?: boolean
} | undefined

export type PostFormState = {
  data?: {
    title?: string
    content?: string
    thumbnail?: File | null
    published?: boolean
    tags?: string
  }
  errors?: {
    title?: string[]
    content?: string[]
    thumbnail?: string[]
    published?: string[]
    tags?: string[]
  }
  message?: string
  ok?: boolean
} | undefined
