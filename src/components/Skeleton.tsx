import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
export const Skeleton = ({ className, ...rest }: ComponentProps<'div'>) => {
  return (
    <div
      className={twMerge('bg-gray-300 animate-pulse rounded-md', className)}
      {...rest}
    />
  )
}
