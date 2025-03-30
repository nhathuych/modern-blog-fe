'use client'
import { PropsWithChildren } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '../ui/sidebar'

type Props = PropsWithChildren
const NavbarMobile = (props: Props) => {

  return (
    <div className='md:hidden'>
      <Sidebar
        tiggerIcon={<Menu className='w-4' />}
        triggerClassName='absolute top-2 left-2'
      >
        {props.children}
      </Sidebar>
    </div>
  )
}

export default NavbarMobile
