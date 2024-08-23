'use server'

import { z } from 'zod'

const schema = z.object({
  companyId: z.coerce.number({
    required_error: 'ID da empresa da unidade médica é obrigatório',
    invalid_type_error:
      'ID da empresa da unidade médica deve estar no formato de String/Number',
  }),
  code: z.coerce
    .number({
      required_error: 'Codigo da unidade médica é obrigatório',
      invalid_type_error: 'Campo deve conter apenas números',
    })
    .min(1, 'Campo Obrigatório'),
  situation: z.coerce
    .number({
      required_error: 'A situação é obrigatória',
      invalid_type_error: 'A situação deve ser "Ativa" ou "Inativa"',
    })
    .min(1, 'Campo Obrigatório'),
  name: z
    .string({
      required_error: 'A razão social da unidade médica é obrigatório',
      invalid_type_error:
        'A razão social da unidade médica deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  fantasyName: z
    .string({
      required_error: 'Nome Fantasia da unidade médica é obrigatório',
      invalid_type_error:
        'Nome Fantasia da unidade médica deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  responsibleName: z
    .string({
      required_error: 'Nome do responsavel pela unidade médica é obrigatório',
      invalid_type_error:
        'Nome do responsavel pela unidade médica deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  responsibleCnpj: z
    .string({
      required_error: 'CNPJ do responsavel pela unidade médica é obrigatório',
      invalid_type_error:
        'CNPJ do responsavel pela unidade médica deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  responsibleTelphone: z
    .string({
      required_error:
        'Telefone do responsavel pela unidade médica é obrigatório',
      invalid_type_error:
        'Telefone do responsavel pela unidade médica deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  responsibleCellphone: z
    .string({
      required_error:
        'Celular do responsavel pela unidade médica é obrigatório',
      invalid_type_error:
        'Celular do responsavel pela unidade médica deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  responsibleFax: z
    .string({
      required_error: 'Fax do responsavel pela unidade médica é obrigatório',
      invalid_type_error:
        'Fax do responsavel pela unidade médica deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  responsibleEmail: z
    .string({
      required_error: 'Email do responsavel é obrigatório',
      invalid_type_error: 'Email do responsavel deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório')
    .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Campo deve ser um email '),
  cep: z.coerce
    .string({
      required_error: 'CEP da unidade médica é obrigatório',
      invalid_type_error:
        'CEP da unidade médica deve estar no formato String/Number',
    })
    .min(1, 'Campo Obrigatório'),
  uf: z
    .string({
      required_error: 'UF da unidade médica é obrigatório',
      invalid_type_error:
        'UF da unidade médica deve estar no formato String/Number',
    })
    .min(1, 'Campo Obrigatório'),
  // ddd: z.string({
  //   required_error: 'DDD da unidade médica é obrigatório',
  //   invalid_type_error: 'DDD da unidade médica deve estar no formato String',
  // }),
  number: z.coerce
    .number({
      required_error: 'Número da unidade médica é obrigatório',
      invalid_type_error:
        'Número da unidade médica deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  street: z
    .string({
      required_error: 'Endereço da unidade médica é obrigatório',
      invalid_type_error:
        'Endereço da unidade médica deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  city: z
    .string({
      required_error: 'Cidade da unidade médica é obrigatório',
      invalid_type_error:
        'Cidade da unidade médica deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  neighborhood: z
    .string({
      required_error: 'Bairro da unidade médica é obrigatório',
      invalid_type_error:
        'Bairroda unidade médica deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  complement: z.string().nullable().default(null),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().nullable().default(null),
  // contractId: z.coerce
  //   .number({
  //     required_error: 'ID do contrato da unidade médica é obrigatório',
  //     invalid_type_error:
  //       'ID do contrato da unidade médica deve estar no formato String/Number',
  //   })
  //   .min(1, 'Campo Obrigatório'),
  generatesScale: z.coerce
    .number({
      required_error: '"Gera escola" é obrigatório',
      invalid_type_error: '"Gera escala" deve ser sim ou não',
    })
    .min(1, 'Campo Obrigatório'),
  currentSheet: z.coerce
    .number({
      required_error: '"Entra na folha Atual" é obrigatório',
      invalid_type_error: '"Entra na folha atual" deve ser sim ou não',
    })
    .min(1, 'Campo Obrigatório'),
  rubricCode: z
    .string({
      required_error: '"Código rubrica" é obrigatório',
      invalid_type_error: '"Codigo rubrica" deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  insertBruteMedicalDutyNFSe: z
    .string({
      required_error: '"Valor plantão bruto NFSe" é obrigatório',
      invalid_type_error:
        '"Valor plantão bruto NFSe" deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  scaleLayout: z
    .string({
      required_error: '"Layout scala" é obrigatório',
      invalid_type_error: '"Layout scala" deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  impressionOrder: z.coerce
    .number({
      required_error: '"Ordem de impressão" é obrigatório',
      invalid_type_error: '"Ordem de impressão" deve conter apenas números',
    })
    .min(1, 'Campo Obrigatório'),
  frequencyModel: z
    .string({
      required_error: '"Modelo de frequência" é obrigatório',
      invalid_type_error: '"Modelo de frequência" deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  printedName: z
    .string({
      required_error: '"Nome impresso" é obrigatório',
      invalid_type_error: '"Nome impresso" deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  fatPerson: z.coerce
    .number({
      required_error: '"Pessoa FAT" é obrigatório',
      invalid_type_error: 'Campo deve ser um número inteiro',
    })
    .min(1, 'Campo Obrigatório'),
  fatGroup: z.coerce
    .number({
      required_error: '"Grupo FAT" é obrigatório',
      invalid_type_error: 'Campo deve ser um número',
    })
    .min(1, 'Campo Obrigatório'),
  mainUnit: z
    .string({
      required_error: '"Unidade principal" é obrigatório',
      invalid_type_error: '"Unidade principal" deve estar no formato String',
    })
    .min(1, 'Campo Obrigatório'),
  perimeter: z.coerce
    .number({
      required_error: '"Perímetro" é obrigatório',
      invalid_type_error: '"Perímetro" deve estar no formato String/Number',
    })
    .min(1, 'Campo Obrigatório'),
  unitType: z.coerce
    .string({
      required_error: '"Tipo unidade" é obrigatório',
      invalid_type_error:
        '"Tipo unidade" deve ser Municipal, Estadual OU Federal',
    })
    .min(1, 'Campo Obrigatório'),
  NFSeName: z
    .string({
      required_error: '"Nome nota fiscal" é obrigatório',
      invalid_type_error: '"Nome nota fiscal" deve conter apenas letras.',
    })
    .min(1, 'Campo Obrigatório'),
  latitude: z.coerce
    .number({
      required_error: '"Latitude" é obrigatório',
      invalid_type_error: '"Latitude" deve estar no formato String/Number',
    })
    .min(1, 'Campo Obrigatório'),
  longitude: z.coerce
    .number({
      required_error: '"Longitude" é obrigatório',
      invalid_type_error: '"Longitude" deve estar no formato String/Number',
    })
    .min(1, 'Campo Obrigatório'),
})

export async function createUnits(_: unknown, formData: FormData) {
  const data = Object.fromEntries(formData)

  const validatedFields = schema.safeParse(data)

  console.log(data)

  if (!validatedFields.success) {
    return {
      success: false,
      message: null,
      validation_errors: validatedFields.error.flatten().fieldErrors,
    }
  }
}
