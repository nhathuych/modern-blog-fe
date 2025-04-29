import { Post } from '@/lib/types/model-types.d'
import React from 'react'
import PostItem from './post-item'
import Pagination from '@/components/layout/pagination'

type Props = {
  posts: Post[]
  currentPage: number
  totalPages: number
}
const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <>
      <div className='grid grid-cols-8 shadow-md m-3 p-3 rounded-md text-center'>
        <div className='col-span-2'></div>
        <div></div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
      </div>

      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}

      <Pagination {... { currentPage, totalPages }} className='my-4' />
    </>
  )
}

export default PostList
