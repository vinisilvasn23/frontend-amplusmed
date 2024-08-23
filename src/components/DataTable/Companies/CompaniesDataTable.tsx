'use client'

import * as TableActions from '@/components/DataTable/TableActions'
import { useCompanyContext } from '@/contexts/CompanyContext'
import { CompanyDTO } from '@/dtos/companyDTO'
import {
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  getGridStringOperators,
} from '@mui/x-data-grid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Grid } from '../Grid'
import { getCompany } from '@/services/Company'
import { useUserContext } from '@/contexts/UserContext'
import { Suspense } from 'react'
import Loading from '@/components/Loading/Loading'
import { CompanyExcluder } from './CompaniesExcluder'

export default function CompaniesDataTable() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {
    setCompany,
    setFormModalOpened,
    setDeleteModalConfirmOpened,
    companiesData,
    page,
    isDeleteModalConfirmOpened,
    company,
  } = useCompanyContext()
  const { replace } = useRouter()
  const { token } = useUserContext()

  async function fetchCompany(companyId: number) {
    if (companyId) {
      const company = await getCompany(companyId, token)
      setCompany(company)
    }
  }

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
    // 8 columns
    {
      field: 'id',
      headerName: 'ID',
      filterable: true,
      width: 106,
      type: 'string',
      sortable: true,
      filterOperators: equalsOperatorFiler,
    },
    {
      field: 'name',
      headerName: 'Nome da Empresa',
      filterable: true,
      width: 196,
      type: 'string',
      sortable: true,
      filterOperators: containsOperatorFilter,
    },
    {
      field: 'tradeName',
      headerName: 'Nome Fantasia',
      filterable: true,
      width: 196,
      type: 'string',
      sortable: true,
      filterOperators: containsOperatorFilter,
    },
    {
      field: 'cnpj',
      headerName: 'CNPJ',
      filterable: true,
      width: 160,
      type: 'string',
      sortable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      filterable: true,
      width: 150,
      type: 'string',
      sortable: false,
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      filterable: true,
      width: 120,
      type: 'string',
      sortable: false,
    },
    {
      field: 'cnes',
      headerName: 'Código CNES',
      filterable: true,
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
            <TableActions.Edit onClick={() => handleEditCompany(id)} />
            <TableActions.Delete onClick={() => handleDeleteCompany(id)} />
          </TableActions.Root>
        )
      },
    },
  ]

  function processCompanies(companiesData: CompanyDTO[] | undefined) {
    if (!companiesData) {
      console.error('Error: Companies data is undefined')
      return []
    }
    const rows = companiesData.map((item) => ({
      id: item.id,
      name: item.name,
      tradeName: item.tradeName,
      cnpj: item.cnpj,
      email: item.email,
      phone: item.phone,
      cnes: item.cnes,
    }))

    return rows
  }

  const processedRows = processCompanies(companiesData)

  const handleEditCompany = (companyId: number) => {
    fetchCompany(companyId)
    setFormModalOpened(true)
  }

  const handleDeleteCompany = (companyId: number) => {
    fetchCompany(companyId)
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
  console.log(isDeleteModalConfirmOpened)

  return (
    <>
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
      <Suspense fallback={<Loading />}>
        {isDeleteModalConfirmOpened && <CompanyExcluder company={company} />}
      </Suspense>
    </>
  )
}
