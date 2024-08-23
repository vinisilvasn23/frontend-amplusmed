'use client'

import { createCompany } from '@/app/(app)/(registers)/empresas/actions'
import DataModal from '@/components/Modal/DataModaL'
import { useCompanyContext } from '@/contexts/CompanyContext'
import { useFormState } from 'react-dom'
import * as React from 'react'
import InputForm, {
  applyMaskCnpj,
  applyMaskPhone,
} from '@/components/Form/Input'
import InputError from '@/components/Form/InputError'
import { DataSelect } from '@/components/Form/Select'
import { DataOption } from '@/components/Form/Option'
import { CompaniesRegisterProps } from './CompaniesRegister'
import { CompanyDTO } from '@/dtos/companyDTO'
import { createCompanyData, editCompanyData } from '@/services/Company'
import { toast } from '@/components/ui/use-toast'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { api } from '@/api/api'
import { useUserContext } from '@/contexts/UserContext'
import { UserDTO } from '@/dtos/userDTO'

export const CompaniesFormModal = ({ company }: CompaniesRegisterProps) => {
  const { setFormModalOpened, setFormModalEdit, setCompany } =
    useCompanyContext()
  const { token } = useUserContext()
  const [state, formAction] = useFormState(createCompany, null)
  const formRef = React.useRef<HTMLFormElement>(null)
  const [users, setUsers] = React.useState<UserDTO[]>([])
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    if (searchTerm.length > 0) {
      const fetchUsers = async () => {
        try {
          console.log(searchTerm)
          const response = await api.get(`/users/search?name=${searchTerm}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setUsers(response.data)
        } catch (error) {
          console.error('Error fetching users:', error)
        }
      }

      fetchUsers()
    } else {
      setUsers([])
    }
  }, [searchTerm, token])

  React.useEffect(() => {
    if (company) {
      Object.keys(company).forEach((key) => {
        const field = formRef.current?.elements.namedItem(
          key,
        ) as HTMLInputElement
        if (field) {
          const value = company[key as keyof CompanyDTO]
          if (key === 'cnpj') {
            field.value = applyMaskCnpj(value)
          } else if (key === 'phone') {
            field.value = applyMaskPhone(value)
          } else {
            field.value =
              typeof value === 'number' ? value.toString() : value || ''
          }
        }
      })
    }
  }, [company])

  async function onSubmit() {
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())
      try {
        let response = null
        formAction(formData)
        const validCompanyForm = await createCompany('', formData)
        if (company && validCompanyForm) {
          response = await editCompanyData(company.id, data)
        }
        if (!company && validCompanyForm) {
          response = await createCompanyData(data)
        }
        if (validCompanyForm && response.status) {
          setFormModalOpened(false)
          setFormModalEdit(false)
          setCompany(undefined)
          toast({
            description: response.message,
            duration: 4000,
          })
        } else {
          toast({
            description: response.message,
            duration: 4000,
            className: 'bg-red-600 text-white border-none'
          })
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        setFormModalOpened(false)
        setFormModalEdit(false)
        setCompany(undefined)
        toast({
          description: 'Ocorreu um erro!',
          duration: 4000,
          className:'bg-red'
        })
      }
    }
  }

  return (
    <DataModal
      open={true}
      title={company ? 'Editar Empresa' : 'Registrar Empresa'}
      titleButton={company ? 'Atualizar' : 'Registrar'}
      onClose={() => {
        setFormModalOpened(false)
        setCompany(undefined)
      }}
      onButtonClick={onSubmit}
      modalType="1200"
      classDiv="create"
    >
      <div>
        <form ref={formRef} className="w-full">
          <div>
            <div className="text-blue-dark-700 dark:text-white font-medium text-20 pt-6 pb-2 px-4 border-b-2">
              Dados da Empresa
            </div>
            <div className="">
              <div className="grid grid-cols-3 gap-6 px-4 mt-4 flex-col">
                <>
                  <div>
                    <InputForm
                      label="Nome da Empresa"
                      name="name"
                      title="name"
                      id="name"
                      placeholder="Nome da Empresa"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors?.name ? (
                      <InputError message={state.validation_errors.name[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Nome Fantasia"
                      name="tradeName"
                      title="tradeName"
                      id="tradeName"
                      placeholder="Nome Fantasia"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors?.tradeName ? (
                      <InputError
                        message={state.validation_errors.tradeName[0]}
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Email"
                      name="email"
                      title="email"
                      id="email"
                      placeholder="seuemail@dominio.com"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-5/12"
                      classStringDiv="min-w-5/12"
                    />
                    {state?.validation_errors?.email ? (
                      <InputError message={state.validation_errors.email[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="CPNJ"
                      name="cnpj"
                      title="cnpj"
                      id="cnpj"
                      placeholder="00.000-000/0000-00"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                      mask="99.999.999/9999-99"
                    />
                    {state?.validation_errors?.cnpj ? (
                      <InputError message={state.validation_errors.cnpj[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Código CNES"
                      name="cnes"
                      title="cnes"
                      id="cnes"
                      placeholder="Código CNES"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors?.cnes ? (
                      <InputError message={state.validation_errors.cnes[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Telefone"
                      name="phone"
                      title="phone"
                      id="phone"
                      placeholder="Telefone"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                      mask="(99) 99999-9999"
                    />
                    {state?.validation_errors?.phone ? (
                      <InputError message={state.validation_errors.phone[0]} />
                    ) : null}
                  </div>
                </>
                {company && (
                  <div>
                    <DataSelect
                      labelName="Situação"
                      name="status"
                      title="status"
                      id="status"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={'true'}>Ativo</DataOption>
                      <DataOption value={'false'}>Inativo</DataOption>
                    </DataSelect>
                    {state?.validation_errors?.status ? (
                      <InputError message={state.validation_errors.status[0]} />
                    ) : null}
                  </div>
                )}
                <div className="flex flex-col pt-4">
                  <InputForm
                    label="Definir Administrador"
                    name="id_user"
                    title="id_user"
                    id="id_user"
                    type="hidden"
                    value={value}
                  />
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        name="id_user"
                        id="id_user"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between h-11"
                      >
                        {value
                          ? users.find((user) => user.id === Number(value))
                              ?.name
                          : 'Buscar usuário...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-56 p-0">
                      <Command>
                        <input
                          type="text"
                          placeholder="Buscar usuário pelo nome..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="p-2 border border-gray-300 rounded"
                        />
                        <CommandList>
                          {searchTerm.length > 0 ? (
                            users.length > 0 ? (
                              <CommandGroup>
                                {users.map((user) => (
                                  <CommandItem
                                    key={user.id}
                                    value={user.id.toString()}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ''
                                          : currentValue,
                                      )
                                      setOpen(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        value === user.id.toString()
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    <div>
                                      <h2 className="font-semibold">
                                        {user.name}
                                      </h2>
                                      <div className="text-slate-500">
                                        Email: {user.email}
                                      </div>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            ) : (
                              <CommandEmpty>
                                Nenhum usuário encontrado.
                              </CommandEmpty>
                            )
                          ) : (
                            <CommandEmpty>Pequise pelo nome...</CommandEmpty>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                {/* <>
                  <div>
                    <DataSelect
                      labelName="Usa Registro de Ponto"
                      name="pointRecord"
                      title="pointRecord"
                      id="pointRecord"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={2}>Sim</DataOption>
                      <DataOption value={1}>Não</DataOption>
                    </DataSelect>
                    {state?.validation_errors.pointRecord ? (
                      <InputError
                        message={state.validation_errors.pointRecord[0]}
                      />
                    ) : null}
                  </div>
                </> */}
                {/* <>
                  <div>
                    <InputForm
                      label="Presidente"
                      name="president"
                      title="president"
                      id="president"
                      placeholder="Nome do Presidente"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.president ? (
                      <InputError
                        message={state.validation_errors.president[0]}
                      />
                    ) : null}
                  </div>
                </>{' '} */}
                {/* <>
                  <div>
                    <InputForm
                      label="Presidente Financeiro"
                      name="financialPresident"
                      title="financialPresident"
                      id="financialPresident"
                      placeholder="Nome do Presidente Financeiro"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.financialPresident ? (
                      <InputError
                        message={state.validation_errors.financialPresident[0]}
                      />
                    ) : null}
                  </div>
                </>{' '} */}
                {/* <>
                  <div>
                    <InputForm
                      label="Presidente Secretariado"
                      name="presidentSecretariat"
                      title="presidentSecretariat"
                      id="presidentSecretariat"
                      placeholder="Nome do Presidente Secretáriado"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.presidentSecretariat ? (
                      <InputError
                        message={
                          state.validation_errors.presidentSecretariat[0]
                        }
                      />
                    ) : null}
                  </div>
                </> */}
              </div>
              {/* <div className="text-blue-dark-700 dark:text-white font-medium text-20 pt-6 pb-2 px-4">
                Endereço Atual
              </div>
            </div>
            <div className="border-b-2">
              <div className="grid grid-cols-3 gap-6 px-4 mt-4">
                <>
                  <div>
                    <InputForm
                      label="CEP"
                      name="postalCode"
                      title="postalCode"
                      id="postalCode"
                      placeholder="00000-000"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                      mask="99999-999"
                    />
                    {state?.validation_errors.postalCode ? (
                      <InputError
                        message={state.validation_errors.postalCode[0]}
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="UF"
                      name="uf"
                      title="uf"
                      id="uf"
                      placeholder="UF"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.state ? (
                      <InputError message={state.validation_errors.state[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Número"
                      name="streetNumber"
                      title="streetNumber"
                      id="streatNumber"
                      placeholder="Número"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.streetNumber ? (
                      <InputError
                        message={state.validation_errors.streetNumber[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="grid grid-cols-4 gap-6 px-4 mt-8">
                <>
                  <div>
                    <InputForm
                      label="Rua"
                      name="address"
                      title="address"
                      id="address"
                      placeholder="Rua"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.address ? (
                      <InputError
                        message={state.validation_errors.address[0]}
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Cidade"
                      name="city"
                      title="city"
                      id="city"
                      placeholder="Cidade"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.city ? (
                      <InputError message={state.validation_errors.city[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Bairro"
                      name="neighborhood"
                      title="neighborhood"
                      id="neighborhood"
                      placeholder="Bairro"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.neighborhood ? (
                      <InputError
                        message={state.validation_errors.neighborhood[0]}
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Complemento"
                      name="complement"
                      title="complement"
                      id="complement"
                      placeholder="Complemento"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.complement ? (
                      <InputError
                        message={state.validation_errors.complement[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="text-blue-dark-700 dark:text-white font-medium text-20 pt-6 pb-2 px-4">
                Parâmetros do Envio de E-mail da Folha de Pagamento
              </div>
            </div>
            <div className="border-b-2">
              <div className="grid grid-cols-4 gap-6 px-4 mt-8">
                <>
                  <div>
                    <InputForm
                      label="Nome"
                      name="payrollNameSendEmailParameters"
                      title="payrollNameSendEmailParameters"
                      id="payrollNameSendEmailParameters"
                      placeholder="Nome"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.payrollNameSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollNameSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="E-mail"
                      name="payrollEmailSendEmailParameters"
                      title="payrollEmailSendEmailParameters"
                      id="payrollEmailSendEmailParameters"
                      placeholder="seuemail@domínio.com"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .payrollEmailSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollEmailSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Telefone Comercial"
                      name="payrollCommercialPhoneNumberSendEmailParameters"
                      title="payrollCommercialPhoneNumberSendEmailParameters"
                      id="payrollCommercialPhoneNumberSendEmailParameters"
                      placeholder=" (00) 0000-0000"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                      mask="(99) 9999-9999"
                    />
                    {state?.validation_errors
                      .payrollCommercialPhoneNumberSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollCommercialPhoneNumberSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Telefone Residencial"
                      name="payrollHomePhoneNumberSendEmailParameters"
                      title="payrollHomePhoneNumberSendEmailParameters"
                      id="payrollHomePhoneNumberSendEmailParameters"
                      placeholder=" (00) 0000-0000"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                      mask="(99) 9999-9999"
                    />
                    {state?.validation_errors
                      .payrollHomePhoneNumberSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollHomePhoneNumberSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Telefone Celular"
                      name="payrollCellphoneSendEmailParameters"
                      title="payrollCellphoneSendEmailParameters"
                      id="payrollCellphoneSendEmailParameters"
                      placeholder=" (00) 00000-0000"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                      mask="(99) 9 9999-9999"
                    />
                    {state?.validation_errors
                      .payrollCellphoneSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollCellphoneSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <DataSelect
                      labelName="Sexo"
                      name="payrollGenderSendEmailParameters"
                      title="payrollGenderSendEmailParameters"
                      id="payrollGenderSendEmailParameters"
                      classStringLabel="text-18 mt-3 mb-0"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={1}>Masculino</DataOption>
                      <DataOption value={2}>Feminino</DataOption>
                    </DataSelect>
                    {state?.validation_errors
                      .payrollGenderSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollGenderSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="E-mail de Contato"
                      name="payrollContactEmailSendEmailParameters"
                      title="payrollContactEmailSendEmailParameters"
                      id="payrollContactEmailSendEmailParameters"
                      placeholder="seuemail@domínio.com"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .payrollContactEmailSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollContactEmailSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Nome do Contato"
                      name="payrollContactNameSendEmailParameters"
                      title="payrollContactNameSendEmailParameters"
                      id="payrollContactNameSendEmailParameters"
                      placeholder="Nome do Contato"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .payrollContactNameSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollContactNameSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="grid grid-cols-2 gap-6 px-4 mt-8">
                <>
                  <div>
                    <InputForm
                      label="Telefone de Contato"
                      name="payrollContactPhoneNumberSendEmailParameters"
                      title="payrollContactPhoneNumberSendEmailParameters"
                      id="payrollContactPhoneNumberSendEmailParameters"
                      placeholder=" (00) 00000-0000"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-full"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .payrollContactPhoneNumberSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollContactPhoneNumberSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="E-mail do Diretor"
                      name="payrollDirectorEmailSendEmailParameters"
                      title="payrollDirectorEmailSendEmailParameters"
                      id="payrollDirectorEmailSendEmailParameters"
                      placeholder="seuemail@dominio.com"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-full"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .payrollDirectorEmailSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollDirectorEmailSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Cargo Diretor"
                      name="payrollDirectorRoleSendEmailParameters"
                      title="payrollDirectorRoleSendEmailParameters"
                      id="payrollDirectorRoleSendEmailParameters"
                      placeholder="Cargo Diretor"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-full"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .payrollDirectorRoleSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollDirectorRoleSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Mensagem Extra"
                      name="payrollExtraMessageSendEmailParameters"
                      title="payrollExtraMessageSendEmailParameters"
                      id="payrollExtraMessageSendEmailParameters"
                      placeholder="Mensagem Extra"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-full"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .payrollExtraMessageSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .payrollExtraMessageSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="text-blue-dark-700 dark:text-white font-medium text-20 pt-6 pb-2 px-4">
                Parâmetros do Envio de E-mail do Extrato de Plantões/Escala
              </div>
            </div>
            <div className="border-b-2">
              <div className="grid grid-cols-4 gap-6 px-4 mt-4">
                <>
                  <div>
                    <InputForm
                      label="Nome"
                      name="shiftsExtractNameSendEmailParameters"
                      title="shiftsExtractNameSendEmailParameters"
                      id="shiftsExtractNameSendEmailParameters"
                      placeholder="Nome"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .shiftsExtractNameSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractNameSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="E-mail"
                      name="shiftsExtractEmailSendEmailParameters"
                      title="shiftsExtractEmailSendEmailParameters"
                      id="shiftsExtractEmailSendEmailParameters"
                      placeholder="seuemail@dominio.com"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .shiftsExtractEmailSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractEmailSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Telefone Comercial"
                      name="shiftsExtractCommercialPhoneNumberSendEmailParameters"
                      title="shiftsExtractCommercialPhoneNumberSendEmailParameters"
                      id="shiftsExtractCommercialPhoneNumberSendEmailParameters"
                      placeholder=" (00) 0000-0000 "
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                      mask="(99) 9999-9999"
                    />
                    {state?.validation_errors
                      .shiftsExtractCommercialPhoneNumberSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractCommercialPhoneNumberSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Telefone Residencial"
                      name="shiftsExtractHomePhoneNumberSendEmailParameters"
                      title="shiftsExtractHomePhoneNumberSendEmailParameters"
                      id="shiftsExtractHomePhoneNumberSendEmailParameters"
                      placeholder=" (00) 0000-0000 "
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                      mask="(99) 9999-9999"
                    />
                    {state?.validation_errors
                      .shiftsExtractHomePhoneNumberSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractHomePhoneNumberSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Telefone Celular"
                      name="shiftsExtractCellphoneSendEmailParameters"
                      title="shiftsExtractCellphoneSendEmailParameters"
                      id="shiftsExtractCellphoneSendEmailParameters"
                      placeholder=" (00) 00000-0000 "
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                      mask="(99) 9 9999-9999"
                    />
                    {state?.validation_errors
                      .shiftsExtractCellphoneSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractCellphoneSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <DataSelect
                      labelName="Sexo"
                      name="shiftsExtractGenderSendEmailParameters"
                      title="shiftsExtractGenderSendEmailParameters"
                      id="shiftsExtractGenderSendEmailParameters"
                      classStringLabel="text-18 mt-3 mb-0"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={1}>Masculino</DataOption>
                      <DataOption value={2}>Feminino</DataOption>
                    </DataSelect>
                    {state?.validation_errors
                      .shiftsExtractGenderSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractGenderSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="E-mail Contato"
                      name="shiftsExtractContactEmailSendEmailParameters"
                      title="shiftsExtractContactEmailSendEmailParameters"
                      id="shiftsExtractContactEmailSendEmailParameters"
                      placeholder="seuemail@dominio.com"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .shiftsExtractContactEmailSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractContactEmailSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Nome Contato"
                      name="shiftsExtractContactNameSendEmailParameters"
                      title="shiftsExtractContactNameSendEmailParameters"
                      id="shiftsExtractContactNameSendEmailParameters"
                      placeholder="Nome Contato"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .shiftsExtractContactNameSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractContactNameSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="grid grid-cols-2 gap-6 px-4 mt-4 mb-4">
                <>
                  <div>
                    <InputForm
                      label="Telefone Contato"
                      name="shiftsExtractContactPhoneNumberSendEmailParameters"
                      title="shiftsExtractContactPhoneNumberSendEmailParameters"
                      id="shiftsExtractContactPhoneNumberSendEmailParameters"
                      placeholder=" (00) 00000-0000 "
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-full"
                      classStringDiv="min-w-[334px]"
                      mask="(99) 9 9999-9999"
                    />
                    {state?.validation_errors
                      .shiftsExtractContactPhoneNumberSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractContactPhoneNumberSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="E-mail Diretor"
                      name="shiftsExtractDirectorEmailSendEmailParameters"
                      title="shiftsExtractDirectorEmailSendEmailParameters"
                      id="shiftsExtractDirectorEmailSendEmailParameters"
                      placeholder=" (00) 00000-0000 "
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-full"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .shiftsExtractDirectorEmailSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractDirectorEmailSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Cargo Diretor"
                      name="shiftsExtractDirectorRoleSendEmailParameters"
                      title="shiftsExtractDirectorRoleSendEmailParameters"
                      id="shiftsExtractDirectorRoleSendEmailParameters"
                      placeholder="Cargo Ditor"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-full"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .shiftsExtractDirectorRoleSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractDirectorRoleSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Mensagem Extra"
                      name="shiftsExtractExtraMessageSendEmailParameters"
                      title="shiftsExtractExtraMessageSendEmailParameters"
                      id="shiftsExtractExtraMessageSendEmailParameters"
                      placeholder="Mensagem Extra"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-full"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors
                      .shiftsExtractExtraMessageSendEmailParameters ? (
                      <InputError
                        message={
                          state.validation_errors
                            .shiftsExtractExtraMessageSendEmailParameters[0]
                        }
                      />
                    ) : null}
                  </div> 
                </>
              </div> */}
            </div>
          </div>

          {/* <div className="flex flex-wrap self-center gap-4 justify-end p-4 shrink-0 text-blue-gray-500 mt-2">
            <button
              data-ripple-light="true"
              data-dialog-close="true"
              className="middle none center rounded-lg font-semibold py-2 px-7 font-sans bg-additional-gray-700 dark:bg-[#878787]"
              type="button"
              onClick={() => {
                setFormModalOpened(false)
              }}
            >
              Cancelar
            </button>
            <button
              data-ripple-light="true"
              data-dialog-close="true"
              className={
                'middle none center rounded-lg font-semibold py-2 px-11 font-sans bg-blue-700 text-white shadow-md shadow-blue-dark-500-500/20 transition-all hover:shadow-lg hover:shadow-blue-dark-700-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              }
              type="submit"
              // ! setFormModalOpened(false)
            >
              Salvar
            </button>
          </div> */}
        </form>
      </div>
    </DataModal>
  )
}
