import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <>
      <Link href='/' className='p-2 font-bold text-2xl cursor-pointer select-none'>My Modern Blog</Link>
      <div className='flex md:flex-row flex-col gap-2 [&>a:hover]:bg-sky-500 ml-auto [&>a]:px-4 [&>a]:py-2 [&>a]:rounded-md [&>a:hover]:text-indigo-100 [&>a]:transition select-none'>
        <Link href='/'>Blog</Link>
        <Link href='#about'>About</Link>
        <Link href='#contact'>Contact</Link>
      </div>
    </>
  )
}

export default Navbar
