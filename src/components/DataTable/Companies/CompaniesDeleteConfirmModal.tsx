import DataModal from '@/components/Modal/DataModaL'
import { useCompanyContext } from '@/contexts/CompanyContext'
import { deleteCompanyData } from '@/services/Company'
import { CompaniesRegisterProps } from './CompaniesRegister'
import { toast } from '@/components/ui/use-toast'

export const CompanyDeleteConfirmModal = ({
  company,
}: CompaniesRegisterProps) => {
  const { setDeleteModalConfirmOpened } = useCompanyContext()

  async function onSubmit() {
    const response = await deleteCompanyData(company?.id)
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
      title={'Deletar Empresa'}
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
            <h2 className="text-blue-dark-700 font-semibold">
              Tem certeza que deseja excluir essa empresa? Esta ação não pode
              ser desfeita
            </h2>
          </div>
        </form>
      </div>
    </DataModal>
  )
}
