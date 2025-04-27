export type Post = {
  id: number
  slug: string
  title: string
  content: string
  thumbnail: string|null
  published: boolean
  userId: number
  user: User
  tags?: Tag[]
  createdAt: Date
  updatedAt: Date
}

export type User = {
  id: number
  name: string
  email: string
  bio?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export type Tag = {
  id: number
  name: string
}

export type Comment = {
  id: number
  content: string
  user: User
  post: Post
  createdAt: Date
  updatedAt: Date
}
