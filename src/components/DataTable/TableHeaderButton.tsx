import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TableHeaderButtonProps = ComponentProps<'button'>

export default function TableHeaderButton({
  className,
  ...rest
}: TableHeaderButtonProps) {
  return (
    <button
      className={twMerge(
        `cursor-pointer min-w-8 px-3 py-2 rounded-lg text-white flex items-center justify-center`,
        className,
      )}
      {...rest}
    />
  )
}
