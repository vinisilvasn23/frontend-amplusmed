import DataModal from '@/components/Modal/DataModaL'
import { useUserContext } from '@/contexts/UserContext'
import { deleteUserData } from '@/services/User'
import { UsersRegisterProps } from './UsersRegister'
import { toast } from '@/components/ui/use-toast'

export const UserDeleteConfirmModal = ({ user }: UsersRegisterProps) => {
  const { setDeleteModalConfirmOpened } = useUserContext()

  async function onSubmit() {
    const response = await deleteUserData(user?.id)
    if (response.status) {
      toast({
        title: response.message,
        duration: 4000,
      })
      setDeleteModalConfirmOpened(false)
    }
  }

  return (
    <DataModal
      open={true}
      title={'Deletar unidade médica'}
      titleButton="Excluir"
      classDiv="delete"
      colorButton="red"
      onClose={() => {
        setDeleteModalConfirmOpened(false)
      }}
      onButtonClick={onSubmit}
      modalType={'delete'}
    >
      <div>
        <form className="w-full">
          <div className="flex flex-col gap-6">
            <h2 className="tex-blue-dark-700 font-semibold">
              Tem certeza de que deseja excluir esta unidade médica? Esta ação
              não poderá ser desfeita.
            </h2>
          </div>
        </form>
      </div>
    </DataModal>
  )
}
