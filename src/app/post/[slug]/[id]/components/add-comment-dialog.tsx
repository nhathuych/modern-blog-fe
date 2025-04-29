import SubmitButton from '@/components/submit.button'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { saveComment } from '@/lib/actions/comment-actions'
import { UserInfo } from '@/lib/auth-cookie'
import { cn } from '@/lib/utils'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import React, { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

type Props = {
  postId: number
  user: UserInfo
  className?: string
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<{
    comments: Comment[];
    total: number;
  }, Error>>
}
const AddCommentDialog = (props: Props) => {
  const [state, action] = useActionState(saveComment, undefined)

  useEffect(() => {
    if (state?.message) {
      toast(state?.ok ? 'Success' : 'Oops!', {
        description: state?.message,
        action: { label: 'Ok', onClick: () => {}, },
      })
    }

    if (state?.ok) props.refetch()
  }, [state])

  return (
    <Dialog open={state?.open}>
      <DialogTrigger asChild>
        <Button className='my-3'>Leave your comment</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Enter your comment</DialogTitle>
        <DialogDescription>Share your thoughts about this post.</DialogDescription>

        <form action={action} className={cn(props.className)}>
          <input type='hidden' name='postId' defaultValue={props.postId} />

          <Label htmlFor='content' className='text-[15px]'>Your comment</Label>
          <div className='border-x border-t rounded-t-md'>
            <Textarea name='content' className='shadow-none border-none active:outline-none focus-visible:ring-0' />
          </div>
          <p className='p-2 border rounded-b-md'>
            <span>Write as</span>
            <span className='font-semibold'> {props.user.name}</span>
          </p>
          {!!state?.errors?.content && <p className='text-red-500'>{state.errors.content}</p>}

          <SubmitButton className='mt-2'>Submit</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCommentDialog
