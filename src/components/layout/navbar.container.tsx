import { PropsWithChildren } from 'react'
import NavbarDesktop from './navbar.desktop'
import NavbarMobile from './navbar.mobile'

type Props = PropsWithChildren
const NavbarContainer = (props: Props) => {
  return (
    <div className='relative'>
      <NavbarDesktop>{props.children}</NavbarDesktop>
      <NavbarMobile>{props.children}</NavbarMobile>
    </div>
  )
}

export default NavbarContainer
