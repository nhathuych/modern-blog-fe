'use client'
import DOMPurify from 'dompurify'
import { useEffect, useState } from 'react'

type Props = {
  content: string
  className?: string
}
const SanitizedContent = (props: Props) => {
  const [cleanHtml, setCleanHtml] = useState('')

  useEffect(() => {
    const sanitizedHtml = DOMPurify.sanitize(props.content)
    setCleanHtml(sanitizedHtml)
  }, [props.content])

  return (
    <div
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
      className={props.className}
    />
  )
}

export default SanitizedContent
