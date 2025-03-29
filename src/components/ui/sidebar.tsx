'use client'
import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts';

type Props = PropsWithChildren<{
  tiggerIcon: ReactNode;
  triggerClassName?: string;
}>
const Sidebar = (props: Props) => {
  const [isShown, setIsShown] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setIsShown(false))

  return (
    <>
      <button
        onClick={() => setIsShown((prev) => !prev)}
        className={props.triggerClassName}
      >
        {props.tiggerIcon}
      </button>
      <div
        ref={ref}
        className={
          cn('top-0 z-50 absolute drop-shadow-2xl bg-white rounded-r-md w-60 min-h-screen transition-all duration-200', {
            '-left-full': !isShown,
            'left-0': isShown
          }
        )}
      >
        {props.children}
      </div>
    </>
  )
}

export default Sidebar
