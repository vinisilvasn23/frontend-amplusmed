import { OptionHTMLAttributes, ReactNode } from 'react'

interface ModalOptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  children: ReactNode
}

export function DataOption({ children, ...rest }: ModalOptionProps) {
  return (
    <option {...rest} className="dark:text-blue-dark-700 text-opacity-20">
      {children}
    </option>
  )
}
