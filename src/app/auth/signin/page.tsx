import Link from 'next/link'
import SignInForm from './_components/signin-form'

const SignInPage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-3 bg-white shadow-md p-8 border rounded-md w-96'>
      <h1 className='mb-4 font-bold text-2xl text-center'>Sign In Page</h1>
      
      <SignInForm/>

      <Link href={'/auth/forgot-password'}>Forgot Your Password?</Link>
    </div>
  )
}

export default SignInPage
