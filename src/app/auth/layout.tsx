import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex justify-center items-center bg-slate-100 min-h-screen'>
      {' '}
      {children}
    </div>
  )
}

export default AuthLayout
