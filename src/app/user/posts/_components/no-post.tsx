import { Button } from '@/components/ui/button'
import { Edit2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NoPost = () => {
  return (
    <div className='flex flex-col items-center gap-5 mt-32'>
      <p className='p-4 text-slate-400 text-5xl text-center'>You don't have any posts yet.</p>
      <Button asChild>
        <Link href='/user/create-post' className='flex justify-center items-center'>
          <span><Edit2Icon /></span>
          <span>Create your first post</span>
        </Link>
      </Button>
    </div>
  )
}

export default NoPost
