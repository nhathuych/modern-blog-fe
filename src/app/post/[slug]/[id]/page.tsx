import { fetchPostById } from '@/lib/actions/post-actions'
import Image from 'next/image'
import SanitizedContent from './components/sanitized-content'
import Comments from './components/comments'
import { getUserFromCookie, UserInfo } from '@/lib/auth-cookie'
import Like from './components/like'

type Props = {
  params: {
    id: string,
  }
}
const PostPage = async ({ params }: Props) => {
  const postId = +(await params).id
  const post = await fetchPostById(postId)
  const userInfo = await getUserFromCookie()

  return (
    <main className='mx-auto mt-16 px-4 py-8 container'>
      <h1 className='mb-4 font-bold text-slate-700 text-4xl'>{post.title}</h1>
      <p className='mb-4 text-slate-500 text-sm'>
        By {post.user.name} | {new Date(post.createdAt).toLocaleString()}
      </p>

      <div className='relative w-80 h-60'>
        <Image
          src={post.thumbnail || '/no-img-available.svg'}
          alt='/no-img-available.svg'
          priority
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='rounded-md object-cover'
        />
      </div>

      <SanitizedContent content={post.content} />

      <Like postId={post.id} user={userInfo?.user as UserInfo} />

      <Comments postId={post.id} user={userInfo?.user as UserInfo} />
    </main>
  )
}

export default PostPage
