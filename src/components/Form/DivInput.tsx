import { ReactNode } from 'react'

interface DivInputProps {
  children: ReactNode
  classString?: string
}

export default function DivInput({ classString, children }: DivInputProps) {
  return <div className={`${classString} flex flex-col`}>{children}</div>
}
