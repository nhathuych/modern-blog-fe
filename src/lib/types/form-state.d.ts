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
