import React from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

type ItemType = {
  label: string
  value: string
}

type PaginatedSelectProps = {
  fn: (search: string) => Promise<{
    items: ItemType[]
    next: number | null
    prev: number | null
    total: number
  }>
}

const PaginatedSelect: React.FC<PaginatedSelectProps> = ({ fn }) => {
  const loadOptions = async (search: string) => {
    const response = await fn(search)

    return {
      options: response.items,
      hasMore: response.next !== null,
    }
  }

  return <AsyncPaginate loadOptions={loadOptions} />
}

export default PaginatedSelect
