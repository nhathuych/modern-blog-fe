'use client'

import { getPostLikeData, likePost, unlikePost } from '@/lib/actions/like-actions'
import { UserInfo } from '@/lib/auth-cookie'
import { useMutation, useQuery } from '@tanstack/react-query'
import { HeartIcon } from 'lucide-react'

type Props = {
  postId: number
  user: UserInfo
}
const Like = (props: Props) => {
  const { data, refetch: refetchPostLikeData } = useQuery({
    queryKey: ['GET_POST_LIKE_DATA', props.postId],
    queryFn: async () => await getPostLikeData(props.postId)
  })

  const likePostMutation = useMutation({
    mutationFn: () => likePost(props.postId),
    onSuccess: () => refetchPostLikeData(),
  })

  const unlikePostMutation = useMutation({
    mutationFn: () => unlikePost(props.postId),
    onSuccess: () => refetchPostLikeData(),
  })

  return (
    <div className='flex justify-start items-center gap-2 mt-3'>
      {data?.isUserLikedPost ?
        (<button onClick={() => unlikePostMutation.mutate()}><HeartIcon className='w-6 text-rose-600 cursor-pointer' fill='currentColor' stroke='currentColor' /></button>) :
        (<button onClick={() => likePostMutation.mutate()  }><HeartIcon className='w-6 text-slate-700 cursor-pointer' strokeWidth={1.3} /></button>)
      }
      <p className='text-slate-600'>{data?.totalLikes}</p>
    </div>
  )
}

export default Like
