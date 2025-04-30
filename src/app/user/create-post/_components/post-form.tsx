'use client'

import SubmitButton from '@/components/submit.button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PostFormState } from '@/lib/types/form-state'
import { ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  state: PostFormState
  action: (payload: FormData) => void
}
const PostForm = ({ state, action }: Props) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (state?.message) {
      toast(state?.ok ? 'Success' : 'Oops!', {
        description: state?.message,
        action: { label: 'Ok', onClick: () => {}, },
      })
    }
  }, [state])

  return (
    <form action={action} className='flex flex-col gap-4 [&>div>label]:text-slate-600'>
      <input name='id' defaultValue={state?.data?.id} hidden />

      <div className='flex flex-col gap-1'>
        <Label htmlFor='title'>Title</Label>
        <Input name='title' defaultValue={state?.data?.title} placeholder='Enter the title of the post' />
        {!!state?.errors?.title && <p className='text-red-600'>{state.errors.title}</p>}
      </div>

      <div className='flex flex-col gap-1'>
        <Label htmlFor='content'>Content</Label>
        <Textarea name='content' defaultValue={state?.data?.content} rows={6} placeholder='Enter the content of the post' />
        {!!state?.errors?.content && <p className='text-red-600'>{state.errors.content}</p>}
      </div>

      <div className='flex flex-col gap-1'>
        <Label htmlFor='thumbnail'>Thumbnail</Label>
        <Input
          name='thumbnail'
          type='file'
          accept='image/*'
          onChange={(e) => {
            if (e.target.files) setImageUrl(URL.createObjectURL(e.target.files[0]))
          }}
        />
        {!!state?.errors?.thumbnail && <p className='text-red-600'>{state.errors.thumbnail}</p>}
        {(!!imageUrl || !!state?.data?.previousThumbnailUrl) && <Image src={imageUrl || state?.data?.previousThumbnailUrl || ''} alt='Thumbnail' width={200} height={150} />}
      </div>

      <div className='flex flex-col gap-1'>
        <Label htmlFor='tags'>Tags (comma separated)</Label>
        <Input name='tags' defaultValue={state?.data?.tags} placeholder='Enter tags separated by commas' />
        {!!state?.errors?.tags && <p className='text-red-600'>{state.errors.tags}</p>}
      </div>

      <div className='flex items-center gap-2'>
        <input id='published' name='published' defaultChecked={state?.data?.published} type='checkbox' className='size-4' />
        <Label htmlFor='published'>Published</Label>
        {!!state?.errors?.published && <p className='text-red-600'>{state.errors.published}</p>}
      </div>

      <SubmitButton>Save</SubmitButton>

      <Link href='/user/posts' className='flex items-center gap-1 text-indigo-500 hover:text-indigo-600'>
        <ArrowLeftIcon />
        <span>Back to posts</span>
      </Link>
    </form>
  )
}

export default PostForm
