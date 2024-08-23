'use client'

import * as TableActions from '@/components/DataTable/TableActions'
import { useProfessionalContext } from '@/contexts/ProfessionalContext'
import { ProfessionalDTO } from '@/dtos/professionalsDTO'
import {
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  getGridStringOperators,
} from '@mui/x-data-grid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Grid } from '../Grid'

type ProfessionalDataTableProps = {
  professionals: ProfessionalDTO[]
  total: number
}

export default function ProfessionalsDataTable({
  professionals,
  total,
}: ProfessionalDataTableProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { setProfessionals, setFormModalOpened, setDeleteModalConfirmOpened } =
    useProfessionalContext()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)

  const currentPage = Number(params.get('page')) || 1
  const currentPerPage = Number(params.get('per_page')) || 5

  const equalsOperatorFiler = getGridStringOperators().filter((op) =>
    ['equals'].includes(op.value),
  )

  const containsOperatorFilter = getGridStringOperators().filter((op) =>
    ['contains'].includes(op.value),
  )

  const columns: GridColDef[] = [
    {
      field: 'code',
      headerName: 'Código',
      filterable: true,
      width: 100,
      type: 'string',
      sortable: true,
      filterOperators: equalsOperatorFiler,
    },
    {
      field: 'situation',
      headerName: 'Situação',
      filterable: false,
      width: 100,
      type: 'string',
      sortable: false,
      filterOperators: containsOperatorFilter,
    },
    {
      field: 'seniority',
      headerName: 'Antiguidade',
      filterable: true,
      width: 100,
      type: 'string',
      sortable: true,
      filterOperators: containsOperatorFilter,
    },
    {
      field: 'fullName',
      headerName: 'Nome',
      filterable: true,
      width: 100,
      type: 'string',
      sortable: true,
      filterOperators: containsOperatorFilter,
    },
    {
      field: 'bondType',
      headerName: 'Tipo de Vínculo',
      filterable: true,
      width: 100,
      type: 'string',
      sortable: true,
      filterOperators: containsOperatorFilter,
    },
    {
      field: 'speciality',
      headerName: 'Especialidade',
      filterable: true,
      width: 100,
      type: 'string',
      sortable: true,
    },
    {
      field: 'cellphoneNumber',
      headerName: 'Celular',
      filterable: true,
      width: 100,
      type: 'string',
      sortable: true,
    },
    {
      field: 'admissionDate',
      headerName: 'Data de Admissão',
      filterable: true,
      width: 100,
      type: 'string',
      sortable: true,
    },
    {
      field: 'validated',
      headerName: 'Validado',
      filterable: false,
      width: 100,
      type: 'string',
      sortable: false,
    },
    {
      field: 'fantasyName',
      headerName: 'Nome Fantasia',
      filterable: true,
      width: 100,
      type: 'string',
      sortable: true,
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
            <TableActions.Edit onClick={() => handleEditProfessional(id)} />
            <TableActions.Delete onClick={() => handleDeleteProfessional(id)} />
          </TableActions.Root>
        )
      },
    },
  ]

  function processProfessionals(professionals: ProfessionalDTO[] | undefined) {
    if (!professionals) {
      console.error('Error: Professionals data is undefined')
      return []
    }
    const rows = professionals.map((item) => ({
      code: item.code,
      situation: item.situation,
      seniority: item.seniority,
      fullName: item.fullName,
      bondType: item.bondType,
      speciality: item.speciality,
      cellphoneNumber: item.cellphoneNumber,
      admissionDate: item.admissionDate,
      validated: item.validated,
      fantasyName: item.fantasyName,
    }))

    return rows
  }

  const processedRows = processProfessionals(professionals)
  console.log(processedRows)

  const handleEditProfessional = (professionalId: number) => {
    setProfessionals([professionalId])
    setFormModalOpened(true)
  }

  const handleDeleteProfessional = (professionalId: number) => {
    setProfessionals([professionalId])
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
      rowCount={total}
      getRowId={(processedRows) => processedRows.code}
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
