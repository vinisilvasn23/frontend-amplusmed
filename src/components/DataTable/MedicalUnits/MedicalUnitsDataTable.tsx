'use client'
import { useMedicalUnitContext } from '@/contexts/MedicalUnitsContext'
import { MedicalUnitImp } from '@/dtos/medical-unit-dto'
import {
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  getGridStringOperators,
} from '@mui/x-data-grid'
import * as TableActions from '@/components/DataTable/TableActions'
import { Grid } from '../Grid'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

type MedicalUnitsDataTableProps = {
  medicalUnits: MedicalUnitImp[]
  total: number
}

export default function MedicalUnitsDataTable({
  medicalUnits,
  total,
}: MedicalUnitsDataTableProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { setMedicalUnits, setFormModalOpened, setDeleteModalCorfirmOpened } =
    useMedicalUnitContext()
  const { replace } = useRouter()

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
      field: 'code',
      headerName: 'Código',
      filterable: true,
      type: 'string',
      sortable: true,
      filterOperators: equalsOperatorFilter,
    },
    {
      field: 'order',
      headerName: 'Ordem',
      filterable: false,
      type: 'string',
      sortable: false,
    },
    {
      field: 'name',
      headerName: 'Nome da Unidade',
      filterable: true,
      width: 200,
      type: 'string',
      sortable: true,
      filterOperators: containsOperatorFilter,
    },
    {
      field: 'fantasyName',
      headerName: 'Nome Fantasia',
      filterable: true,
      width: 200,
      type: 'string',
      sortable: true,
      filterOperators: containsOperatorFilter,
    },
    {
      field: 'scale',
      headerName: 'Escala',
      filterable: false,
      width: 200,
      type: 'string',
      sortable: false,
    },
    {
      field: 'rubric',
      headerName: 'Rúbrica',
      filterable: false,
      width: 200,
      type: 'string',
      sortable: false,
    },
    {
      field: 'latitude',
      headerName: 'Latitude',
      filterable: false,
      width: 200,
      type: 'string',
      sortable: false,
    },
    {
      field: 'longitude',
      headerName: 'Longitude',
      filterable: false,
      width: 200,
      type: 'string',
      sortable: false,
    },
    {
      field: 'perimeter',
      headerName: 'Perímetro',
      filterable: false,
      width: 200,
      type: 'string',
      sortable: false,
    },
    {
      field: 'nsfeGroup',
      headerName: 'GrupoNSFe',
      filterable: false,
      width: 200,
      type: 'string',
      sortable: false,
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
            <TableActions.Edit onClick={() => handleEditMedicalUnit(id)} />
            <TableActions.Delete onClick={() => handleDeleteMedicalUnit(id)} />
          </TableActions.Root>
        )
      },
    },
  ]

  const rows = medicalUnits.map((item) => {
    return {
      id: item.id,
      code: item.code,
      order: item.impressionOrder,
      name: item.name,
      fantasyName: item?.fantasyName,
      scale: item.scaleLayout,
      rubric: item.rubricCode,
      latitude: item.latitude,
      longitude: item.longitude,
      perimeter: item.perimeter,
      nsfeGroup: item.NFSeName,
    }
  })

  const handleEditMedicalUnit = (medicalUnitId: number) => {
    setMedicalUnits([medicalUnitId])
    setFormModalOpened(true)
  }

  const handleDeleteMedicalUnit = (medicalUnitId: number) => {
    setMedicalUnits([medicalUnitId])
    setDeleteModalCorfirmOpened(true)
  }

  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel,
  ) => {
    const page = newPaginationModel.page + 1
    const perPage = newPaginationModel.pageSize

    const newUrl = createPageURL(page, perPage)
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
    500,
  )

  const createPageURL = (
    pageNumber: number | string,
    perPage: number | string,
  ) => {
    params.set('page', pageNumber.toString())
    params.set('per_page', perPage.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <Grid
      rows={rows}
      rowCount={total}
      getRowId={(row) => row.id}
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
