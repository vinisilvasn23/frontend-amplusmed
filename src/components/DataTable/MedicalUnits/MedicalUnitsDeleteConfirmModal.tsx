import DataModal from '@/components/Modal/DataModaL'
import { useMedicalUnitContext } from '@/contexts/MedicalUnitsContext'

export const MedicalDeleteConfirmModal = () => {
  const { setDeleteModalCorfirmOpened } = useMedicalUnitContext()
  return (
    <DataModal
      open={true}
      title={'Deletar unidade médica'}
      titleButton="Excluir"
      classDiv="delete"
      colorButton="red"
      onClose={() => {
        setDeleteModalCorfirmOpened(false)
      }}
      onButtonClick={() => {}}
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
