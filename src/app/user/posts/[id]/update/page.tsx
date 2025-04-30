import { fetchPostById } from '@/lib/actions/post-actions'
import UpdatePostContainer from './_components/update-post-container'

type Props = {
  params: {
    id: string
  }
}
const UpdatePostPage = async (props: Props) => {
  const params = await props.params
  const post = await fetchPostById(parseInt(params.id))

  return (
    <div className='bg-white shadow-md p-6 rounded-md w-full max-w-2xl'>
      <h2 className='font-bold text-slate-700 text-lg text-center'>Update your post</h2>
      <UpdatePostContainer post={post} />
    </div>
  )
}

export default UpdatePostPage
