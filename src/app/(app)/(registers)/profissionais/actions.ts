'use server'

import { z } from 'zod'

const professionalsPropsSchema = z.object({
  // Professional data
  name: z.coerce.string().optional(),
  code: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  situation: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  proLabore: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  inssDeduct: z.coerce.string().min(1, { message: 'Campo obrigatóio.' }),
  contractType: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  professionalType: z.coerce.string().min(1, { message: 'Campo obrigatóio.' }),
  professionalOperation: z.coerce
    .string()
    .min(1, { message: 'Campo obrigatório.' }),
  fathersName: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  mothersName: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  antique: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  gender: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  fullName: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  cnpj: z.coerce
    .string()
    .length(14, { message: 'O CNPJ deve conter 14 números.' }),
  maritalStatus: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  fantasyName: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  email: z.coerce.string().email(),
  whatsApp: z.coerce.string().min(11, {
    message: 'O número do whatsapp deve conter ao menos 11 números.',
  }),
  phoneNumber: z.coerce.string().min(11, {
    message: 'O número de telefone deve conter ao menos 11 números.',
  }),
  scaleManager: z.coerce.boolean(),

  // Latest address
  postalCode: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  state: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  areaCode: z.coerce.number().min(1, { message: 'Campo obrigatório.' }),
  streetNumber: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  streetAddress: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  city: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  neighborhood: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  complement: z.coerce.string().optional(),

  // Documentation
  iptuNumber: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  inssNumber: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  cnesNumber: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  cnhNumber: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  councilNumber: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  rqeNumber: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  cpf: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  country: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  placeOfBirth: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),

  // Control dates
  birthDate: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  firstTurnDate: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  countryArrival: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  graduation: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  inssDate: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  admission: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  resignation: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),

  // Financial data
  costC: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  bank: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  agency: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  accountNumber: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  dig: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
  shareValues: z.coerce.string().min(1, { message: 'Campo obrigatório.' }),
})

export async function createProfessional(_: unknown, formData: FormData) {
  const data = Object.fromEntries(formData)

  const validatedFields = professionalsPropsSchema.safeParse(data)

  console.log(data)

  if (!validatedFields.success) {
    return {
      success: false,
      message: null,
      validation_errors: validatedFields.error.flatten().fieldErrors,
    }
  }
}
