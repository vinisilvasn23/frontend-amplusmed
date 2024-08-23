'use client'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'

type GridProps = DataGridProps

export const Grid = ({ ...rest }: GridProps) => {
  return (
    <DataGrid
      pageSizeOptions={[5, 10, 15, 25, 30, 35, 40, 45, 50, 100]}
      paginationMode="server"
      filterMode="server"
      rowSelection={false}
      {...rest}
    />
  )
}
