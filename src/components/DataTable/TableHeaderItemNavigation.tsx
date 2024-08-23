import { DetailedHTMLProps, LiHTMLAttributes } from 'react'

type TableHeaderItemNavigationProps = DetailedHTMLProps<
  LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  message: string
  isSelected: boolean
}

export default function TableHeaderItemNavigation({
  message,
  isSelected,
  ...rest
}: TableHeaderItemNavigationProps) {
  return (
    <li
      data-activated={isSelected}
      className="w-auto data-[activated=true]:text-green-700 relative text-aditional-gray-700 cursor-pointer border-none border-b-[3px] border-green-700 text-16 max-md:text-14 max-sm:text-12 font-semibold pb-7 rounded-tl-md rounded-tr-md hover:text-green-700 dark:text-[#e0e0e0] dark:hover:text-green-700 max-custom-400:min-w-10 text-center"
      {...rest}
    >
      {message}

      {isSelected && (
        <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-green-700"></div>
      )}
    </li>
  )
}
