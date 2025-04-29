import CreatePostContainer from './_components/create-post-container'

const CreatePostPage = () => {
  return (
    <div className='bg-white shadow-md p-6 rounded-md w-full max-w-2xl'>
      <h2 className='font-bold text-slate-700 text-lg text-center'>Create a new post</h2>
      <CreatePostContainer />
    </div>
  )
}

export default CreatePostPage
