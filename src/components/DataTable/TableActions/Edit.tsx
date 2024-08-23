import EditIconLight from '@/assets/EditIcon.svg'
import { Tooltip } from '@mui/material'
import Image from 'next/image'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type TableActionsEdit = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Edit = ({ ...rest }: TableActionsEdit) => {
  return (
    <Tooltip title="Editar">
      <button {...rest}>
        <Image key={'light'} src={EditIconLight} alt="" />
      </button>
    </Tooltip>
  )
}
