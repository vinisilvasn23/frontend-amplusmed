export interface CompanyDTO {
  id: number
  tradeName: string
  name: string
  status: string
  phone: string
  cnpj: string
  cnes: string
  email: string
  // postalCode: string
  // city: string
  // state: string
  // complement?: string | undefined
  // streetNumber: number
  // neighborhood: string
  // webAddress: string
  // president: string
  // financialPresident: string
  // presidentSecretariat: string
  // pointRecord: string
  // payrollNameSendEmailParameters?: string
  // payrollEmailSendEmailParameters?: string
  // payrollCommercialPhoneNumberSendEmailParameters?: string
  // payrollHomePhoneNumberSendEmailParameters?: string
  // payrollCellphoneSendEmailParameters?: string
  // payrollGenderSendEmailParameters?: string
  // payrollContactEmailSendEmailParameters?: string
  // payrollContactNameSendEmailParameters?: string
  // payrollContactPhoneNumberSendEmailParameters?: string
  // payrollDirectorNameSendEmailParameters?: string
  // payrollDirectorRoleSendEmailParameters?: string
  // payrollExtraMessageSendEmailParameters?: string
  // shiftsExtractNameSendEmailParameters?: string
  // shiftsExtractEmailSendEmailParameters?: string
  // shiftsExtractCommercialPhoneNumberSendEmailParameters?: string
  // shiftsExtractHomePhoneNumberSendEmailParameters?: string
  // shiftsExtractCellphoneSendEmailParameters?: string
  // shiftsExtractGenderSendEmailParameters?: string
  // shiftsExtractContactEmailSendEmailParameters?: string
  // shiftsExtractContactNameSendEmailParameters?: string
  // shiftsExtractContactPhoneNumberSendEmailParameters?: string
  // shiftsExtractDirectorNameSendEmailParameters?: string
  // shiftsExtractDirectorRoleSendEmailParameters?: string
  // shiftsExtractExtraMessageSendEmailParameters?: string
  // logo?: string | null
  // file?: File
  // key?: string
}

export interface CompanyResponseDTO {
  company: CompanyDTO[]
  page: number
  itemsPerPage: number
  total: number
}
