import { CompanyDTO } from '@/dtos/companyDTO'
import { CompaniesFormModal } from './CompaniesFormModal'
export type CompaniesRegisterProps = {
  company?: CompanyDTO
}
export const CompaniesRegister = async ({
  company,
}: CompaniesRegisterProps) => {
  return <CompaniesFormModal company={company} />
}
