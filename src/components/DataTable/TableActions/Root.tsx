import { DetailedHTMLProps, HTMLAttributes } from 'react'

type TableActionsRoot = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Root = ({ ...rest }: TableActionsRoot) => {
  return <div {...rest} />
}
