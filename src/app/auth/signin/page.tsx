import Link from 'next/link'
import SignInForm from './_components/signin-form'
import { Button } from '@/components/ui/button'
import { BACKEND_URL } from '@/lib/constants'

const SignInPage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-3 bg-white shadow-md p-8 border rounded-md w-96'>
      <h1 className='mb-4 font-bold text-2xl text-center'>Sign In Page</h1>
      
      <SignInForm/>

      <Link href={'/auth/forgot-password'}>Forgot Your Password?</Link>
      <Button>
        <a href={`${BACKEND_URL}/auth/google/login`}>Sign In with Google</a>
      </Button>
    </div>
  )
}

export default SignInPage
