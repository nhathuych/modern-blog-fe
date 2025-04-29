import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex flex-col justify-center items-center mt-24'>{children}</div>
  )
}

export default Layout
