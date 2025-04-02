import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'

type ButtonProps = React.ComponentProps<typeof Button>
const SubmitButton = ({ children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      {...props}
      type='submit'
      aria-disabled={pending}
    >
      {pending ? <span className='animate-pulse'>Submitting</span> : children}
    </Button>
  )
}

export default SubmitButton
