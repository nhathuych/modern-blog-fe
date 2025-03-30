'use client'
import { cn } from '@/lib/utils'
import { PropsWithChildren, useEffect, useState } from 'react'

type Props = PropsWithChildren
const NavbarDesktop = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    setScrollPosition(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const isScrollDown = scrollPosition > 10
  return (
    <nav className={cn('hidden md:block top-0 z-50 fixed w-full transition-colors text-white', { 'shadow-md bg-white text-gray-700': isScrollDown })}>
      <div className='flex items-center px-4 py-4 container'>
        {props.children}
      </div>
      <hr className='opacity-25 border-gray-100 border-b' />
    </nav>
  )
}

export default NavbarDesktop
