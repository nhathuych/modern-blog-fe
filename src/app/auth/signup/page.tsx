import Link from 'next/link'
import SignUpForm from './_components/signup-form'

const SignUpPage = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-white shadow-md p-8 rounded-md w-96'>
      <h2 className='mb-4 font-bold text-2xl text-center'>Sign Up Page</h2>

      <SignUpForm/>

      <div>
        <p>Already have an account?</p>
        <Link href='/auth/signin' className='underline'>Sign In</Link>
      </div>
    </div>
  )
}

export default SignUpPage
