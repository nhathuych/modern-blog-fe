import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='mt-24'>{children}</div>
  )
}

export default Layout
