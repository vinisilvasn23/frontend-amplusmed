import { ReactNode } from 'react'

interface TableHeaderNavigationProps {
  children: ReactNode
}

export default function TableHeaderNavigation({
  children,
}: TableHeaderNavigationProps) {
  return (
    <ul className="list-none gap-12 flex h-6 whitespace-nowrap overflow-y-hidden w-full px-5">
      {children}
    </ul>
  )
}
