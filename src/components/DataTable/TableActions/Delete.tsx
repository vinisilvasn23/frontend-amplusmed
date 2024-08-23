import DeleteIconLight from '@/assets/DeleteIcon.svg'
import { Tooltip } from '@mui/material'
import Image from 'next/image'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type TableActionsDelete = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Delete = ({ ...rest }: TableActionsDelete) => {
  return (
    <Tooltip title="Deletar">
      <button {...rest}>
        <Image key={'light'} src={DeleteIconLight} alt="" />
      </button>
    </Tooltip>
  )
}
