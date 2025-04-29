import { Post } from '@/lib/types/model-types.d'
import { CheckCircle2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PostActions from './post-actions'

type Props = {
  post: Post
}
const PostItem = ({ post }: Props) => {
  return (
    <div className='grid grid-cols-8 bg-white shadow m-2 border rounded-md overflow-hidden text-slate-800 text-center hover:scale-[101%] transition'>
      <div className='relative w-48 h-32'>
        <Image src={post.thumbnail || '/no-img-available.svg'} alt={post.slug} fill />
      </div>

      <div className='flex flex-col gap-2 col-span-2 ml-2.5'>
        <Link href={`/post/${post.slug}/${post.id}`} className='px-2 text-indigo-600 text-lg line-clamp-1'>{post.title}</Link>
        <span className='px-2 text-sm text-justify line-clamp-4'>{post.content}</span>
      </div>

      <div className='flex justify-center items-center'>{new Date(post.createdAt).toLocaleString()}</div>
      <div className='flex justify-center items-center'>{post.published && <CheckCircle2Icon className='w-5' />}</div>
      <div className='flex justify-center items-center'>{post._count.likes}</div>
      <div className='flex justify-center items-center'>{post._count.comments}</div>

      <PostActions postId={post.id} />
    </div>
  )
}

export default PostItem
