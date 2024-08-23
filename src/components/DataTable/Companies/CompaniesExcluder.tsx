import { CompanyDeleteConfirmModal } from './CompaniesDeleteConfirmModal'
import { CompaniesRegisterProps } from './CompaniesRegister'

export const CompanyExcluder = async ({ company }: CompaniesRegisterProps) => {
  return <CompanyDeleteConfirmModal company={company} />
}
