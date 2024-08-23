'use client'

import { createUser } from '@/app/(app)/(registers)/usuarios/actions'
import InputForm, { applyMaskCpf } from '@/components/Form/Input'
import InputError from '@/components/Form/InputError'
import DataModal from '@/components/Modal/DataModaL'
import { useUserContext } from '@/contexts/UserContext'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button, styled } from '@mui/material'
import { useFormState } from 'react-dom'
// import FullWidthTabs from './UserModalTabs'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import React, { useEffect } from 'react'
import { DataSelect } from '@/components/Form/Select'
import { DataOption } from '@/components/Form/Option'
import { createUserData, editUserData } from '@/services/User'
import { toast } from '@/components/ui/use-toast'
import { UsersRegisterProps } from './UsersRegister'
import { UserDTO } from '@/dtos/userDTO'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export const UsersFormModal = ({ user }: UsersRegisterProps) => {
  const { setFormModalOpened, setFormModalEdit, setUser } = useUserContext()
  const [state, formAction] = useFormState(createUser, null)
  const formRef = React.useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => {
        const field = formRef.current?.elements.namedItem(
          key,
        ) as HTMLInputElement
        if (field && key in user) {
          const value = user[key as keyof UserDTO]
          field.value = field.value =
            key === 'cpf'
              ? applyMaskCpf(value)
              : typeof value === 'number'
                ? value.toString()
                : value || ''
        }
      })
    }
  }, [user])

  async function onSubmit() {
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())
      try {
        let response = null
        formAction(formData)
        const validUserForm = await createUser('', formData)
        if (user && validUserForm) {
          response = await editUserData(user.id, data)
        }
        if (!user && validUserForm) {
          response = await createUserData(data)
        }
        if (validUserForm && response.status) {
          setFormModalOpened(false)
          setFormModalEdit(false)
          setUser(undefined)
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
        setUser(undefined)
        toast({
          description: 'Ocorreu um erro ao processar o usuário!',
          duration: 4000,
        })
      }
    }
  }

  return (
    <DataModal
      open={true}
      title={user ? 'Editar Usuário' : 'Registrar Usuário'}
      titleButton={user ? 'Atualizar' : 'Registrar'}
      onClose={() => {
        setFormModalOpened(false)
        setFormModalEdit(false)
        setUser(undefined)
      }}
      onButtonClick={onSubmit}
      modalType="1200"
      classDiv="create"
    >
      <div>
        <form ref={formRef} className="w-full">
          <div>
            <div className=" my-1">
              <div className="TOPPARTE w-full h-full flex flex-row">
                <div className="h-32 w-32 flex flex-none rounded-full border-4 ml-4 mt-4">
                  <AccountCircleIcon className="w-full h-full opacity-30" />
                </div>
                <div className="ButtonHolder space-x-4 flex-1 grid grid-rows-2 grid-cols-3 justify-around mr-0">
                  <Button
                    component="label"
                    variant="text"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    className="text-blue-700 font-sans font-medium text-lg h-12 mt-8 ml-4 mr-4 justify-start col-start-1 row-start-1 hover:bg-white hover:underline"
                  >
                    Enviar Foto
                    <VisuallyHiddenInput type="file" />
                  </Button>
                  <Button
                    variant="text"
                    tabIndex={-1}
                    startIcon={<DeleteForeverIcon />}
                    className="text-red-700 font-sans font-medium text-lg ml-4 h-12 justify-start col-start-1 row-start-2 hover:bg-white hover:underline"
                  >
                    Excluir
                  </Button>
                </div>
              </div>
              <div className="TOPBUTTONSINPUTS space-x-1 ml-1 mt-8 border-b-2 mr-2">
                {/* <FullWidthTabs />  // todo this  */}
              </div>
              <div className="mt-2 bg-[#F6F6F6] rounded-xl mb-2">
                <div className="grid grid-cols-2 gap-6 px-4 mt-0 flex-col">
                  <>
                    <div>
                      <InputForm
                        label="Nome"
                        name="name"
                        title="name"
                        id="name"
                        placeholder="Nome"
                        classStringLabel="text-18 mt-3 mb-0"
                        classString="mt-0 max-w-5/12"
                        classStringDiv="min-w-5/12"
                      />
                      {state?.validation_errors?.name ? (
                        <InputError message={state.validation_errors.name[0]} />
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
                        <InputError
                          message={state.validation_errors.email[0]}
                        />
                      ) : null}
                    </div>
                  </>
                </div>
                <div className="grid grid-cols-2 gap-6 px-4 mt-4">
                  <>
                    <div>
                      <DataSelect
                        labelName="Tipo de Usuário"
                        name="type"
                        title="type"
                        id="type"
                        classStringLabel="text-18 mt-3 mb-0"
                        classString="mt-0"
                      >
                        <DataOption value={''}>Selecione</DataOption>
                        <DataOption value={2}>Administrador</DataOption>
                        <DataOption value={1}>Funcionário</DataOption>
                      </DataSelect>
                      {state?.validation_errors?.type ? (
                        <InputError message={state.validation_errors.type[0]} />
                      ) : null}
                    </div>
                  </>
                  <>
                    {!user && (
                      <div>
                        <InputForm
                          label="Senha"
                          name="password"
                          title="password"
                          id="password"
                          placeholder="Senha"
                          classStringLabel="text-18 mt-3 mb-0"
                          classString="mt-0 max-w-5/12"
                          classStringDiv="min-w-5/12"
                        />
                        {state?.validation_errors?.password ? (
                          <InputError
                            message={state.validation_errors.password[0]}
                          />
                        ) : null}
                      </div>
                    )}
                  </>
                </div>
                <div className="grid grid-cols-2 gap-6 px-4 mt-4 mb-4 pb-8">
                  <>
                    <div>
                      <InputForm
                        label="CPF"
                        name="cpf"
                        title="cpf"
                        id="cpf"
                        placeholder="CPF"
                        classStringLabel="text-18 mt-3 "
                        classString="mt-0 max-w-5/12"
                        classStringDiv="min-w-5/12"
                        mask="999.999.999/99"
                      />
                      {state?.validation_errors?.cpf ? (
                        <InputError message={state.validation_errors.cpf[0]} />
                      ) : null}
                    </div>
                  </>
                  {/* <>
                    <div>
                      <InputForm
                        label="Empresa"
                        name="userCompany"
                        title="userCompany"
                        id="userCompany"
                        placeholder="Empresa"
                        classStringLabel="text-18 mt-3 "
                        classString="mt-0 max-w-5/12"
                        classStringDiv="min-w-5/12"
                      />
                      {state?.validation_errors.userCompany ? (
                        <InputError
                          message={state.validation_errors.userCompany[0]}
                        />
                      ) : null}
                    </div>
                  </> */}
                </div>
                {/* <div className="w-full p-4 pt-0">
                  <>
                    <DataSelect
                      labelName="Administrador"
                      name="isAdministrator"
                      title="isAdministrator"
                      id="isAdministrator"
                      classStringLabel="text-18 mt-3 mb-0 "
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={'true'}>Sim</DataOption>
                      <DataOption value={'false'}>Não</DataOption>
                    </DataSelect>
                  </>
                </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </DataModal>
  )
}
