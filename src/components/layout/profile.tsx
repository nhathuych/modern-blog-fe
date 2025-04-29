import { UserInfo } from '@/lib/auth-cookie'
import { Avatar } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { AvatarFallback, AvatarImage } from '../ui/avatar'
import { ListIcon, LogOut, SquarePlusIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
  user: UserInfo
}
const Profile = ({ user }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className='cursor-pointer'>
          <AvatarImage src={user.avatar} className='rounded-full size-10' />
          <AvatarFallback>
            <UserIcon className='rounded-full size-10 text-slate-400' />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className='bg-white shadow-2xl px-2 border-1 rounded font-medium text-slate-600'>
        <div className='flex justify-center items-center gap-3 pt-2.5'>
          <UserIcon className='w-4' />
          <p className='font-semibold'>{user.name}</p>
        </div>

        <div className='[&>*>*>:nth-child(1)]:justify-self-end *:items-center *:gap-3 *:grid *:grid-cols-5 [&>*>span]:col-span-4 [&>*:hover]:bg-sky-500 *:my-2 [&>*]:px-3 *:py-2 *:rounded [&>*:hover]:text-white *:transaction'>
          <Link href='/api/auth/signout'>
            <SquarePlusIcon className='w-4'/>
            <span>Create new post</span>
          </Link>

          <Link href='/user/posts'>
            <ListIcon className='w-4'/>
            <span>View all posts</span>
          </Link>

          <a href='/api/auth/signout'>
            <LogOut className='w-4'/>
            <span>Sign Out</span>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Profile
