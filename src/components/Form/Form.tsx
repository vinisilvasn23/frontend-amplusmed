import { HTMLProps, ReactNode } from 'react'

interface FormProps extends HTMLProps<HTMLFormElement> {
  children: ReactNode
  className?: string
}

export default function Form({ className, children, ...props }: FormProps) {
  return (
    <form {...props} className={className}>
      {children}
    </form>
  )
}
