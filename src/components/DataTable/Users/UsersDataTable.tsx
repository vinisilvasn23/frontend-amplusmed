'use client'

import * as TableActions from '@/components/DataTable/TableActions'
import { useUserContext } from '@/contexts/UserContext'
import { UserDTO } from '@/dtos/userDTO'
import {
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  getGridStringOperators,
} from '@mui/x-data-grid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Grid } from '../Grid'
import { getUserById } from '@/services/User'

export default function UsersDataTable() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {
    usersData,
    setUser,
    setFormModalEdit,
    setDeleteModalConfirmOpened,
    token,
    page,
  } = useUserContext()
  const { replace } = useRouter()

  async function fetchUser(userId: number) {
    if (userId) {
      const user = await getUserById(userId, token)
      setUser(user)
    }
  }

  const params = new URLSearchParams(searchParams)

  const currentPage = Number(params.get('page')) || 1
  const currentPerPage = Number(params.get('per_page')) || 5

  const equalsOperatorFilter = getGridStringOperators().filter((op) =>
    ['equals'].includes(op.value),
  )

  const containsOperatorFilter = getGridStringOperators().filter((op) =>
    ['contains'].includes(op.value),
  )

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      filterable: true,
      sortable: true,
      width: 200,
      filterOperators: equalsOperatorFilter,
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      filterable: true,
      width: 200,
      type: 'string',
      sortable: true,
      filterOperators: containsOperatorFilter,
    },
    {
      field: 'email',
      headerName: 'Email',
      filterable: true,
      width: 200,
      type: 'string',
      sortable: true,
      filterOperators: containsOperatorFilter,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const id = Number(params.id)

        return (
          <TableActions.Root className="flex gap-2">
            <TableActions.Edit onClick={() => handleEditUser(id)} />
            <TableActions.Delete onClick={() => handleDeleteUser(id)} />
          </TableActions.Root>
        )
      },
    },
  ]

  function processUsers(usersData: UserDTO[] | undefined) {
    if (!usersData) {
      console.error('Error: Users data is undefined')
      return []
    }
    const rows = usersData.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      cpf: item.cpf,
    }))

    return rows
  }

  const processedRows = processUsers(usersData)

  const handleEditUser = (userId: number) => {
    fetchUser(userId)
    setFormModalEdit(true)
  }

  const handleDeleteUser = (userId: number) => {
    fetchUser(userId)
    setDeleteModalConfirmOpened(true)
  }

  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel,
  ) => {
    const createPageUrl = (
      pageNumber: number | string,
      perPage: number | string,
    ) => {
      params.set('page', pageNumber.toString())
      params.set('per_page', perPage.toString())
      return `${pathname}?${params.toString()}`
    }

    const page = newPaginationModel.page + 1
    const perPage = newPaginationModel.pageSize

    const newUrl = createPageUrl(page, perPage)
    replace(newUrl)
  }

  const handleSearch = useDebouncedCallback(
    (term: string | undefined, field: string) => {
      if (term) {
        params.set(field, term)
      } else {
        params.delete(field)
      }

      replace(`${pathname}?${params.toString()}`)
    },
  )

  return (
    <Grid
      rows={processedRows}
      rowCount={page}
      getRowId={(processedRows) => processedRows.id}
      columns={columns}
      paginationModel={{
        page: currentPage - 1 || 0,
        pageSize: currentPerPage || 5,
      }}
      onFilterModelChange={(filterModel) => {
        if (filterModel.items.length === 0) {
          return
        }

        const term = filterModel.items[0].value
        const field = filterModel.items[0].field
        handleSearch(term, field)
      }}
      onPaginationModelChange={(newPaginationModel) => {
        handlePaginationModelChange(newPaginationModel)
      }}
    />
  )
}
