import SubmitButton from '@/components/submit.button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { deletePost, fetchPostById } from '@/lib/actions/post-actions'
import { AlertOctagonIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}
const DeletePostPage = async (props: Props) => {
  const params = await props.params
  const post = await fetchPostById(+params.id)

  const formAction = async (formData: FormData) => {
    'use server'

    await deletePost(post)
    redirect('/user/posts')
  }

  return (
    <Card className='m-12 px-6 py-12 w-96'>
      <CardHeader>
        <CardTitle className='flex flex-row justify-between items-center'>
          <div className='text-red-600'>Delete the post</div>
          <AlertOctagonIcon className='w-8 text-red-600' />
        </CardTitle>
      </CardHeader>

      <CardDescription>
        <p>
          This action can't be undone. This will permanently delete your post and remove its data from our servers.
        </p>
        <hr className='my-3'/>
        <p className='font-bold text-slate-600'>Title of the post</p>
        <p>{post.title}</p>
      </CardDescription>

      <CardContent>
        <form action={formAction} className='flex justify-end gap-2'>
          <SubmitButton variant='destructive' className='cursor-pointer'>Delete</SubmitButton>
          <Button variant='outline' asChild>
            <Link href='/user/posts'>Cancel</Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default DeletePostPage
