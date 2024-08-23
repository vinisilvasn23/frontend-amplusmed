'use client'
import InputForm from '@/components/Form/Input'
import InputError from '@/components/Form/InputError'
import { DataOption } from '@/components/Form/Option'
import { DataSelect } from '@/components/Form/Select'
import DataModal from '@/components/Modal/DataModaL'
import { useMedicalUnitContext } from '@/contexts/MedicalUnitsContext'
import { useFormState } from 'react-dom'
import { createUnits } from '@/app/(app)/(registers)/unidadesmedicas/actions'
import * as React from 'react'

export const MedicalUnitsFormModal = () => {
  const { setFormModalOpened } = useMedicalUnitContext()
  const [state, formAction] = useFormState(createUnits, null)
  const formRef = React.useRef<HTMLFormElement>(null)

  function onSubmit() {
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      formAction(formData)
    }
  }

  return (
    <DataModal
      open={true}
      title={'Nova unidade médica'}
      titleButton={'Salvar'}
      onClose={() => {
        setFormModalOpened(false)
      }}
      onButtonClick={onSubmit}
      modalType="1200"
      classDiv="create"
    >
      <div>
        <form ref={formRef} className="w-full">
          <div>
            <div className="text-blue-dark-700 dark:text-white font-medium text-20 pt-6 pb-2 px-4 border-b-2">
              Dados Gerais
            </div>
            <div className="border-b-2 my-1">
              <div className="grid grid-cols-3 gap-6 px-4 mt-4 flex-col">
                <>
                  <div className="">
                    <InputForm
                      label="Código"
                      name="code"
                      title="code"
                      id="code"
                      placeholder="Código"
                      classStringLabel="text-18 mt-3 mb-0"
                    />
                    {state?.validation_errors.code ? (
                      <InputError message={state.validation_errors.code[0]} />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <DataSelect
                      labelName="Empresa"
                      name="companyId"
                      title="companyId"
                      id="company"
                      classStringLabel="text-18 mt-3 mb-0"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={100}>100</DataOption>
                    </DataSelect>
                    {state?.validation_errors.companyId ? (
                      <InputError
                        message={state.validation_errors.companyId[0]}
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <DataSelect
                      labelName="Situação"
                      name="situation"
                      title="situation"
                      id="situation"
                      classStringLabel="text-18 mt-3 mb-0"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={1}>Ativa</DataOption>
                      <DataOption value={2}>Inativa</DataOption>
                    </DataSelect>
                    {state?.validation_errors.situation ? (
                      <InputError
                        message={state.validation_errors.situation[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="grid grid-cols-2 gap-6 px-4 mt-8">
                <>
                  <div>
                    <InputForm
                      label="Razão Social"
                      name="name"
                      title="name"
                      id="name"
                      placeholder="Razão Social"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.name ? (
                      <InputError message={state.validation_errors.name[0]} />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="Nome Fantasia"
                      name="fantasyName"
                      title="fantasyName"
                      id="fantasyName"
                      placeholder="Nome Fantasia"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.fantasyName ? (
                      <InputError
                        message={state.validation_errors.fantasyName[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="grid grid-cols-3 gap-6 px-4 mt-8">
                <div>
                  <InputForm
                    label="Nome Responsável"
                    name="responsibleName"
                    title="responsibleName"
                    id="responsibleName"
                    placeholder="Nome Responsável"
                    classStringLabel="text-18 mt-3 mb-0"
                  />
                  {state?.validation_errors.responsibleName ? (
                    <InputError
                      message={state.validation_errors.responsibleName[0]}
                    />
                  ) : null}
                </div>

                <div>
                  <InputForm
                    label="CNPJ"
                    name="responsibleCnpj"
                    title="responsibleCnpj"
                    id="responsibleCnpj"
                    placeholder="00.000.000/0000-00"
                    classStringLabel="text-18 mt-3 mb-0"
                  />
                  {state?.validation_errors.responsibleCnpj ? (
                    <InputError
                      message={state.validation_errors.responsibleCnpj[0]}
                    />
                  ) : null}
                </div>

                <div>
                  <InputForm
                    label="Telefone"
                    name="responsibleTelphone"
                    title="responsibleTelphone"
                    id="responsibleTelphone"
                    placeholder="Telefone"
                    classStringLabel="text-18 mt-3 mb-0"
                  />
                  {state?.validation_errors.responsibleTelphone ? (
                    <InputError
                      message={state.validation_errors.responsibleTelphone[0]}
                    />
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 px-4 mt-8">
                <>
                  <div>
                    <InputForm
                      label="Telefone Responsável"
                      name="responsibleCellphone"
                      title="responsibleCellphone"
                      id="responsibleCellphone"
                      placeholder="Fone Responsável"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.responsibleCellphone ? (
                      <InputError
                        message={
                          state.validation_errors.responsibleCellphone[0]
                        }
                      />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="FAX"
                      name="responsibleFax"
                      title="responsibleFax"
                      id="responsibleFax"
                      placeholder="FAX"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.responsibleFax ? (
                      <InputError
                        message={state.validation_errors.responsibleFax[0]}
                      />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="E-mail"
                      name="responsibleEmail"
                      title="responsibleEmail"
                      id="responsibleEmail"
                      placeholder="Email@domínio.com"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.responsibleEmail ? (
                      <InputError
                        message={state.validation_errors.responsibleEmail[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="text-blue-dark-700 dark:text-white font-medium text-20 pt-6 pb-2 px-4">
                Endereço Atual
              </div>
            </div>
            <div className="border-b-2">
              <div className="grid grid-cols-3 gap-6 px-4 mt-4">
                <>
                  <div>
                    <InputForm
                      label="CEP"
                      name="cep"
                      title="cep"
                      id="cep"
                      placeholder="00000-000"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.cep ? (
                      <InputError message={state.validation_errors.cep[0]} />
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
                    {state?.validation_errors.uf ? (
                      <InputError message={state.validation_errors.uf[0]} />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="Número"
                      name="number"
                      title="number"
                      id="number"
                      placeholder="Número"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.number ? (
                      <InputError message={state.validation_errors.number[0]} />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="grid grid-cols-4 gap-6 px-4 mt-8">
                <>
                  <div>
                    <InputForm
                      label="Rua"
                      name="street"
                      title="street"
                      id="street"
                      placeholder="Rua"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.street ? (
                      <InputError message={state.validation_errors.street[0]} />
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
                      placeholder="Bairro"
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
                Datas de Controle
              </div>
            </div>

            <div className="border-b-2">
              <div className="grid grid-cols-3 gap-6 px-4 mt-8">
                <>
                  <div>
                    <DataSelect
                      labelName="Gera escala"
                      name="generatesScale"
                      title="generatesScale"
                      id="generatesScale"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={1}>Sim</DataOption>
                      <DataOption value={0}>Não</DataOption>
                    </DataSelect>
                    {state?.validation_errors.generatesScale ? (
                      <InputError
                        message={state.validation_errors.generatesScale[0]}
                      />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <DataSelect
                      labelName="Entra na Folha Atual"
                      name="currentSheet"
                      title="currentSheet"
                      id="currentSheet"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={1}>Sim</DataOption>
                      <DataOption value={0}>Não</DataOption>
                    </DataSelect>
                    {state?.validation_errors.currentSheet ? (
                      <InputError
                        message={state.validation_errors.currentSheet[0]}
                      />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="Código Rubrica"
                      name="rubricCode"
                      title="rubricCode"
                      id="rubricCode"
                      placeholder="Código Rubrica"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.rubricCode ? (
                      <InputError
                        message={state.validation_errors.rubricCode[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="grid grid-cols-3 gap-6 px-4 mt-8">
                <>
                  <div>
                    <InputForm
                      label="Valor Plantão Bruto NFSe"
                      name="insertBruteMedicalDutyNFSe"
                      title="insertBruteMedicalDutyNFSe"
                      id="insertBruteMedicalDutyNFSe"
                      placeholder="Valor Plantão Bruto NFSe"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.insertBruteMedicalDutyNFSe ? (
                      <InputError
                        message={
                          state.validation_errors.insertBruteMedicalDutyNFSe[0]
                        }
                      />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="LayOut Escala"
                      name="scaleLayout"
                      title="scaleLayout"
                      id="scaleLayout"
                      placeholder="LayOut Escala"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.scaleLayout ? (
                      <InputError
                        message={state.validation_errors.scaleLayout[0]}
                      />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="Ordem Impressão"
                      name="impressionOrder"
                      title="impressionOrder"
                      id="impressionOrder"
                      placeholder="Ordem Impressão"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.impressionOrder ? (
                      <InputError
                        message={state.validation_errors.impressionOrder[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="text-blue-dark-700 dark:text-white font-medium text-20 pt-6 pb-2 px-4">
                Outras Informações
              </div>
            </div>

            <div className="pb-6">
              <div className="grid grid-cols-2 gap-6 px-4 mt-4">
                <>
                  <div>
                    <InputForm
                      label="Nome Impresso"
                      name="printedName"
                      title="printedName"
                      id="printedName"
                      placeholder="Nome Impresso"
                      classStringLabel="text-18 mt-3 mb-0"
                    />
                    {state?.validation_errors.printedName ? (
                      <InputError
                        message={state.validation_errors.printedName[0]}
                      />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="Pessoa Fat"
                      name="fatPerson"
                      title="fatPerson"
                      id="fatPerson"
                      placeholder="Pessoa Fat"
                      classStringLabel="text-18 mt-3 mb-0"
                    />
                    {state?.validation_errors.fatPerson ? (
                      <InputError
                        message={state.validation_errors.fatPerson[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="grid grid-cols-3 gap-6 px-4 mt-4">
                <>
                  <div>
                    <InputForm
                      label="Grupo Fat"
                      name="fatGroup"
                      title="fatGroup"
                      id="fatGroup"
                      placeholder="Grupo Fat"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                      classStringDiv="min-w-[334px]"
                    />
                    {state?.validation_errors.fatGroup ? (
                      <InputError
                        message={state.validation_errors.fatGroup[0]}
                      />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="Unidade Principal"
                      name="mainUnit"
                      title="mainUnit"
                      id="mainUnit"
                      placeholder="Unidade Principal"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                    />
                    {state?.validation_errors.mainUnit ? (
                      <InputError
                        message={state.validation_errors.mainUnit[0]}
                      />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="Perímetro"
                      name="perimeter"
                      title="perimeter"
                      id="perimeter"
                      placeholder="Perímetro"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0 max-w-[334px]"
                    />
                    {state?.validation_errors.perimeter ? (
                      <InputError
                        message={state.validation_errors.perimeter[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="grid grid-cols-2 gap-6 px-4 mt-8">
                <>
                  <div>
                    <DataSelect
                      labelName="Modelo Frequência"
                      name="frequencyModel"
                      title="frequencyModel"
                      id="frequencyModel"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={'hospital_and_sectors_print'}>
                        Impressão Hospital e Setores
                      </DataOption>
                      <DataOption value={'individual_print_by_sector'}>
                        Impressão Individual por Setor
                      </DataOption>
                      <DataOption value={'individual_print_by_climbed'}>
                        Impressão Individual por Escalado
                      </DataOption>
                    </DataSelect>
                    {state?.validation_errors.frequencyModel ? (
                      <InputError
                        message={state.validation_errors.frequencyModel[0]}
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <DataSelect
                      labelName="Tipo Unidade"
                      name="unitType"
                      title="unitType"
                      id="unitType"
                      classStringLabel="text-18 mt-3 mb-0"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={'Municipal'}>Municipal</DataOption>
                      <DataOption value={'Estadual'}>Estadual</DataOption>
                      <DataOption value={'Federal'}>Federal</DataOption>
                    </DataSelect>
                    {state?.validation_errors.unitType ? (
                      <InputError
                        message={state.validation_errors.unitType[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="grid grid-cols-3 gap-6 px-4 mt-8">
                <>
                  <div>
                    <InputForm
                      label="Nome Nota Fiscal"
                      name="NFSeName"
                      title="NFSeName"
                      id="NFSeName"
                      placeholder="Nome Nota Fiscal"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.NFSeName ? (
                      <InputError
                        message={state.validation_errors.NFSeName[0]}
                      />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="Latitude"
                      name="latitude"
                      title="latitude"
                      id="latitude"
                      placeholder="Latitude"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.latitude ? (
                      <InputError
                        message={state.validation_errors.latitude[0]}
                      />
                    ) : null}
                  </div>
                </>

                <>
                  <div>
                    <InputForm
                      label="Longitude"
                      name="longitude"
                      title="longitude"
                      id="longitude"
                      placeholder="Longitude"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.longitude ? (
                      <InputError
                        message={state.validation_errors.longitude[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
            </div>

            {/* <div className="flex flex-wrap self-center gap-4 justify-end p-4 shrink-0 text-blue-gray-500 ">
              <button
                data-ripple-light="true"
                data-dialog-close="true"
                className="middle none center rounded-lg font-semibold py-2 px-7 font-sans bg-aditional-gray-700 dark:bg-[#878787] text-white shadow-md shadow-blue-dark-600-500/20 transition-all hover:shadow-lg hover:shadow-blue-dark-700-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                className={`middle none center rounded-lg font-semibold py-2 px-11 font-sans bg-blue-700 text-white shadow-md shadow-blue-dark-500-500/20 transition-all hover:shadow-lg hover:shadow-blue-dark-700-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                type="submit"
                // ! setFormModalOpened(false)
              >
                Salvar
              </button>
            </div> */}
          </div>
        </form>
      </div>
    </DataModal>
  )
}
