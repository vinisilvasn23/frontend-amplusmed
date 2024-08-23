'use server'

import { z } from 'zod'

const schema = z.object({
  name: z.coerce
    .string({
      required_error: 'O nome do usuário é obrigatório',
      invalid_type_error: 'O nome do usuário deve conter apenas caratéres',
    })
    .min(1, 'Campo Obrigatório'),
  email: z.coerce
    .string({
      required_error: 'O email do usuário é obrigatório',
      invalid_type_error: 'O email do usuário deve conter apenas caractéres',
    })
    .email({ message: 'Endereço de email inválido' })
    .min(1, 'Campo Obrigatório'),
  cpf: z.coerce
    .string({
      required_error: 'O CPF do usuário é obrigatório',
    })
    .min(1, 'Campo Obrigatório'),
  password: z.coerce
    .string({
      required_error: 'A senha do usuário é obrigatória',
      invalid_type_error:
        'A senha do usuário deve conter apenas letras e números',
    })
    .min(1, 'Campo Obrigatório'),
  type: z.coerce.string().min(1, { message: 'Campo Obrigatório!' }),
  // userCompany: z.coerce
  //   .string({
  //     required_error: 'A empresa do usuário é obrigatória',
  //     invalid_type_error:
  //       'O nome da empresa do usuário deve conter apenas caractéres',
  //   })
  //   .min(1, 'Campo Obrigatório'),
  // isAdministrator: z.coerce.boolean({
  //   required_error:
  //     'Determinar se um usuário é administrador ou não, é obrigatório',
  //   invalid_type_error: 'O campo deve ser sim ou não',
  // }),
})

export async function createUser(_: unknown, formData: FormData) {
  const data = Object.fromEntries(formData.entries())

  const validatedFields = schema.safeParse(data)

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
