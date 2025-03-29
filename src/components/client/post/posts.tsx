import { Post } from '@/lib/types/model-types.d'
import PostCard from './post-card'

type Props = {
  posts: Post[]
}

const Posts = (props: Props) => {
  return (
    <section className='m-8 mx-auto max-w-5xl container'>
      <h2 className='my-5 font-bold text-gray-600 text-5xl text-center leading-tight'>Latest Posts</h2>

      <div className='bg-gradient-to-r from-indigo-500 to-indigo-950 mx-auto mb-9 rounded-t-md w-96 h-1'></div>

      <div className='gap-6 grid grid-cols-1 md:grid-cols-3'>
        {props.posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  )
}

export default Posts
