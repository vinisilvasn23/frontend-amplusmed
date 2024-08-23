'use server'

import { z } from 'zod'

const companyPropsSchema = z.object({
  id_user: z.coerce.number().min(1, { message: 'Campo Obrigatório!' }),
  phone: z.coerce.string(),
  name: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  tradeName: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  email: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  cnpj: z.coerce
    .string()
    .min(14, { message: 'CNPJ deve ter no mínimo 14 caracteres!' }),
  cnes: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  status: z.coerce.string(),
  // email: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // postalCode: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // city: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // state: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // complement: z.coerce.string().optional(),
  // streetNumber: z.coerce.number().min(1, { message: 'Campo Obrigatório!' }),
  // gender: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // name: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // fantasyName: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // neighborhood: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // socialReason: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // webAddress: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // president: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // financialPresident: z.coerce
  //   .string()
  //   .min(1, { message: 'Campo Obrigatório!' }),
  // presidentSecretariat: z.coerce
  //   .string()
  //   .min(1, { message: 'Campo Obrigatório!' }),
  // pointRecord: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // payrollNameSendEmailParameters: z.coerce.string().optional(),
  // payrollEmailSendEmailParameters: z.coerce.string().optional(),
  // payrollCommercialPhoneNumberSendEmailParameters: z.coerce.string().optional(),
  // payrollHomePhoneNumberSendEmailParameters: z.coerce.string().optional(),
  // payrollCellphoneSendEmailParameters: z.coerce.string().optional(),
  // payrollGenderSendEmailParameters: z.coerce.string().optional(),
  // payrollContactEmailSendEmailParameters: z.coerce.string().optional(),
  // payrollContactNameSendEmailParameters: z.coerce.string().optional(),
  // payrollContactPhoneNumberSendEmailParameters: z.coerce.string().optional(),
  // payrollDirectorNameSendEmailParameters: z.coerce.string().optional(),
  // payrollDirectorEmailSendEmailParameters: z.coerce.string().optional(),
  // payrollDirectorRoleSendEmailParameters: z.coerce.string().optional(),
  // payrollExtraMessageSendEmailParameters: z.coerce.string().optional(),
  // shiftsExtractNameSendEmailParameters: z.coerce.string().optional(),
  // shiftsExtractEmailSendEmailParameters: z.coerce.string().optional(),
  // shiftsExtractCommercialPhoneNumberSendEmailParameters: z.coerce
  //   .string()
  //   .optional(),
  // shiftsExtractHomePhoneNumberSendEmailParameters: z.coerce.string().optional(),
  // shiftsExtractCellphoneSendEmailParameters: z.coerce.string().optional(),
  // shiftsExtractGenderSendEmailParameters: z.coerce.string().optional(),
  // shiftsExtractContactEmailSendEmailParameters: z.coerce.string().optional(),
  // shiftsExtractContactNameSendEmailParameters: z.coerce.string().optional(),
  // shiftsExtractContactPhoneNumberSendEmailParameters: z.coerce
  //   .string()
  //   .optional(),
  // shiftsExtractDirectorEmailSendEmailParameters: z.coerce.string().optional(),
  // shiftsExtractDirectorRoleSendEmailParameters: z.coerce.string().optional(),
  // shiftsExtractExtraMessageSendEmailParameters: z.coerce.string().optional(),
})

export async function createCompany(_: unknown, formData: FormData) {
  const data = Object.fromEntries(formData.entries())

  const validatedFields = companyPropsSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      message: null,
      validation_errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  return {
    success: true,
    message: 'Validation succeeded',
  }
}
