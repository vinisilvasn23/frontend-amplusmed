import DataModal from '@/components/Modal/DataModaL'
import { useProfessionalContext } from '@/contexts/ProfessionalContext'

export const ProfessionalDeleteConfirmModal = () => {
  const { setDeleteModalConfirmOpened } = useProfessionalContext()
  return (
    <DataModal
      open={true}
      title={'Deletar Profissional'}
      titleButton="Excluir"
      classDiv="delete"
      colorButton="red"
      onClose={() => {
        setDeleteModalConfirmOpened(false)
      }}
      onButtonClick={() => {}}
      modalType={'delete'}
    >
      <div>
        <form className="w-full">
          <div className="flex flex-col gap-6">
            <h2 className="text-blue-dark-700 font-semibold">
              Tem certeza que deseja excluir esse profissional? Esta ação não
              ser desfeita
            </h2>
          </div>
        </form>
      </div>
    </DataModal>
  )
}
