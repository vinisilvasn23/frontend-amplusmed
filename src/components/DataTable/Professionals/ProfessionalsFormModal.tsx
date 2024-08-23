'use client'

import { createProfessional } from '@/app/(app)/(registers)/profissionais/actions'
import DataModal from '@/components/Modal/DataModaL'
import { useProfessionalContext } from '@/contexts/ProfessionalContext'
import { useFormState } from 'react-dom'
import * as React from 'react'
import InputForm from '@/components/Form/Input'
import InputError from '@/components/Form/InputError'
import { DataSelect } from '@/components/Form/Select'
import { DataOption } from '@/components/Form/Option'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export const ProfessionalsFormModal = () => {
  const { setFormModalOpened } = useProfessionalContext()
  const [state, formAction] = useFormState(createProfessional, null)
  const [birthDate, setBirthDate] = React.useState<Date>()
  const [firstTurnDate, setFirstTurnDate] = React.useState<Date>()
  const [countryArrivalDate, setCountryArrivalDate] = React.useState<Date>()
  const [graduationDate, setGraduationDate] = React.useState<Date>()
  const [inssDate, setInssDate] = React.useState<Date>()
  const [admissionDate, setAdmissionDate] = React.useState<Date>()
  const [resignationDate, setResignationDate] = React.useState<Date>()
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
      title={'Cadastrar Novo Profissional'}
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
            <div className="text-blue-dark-700 dark:text-white font-bold text-lg pt-6 pb-2 px-4 border-b-2">
              Dados do Profissional
            </div>
            <div className="border-b-2 my-1">
              <div className="grid grid-cols-3 gap-6 px-4 mt-4 flex-col">
                <div className="flex flex-row gap-4">
                  <>
                    <div>
                      <InputForm
                        label="Código"
                        name="code"
                        title="code"
                        id="code"
                        placeholder="Código"
                        classStringLabel="text-18 mt-3 mb-0"
                        classString="mt-0"
                      />
                      {state?.validation_errors.code ? (
                        <InputError message={state.validation_errors.code[0]} />
                      ) : null}
                    </div>
                  </>
                  <>
                    <div>
                      <InputForm
                        label="Situação"
                        name="situation"
                        title="situation"
                        id="situation"
                        placeholder="Situação"
                        classStringLabel="text-18 mt-3 mb-0"
                        classString="mt-0"
                      />
                      {state?.validation_errors.situation ? (
                        <InputError
                          message={state.validation_errors.situation[0]}
                        />
                      ) : null}
                    </div>
                  </>
                </div>
                <div className="flex flex-row gap-4 w-full">
                  <>
                    <div>
                      <DataSelect
                        labelName="Pro-Labore"
                        name="proLabore"
                        title="proLabore"
                        id="proLabore"
                        classStringLabel="text-18 mt-3 mb-0 w-[148px]"
                        classString="mt-0 w-[148px]"
                      >
                        <DataOption value={''}>Selecione</DataOption>
                        <DataOption value={'true'}>Sim</DataOption>
                        <DataOption value={'false'}>Não</DataOption>
                      </DataSelect>
                      {state?.validation_errors.proLabore ? (
                        <InputError
                          message={state.validation_errors.proLabore[0]}
                        />
                      ) : null}
                    </div>
                  </>
                  <>
                    <div>
                      <DataSelect
                        labelName="Desconta INSS"
                        name="inssDeduct"
                        title="inssDeduct"
                        id="inssDeduct"
                        classStringLabel="text-18 mt-3 mb-0 w-[148px]"
                        classString="mt-0 w-[148px]"
                      >
                        <DataOption value={''}>Selecione</DataOption>
                        <DataOption value={'true'}>Sim</DataOption>
                        <DataOption value={'false'}>Não</DataOption>
                      </DataSelect>
                      {state?.validation_errors.inssDeduct ? (
                        <InputError
                          message={state.validation_errors.inssDeduct[0]}
                        />
                      ) : null}
                    </div>
                  </>
                </div>
                {/* <div>this</div> */}
                <div className="flex flex-row gap-4">
                  <>
                    <div>
                      <DataSelect
                        labelName="Tipo de Contrato"
                        name="contractType"
                        title="contractType"
                        id="contractType"
                        classStringLabel="text-18 mt-3 mb-0 w-[148px]"
                        classString="mt-0 w-[148px]"
                      >
                        <DataOption value={''}>Selecione</DataOption>
                        <DataOption value={'pessoaFisica'}>
                          Pessoa Física
                        </DataOption>
                        <DataOption value={'pessoaJuridica'}>
                          Pessoa Jurídica
                        </DataOption>
                      </DataSelect>
                      {state?.validation_errors.contractType ? (
                        <InputError
                          message={state.validation_errors.contractType[0]}
                        />
                      ) : null}
                    </div>
                  </>
                  <>
                    <div>
                      <DataSelect
                        labelName="Tipo de Profissional"
                        name="professionalType"
                        title="professionalType"
                        id="professionalType"
                        classStringLabel="text-18 mt-3 mb-0 w-[148px]"
                        classString="mt-0 w-[148px]"
                      >
                        <DataOption value={''}>Selecione</DataOption>
                        <DataOption value={'conselheiroComissaoEticDisc'}>
                          Conselheiro Comissão de Etíca
                        </DataOption>
                        <DataOption value={'conselheiroFiscal'}>
                          Conselheiro Fiscal
                        </DataOption>
                        <DataOption value={'coordernador'}>
                          Coordenador
                        </DataOption>
                        <DataOption value={'presidente'}>Presidente</DataOption>
                        <DataOption value={'empresa'}>Empresa</DataOption>
                        <DataOption value={'funcionario'}>
                          Funcionário
                        </DataOption>
                        <DataOption value={'residente'}>Residente</DataOption>
                        <DataOption value={'socio'}>Sócio</DataOption>
                      </DataSelect>
                      {state?.validation_errors.professionalType ? (
                        <InputError
                          message={state.validation_errors.professionalType[0]}
                        />
                      ) : null}
                    </div>
                  </>
                </div>
                <>
                  <div>
                    <InputForm
                      label="Atuação"
                      name="professionalOperation"
                      title="professionalOperation"
                      id="professionalOperation"
                      placeholder="Atuação Profissional"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.professionalOperation ? (
                      <InputError
                        message={
                          state.validation_errors.professionalOperation[0]
                        }
                      />
                    ) : null}
                  </div>
                </>
                {/* <div>this</div> */}
                <>
                  <div>
                    <InputForm
                      label="Nome do Pai"
                      name="fathersName"
                      title="fathersName"
                      id="fathersName"
                      placeholder="Nome do Pai"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.fathersName ? (
                      <InputError
                        message={state.validation_errors.fathersName[0]}
                      />
                    ) : null}
                  </div>
                </>{' '}
                <>
                  <div>
                    <InputForm
                      label="Nome da Mãe"
                      name="mothersName"
                      title="mothersName"
                      id="mothersName"
                      placeholder="Nome da Mãe"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.mothersName ? (
                      <InputError
                        message={state.validation_errors.mothersName[0]}
                      />
                    ) : null}
                  </div>
                </>
                {/* <div>this</div> */}
                <>
                  <div>
                    <InputForm
                      label="Antiguidade"
                      name="seniority"
                      title="seniority"
                      id="seniority"
                      placeholder="Antiguidade"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.antique ? (
                      <InputError
                        message={state.validation_errors.antique[0]}
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <DataSelect
                      labelName="Gênero"
                      name="gender"
                      title="gender"
                      id="gender"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={'Masculino'}>Masculino</DataOption>
                      <DataOption value={'Feminino'}>Feminino</DataOption>
                      <DataOption value={'Outro'}>Outro</DataOption>
                    </DataSelect>
                    {state?.validation_errors.gender ? (
                      <InputError message={state.validation_errors.gender[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm /* This is a wip finish that */
                      label="Nome"
                      name="name"
                      title="name"
                      id="name"
                      placeholder="Nome Completo"
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
                      label="CNPJ"
                      name="cnpj"
                      title="cnpj"
                      id="cnpj"
                      placeholder="00.000.000/0001-00"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                      mask="99.999.999/9999-99"
                    />
                    {state?.validation_errors.cnpj ? (
                      <InputError message={state.validation_errors.cnpj[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <DataSelect
                      labelName="Estado Civíl"
                      name="maritalStatus"
                      title="maritalStatus"
                      id="maritalStatus"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    >
                      <DataOption value={''}>Selecione</DataOption>
                      <DataOption value={'solteiro'}>Solteiro(a)</DataOption>
                      <DataOption value={'casado'}>Casado(a)</DataOption>
                      <DataOption value={'divorciado'}>
                        Divorciado(a)
                      </DataOption>
                      <DataOption value={'viuvo'}>Viúvo(a)</DataOption>
                    </DataSelect>
                    {state?.validation_errors.maritalStatus ? (
                      <InputError
                        message={state.validation_errors.maritalStatus[0]}
                      />
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
                <>
                  <div>
                    <InputForm
                      label="E-mail"
                      name="email"
                      title="email"
                      id="email"
                      placeholder="email@provedor.com"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.email ? (
                      <InputError message={state.validation_errors.email[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="WhatsApp"
                      name="whatsapp"
                      title="whatsapp"
                      id="whatsapp"
                      placeholder="+55 (11) 91234-4321"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.whatsApp ? (
                      <InputError
                        message={state.validation_errors.whatsApp[0]}
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Telefone"
                      name="phoneNumber"
                      title="phoneNumber"
                      id="phoneNumber"
                      placeholder="+55 (11) 91234-4321"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.phoneNumber ? (
                      <InputError
                        message={state.validation_errors.phoneNumber[0]}
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div className="flex flex-row gap-4">
                    <Label className=" -mt-[2px] text-lg">
                      Habilita escala?
                    </Label>
                    <Switch id="scaleEnabler"></Switch>
                  </div>
                </>
              </div>
              <div className="text-blue-dark-700 dark:text-white text-lg font-bold mt-4 mb-2 ml-1 ">
                Endereço Atual
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6 px-4 mt-4 flex-col border-b-2">
              <>
                <div>
                  <InputForm
                    label="CEP"
                    name="postalCode"
                    title="postalCode"
                    id="postalCode"
                    placeholder="00000-000"
                    classStringLabel="text-18 mt-3 mb-0"
                    classString="mt-0"
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
                  <DataSelect
                    labelName="Estado"
                    name="state"
                    title="state"
                    id="state"
                    classStringLabel="text-18 mt-3 mb-0"
                    classString="mt-0"
                  >
                    <DataOption value={''}>Selecione</DataOption>
                    <DataOption value={'AC'}>Acre</DataOption>
                    <DataOption value={'AL'}>Alagoas</DataOption>
                    <DataOption value={'AP'}>Amapá</DataOption>
                    <DataOption value={'AM'}>Amazonas</DataOption>
                    <DataOption value={'BA'}>Bahia</DataOption>
                    <DataOption value={'CE'}>Ceará</DataOption>
                    <DataOption value={'DF'}>Distrito Federal</DataOption>
                    <DataOption value={'ES'}>Espírito Santo</DataOption>
                    <DataOption value={'GO'}>Goiás</DataOption>
                    <DataOption value={'MA'}>Maranhão</DataOption>
                    <DataOption value={'MT'}>Mato Grosso</DataOption>
                    <DataOption value={'MS'}>Mato Grosso do Sul</DataOption>
                    <DataOption value={'MG'}>Minas Gerais</DataOption>
                    <DataOption value={'PA'}>Pará</DataOption>
                    <DataOption value={'PB'}>Paraíba</DataOption>
                    <DataOption value={'PR'}>Paraná</DataOption>
                    <DataOption value={'PE'}>Pernambuco</DataOption>
                    <DataOption value={'PI'}>Piauí</DataOption>
                    <DataOption value={'RJ'}>Rio de Janeiro</DataOption>
                    <DataOption value={'RN'}>Rio Grande do Norte</DataOption>
                    <DataOption value={'RS'}>Rio Grande do Sul</DataOption>
                    <DataOption value={'RO'}>Rondônia</DataOption>
                    <DataOption value={'RR'}>Roraima</DataOption>
                    <DataOption value={'SC'}>Santa Catarina</DataOption>
                    <DataOption value={'SP'}>São Paulo</DataOption>
                    <DataOption value={'SE'}>Sergipe</DataOption>
                    <DataOption value={'TO'}>Tocantins</DataOption>
                  </DataSelect>
                  {state?.validation_errors.state ? (
                    <InputError message={state.validation_errors.state[0]} />
                  ) : null}
                </div>
              </>
              <>
                <div>
                  <InputForm
                    label="DDD"
                    name="areaCode"
                    title="areaCode"
                    id="areaCode"
                    placeholder="(00)"
                    classStringLabel="text-18 mt-3 mb-0"
                    classString="mt-0"
                  />
                  {state?.validation_errors.areaCode ? (
                    <InputError message={state.validation_errors.areaCode[0]} />
                  ) : null}
                </div>
              </>
              <>
                <div>
                  <InputForm
                    label="Telefone Residencial"
                    name="phoneNumber"
                    title="phoneNumber"
                    id="phoneNumber"
                    placeholder="91234-4321"
                    classStringLabel="text-18 mt-3 mb-0"
                    classString="mt-0"
                  />
                  {state?.validation_errors.phoneNumber ? (
                    <InputError
                      message={state.validation_errors.phoneNumber[0]}
                    />
                  ) : null}
                </div>
              </>
              <>
                <div>
                  <InputForm
                    label="Rua"
                    name="streetAddress"
                    title="streetAddress"
                    id="streetAddress"
                    placeholder="91234-4321"
                    classStringLabel="text-18 mt-3 mb-0"
                    classString="mt-0"
                  />
                  {state?.validation_errors.streetAddress ? (
                    <InputError
                      message={state.validation_errors.streetAddress[0]}
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
                    classString="mt-0"
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
                    classString="mt-0"
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
                    classString="mt-0"
                  />
                  {state?.validation_errors.complement ? (
                    <InputError
                      message={state.validation_errors.complement[0]}
                    />
                  ) : null}
                </div>
              </>
              <div className="text-blue-dark-700 dark:text-white text-lg font-bold mt-4 mb-2 ml-1 ">
                Documentação
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 px-4 mt-4 flex-col border-b-2">
              <div className="flex flex-row gap-4">
                <>
                  <div>
                    <InputForm
                      label="Nº IPTU"
                      name="iptuNumber"
                      title="iptuNumber"
                      id="iptuNumber"
                      placeholder="000.000.0000-0"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.iptuNumber ? (
                      <InputError
                        message={state.validation_errors.iptuNumber[0]}
                      />
                    ) : null}
                  </div>
                </>{' '}
                <>
                  <div>
                    <InputForm
                      label="Nº INSS"
                      name="inssNumber"
                      title="inssNumber"
                      id="inssNumber"
                      placeholder="000.00000.00-0"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.inssNumber ? (
                      <InputError
                        message={state.validation_errors.inssNumber[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="flex flex-row gap-4">
                <>
                  <div>
                    <InputForm
                      label="Nº CNES"
                      name="cnesNumber"
                      title="cnesNumber"
                      id="cnesNumber"
                      placeholder="0000000"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.cnesNumber ? (
                      <InputError
                        message={state.validation_errors.cnesNumber[0]}
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Nº CNH"
                      name="cnhNumber"
                      title="cnhNumber"
                      id="cnhNumber"
                      placeholder="000000000000"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.cnhNumber ? (
                      <InputError
                        message={state.validation_errors.cnhNumber[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="flex flex-row gap-4">
                <>
                  <div>
                    <InputForm
                      label="Nº Conselho"
                      name="councilNumber"
                      title="councilNumber"
                      id="councilNumber"
                      placeholder="Nº do conselho"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.councilNumber ? (
                      <InputError
                        message={state.validation_errors.councilNumber[0]}
                      />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Nº RQE"
                      name="rqeNumber"
                      title="rqeNumber"
                      id="rqeNumber"
                      placeholder="000000000000"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.rqeNumber ? (
                      <InputError
                        message={state.validation_errors.rqeNumber[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <>
                <div>
                  <InputForm
                    label="CPF"
                    name="cpf"
                    title="cpf"
                    id="cpf"
                    placeholder="000.000.000-00"
                    classStringLabel="text-18 mt-3 mb-0"
                    classString="mt-0"
                  />
                  {state?.validation_errors.cpf ? (
                    <InputError message={state.validation_errors.cpf[0]} />
                  ) : null}
                </div>
              </>
              <>
                <div>
                  <InputForm
                    label="País"
                    name="country"
                    title="country"
                    id="country"
                    placeholder="País de residência"
                    classStringLabel="text-18 mt-3 mb-0"
                    classString="mt-0"
                  />
                  {state?.validation_errors.country ? (
                    <InputError message={state.validation_errors.country[0]} />
                  ) : null}
                </div>
              </>
              <>
                <div>
                  <InputForm
                    label="Naturalidade"
                    name="placeOfBirth"
                    title="placeOfBirth"
                    id="placeOfBirth"
                    placeholder="País de residência"
                    classStringLabel="text-18 mt-3 mb-0"
                    classString="mt-0"
                  />
                  {state?.validation_errors.placeOfBirth ? (
                    <InputError
                      message={state.validation_errors.placeOfBirth[0]}
                    />
                  ) : null}
                </div>
              </>
              <div className="text-blue-dark-700 dark:text-white text-lg font-bold mt-4 mb-2 ml-1 ">
                Datas de Controle
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 px-4 mt-4 flex-col border-b-2">
              <>
                <div>
                  <Label className="text-md text-blue-dark-700 dark:text-white font-semibold mb-1">
                    Nascimento
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full h-[44px] justify-start text-left font-normal',
                          !birthDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {birthDate ? (
                          format(birthDate, "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={setBirthDate}
                      />
                    </PopoverContent>
                  </Popover>
                  {state?.validation_errors.birthDate ? (
                    <InputError
                      message={state.validation_errors.birthDate[0]}
                    />
                  ) : null}
                </div>
              </>
              <>
                <div>
                  <Label className="text-md text-blue-dark-700 dark:text-white font-semibold mb-1">
                    1º Plantão
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full h-[44px] justify-start text-left font-normal',
                          !firstTurnDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {firstTurnDate ? (
                          format(firstTurnDate, "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={firstTurnDate}
                        onSelect={setFirstTurnDate}
                      />
                    </PopoverContent>
                  </Popover>
                  {state?.validation_errors.firstTurnDate ? (
                    <InputError
                      message={state.validation_errors.firstTurnDate[0]}
                    />
                  ) : null}
                </div>
              </>
              <>
                <div>
                  <Label className="text-md text-blue-dark-700 dark:text-white font-semibold mb-1">
                    Chegada no País
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full h-[44px] justify-start text-left font-normal',
                          !countryArrivalDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {countryArrivalDate ? (
                          format(countryArrivalDate, "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={countryArrivalDate}
                        onSelect={setCountryArrivalDate}
                      />
                    </PopoverContent>
                  </Popover>
                  {state?.validation_errors.countryArrival ? (
                    <InputError
                      message={state.validation_errors.countryArrival[0]}
                    />
                  ) : null}
                </div>
              </>
              <>
                <div>
                  <Label className="text-md text-blue-dark-700 dark:text-white font-semibold mb-1">
                    Formatura
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full h-[44px] justify-start text-left font-normal',
                          !graduationDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {graduationDate ? (
                          format(graduationDate, "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={graduationDate}
                        onSelect={setGraduationDate}
                      />
                    </PopoverContent>
                  </Popover>
                  {state?.validation_errors.graduation ? (
                    <InputError
                      message={state.validation_errors.graduation[0]}
                    />
                  ) : null}
                </div>
              </>
              <>
                <div>
                  <Label className="text-md text-blue-dark-700 dark:text-white font-semibold mb-1">
                    Data INSS
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full h-[44px] justify-start text-left font-normal',
                          !inssDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {inssDate ? (
                          format(inssDate, "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={inssDate}
                        onSelect={setInssDate}
                      />
                    </PopoverContent>
                  </Popover>
                  {state?.validation_errors.inssDate ? (
                    <InputError message={state.validation_errors.inssDate[0]} />
                  ) : null}
                </div>
              </>
              <>
                <div>
                  <Label className="text-md text-blue-dark-700 dark:text-white font-semibold mb-1">
                    Admissão
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full h-[44px] justify-start text-left font-normal',
                          !admissionDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {admissionDate ? (
                          format(admissionDate, "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={admissionDate}
                        onSelect={setAdmissionDate}
                      />
                    </PopoverContent>
                  </Popover>
                  {state?.validation_errors.admission ? (
                    <InputError
                      message={state.validation_errors.admission[0]}
                    />
                  ) : null}
                </div>
              </>
              <>
                <div>
                  <Label className="text-md text-blue-dark-700 dark:text-white font-semibold mb-1">
                    Desligamento
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full h-[44px] justify-start text-left font-normal',
                          !resignationDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {resignationDate ? (
                          format(resignationDate, "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={resignationDate}
                        onSelect={setResignationDate}
                      />
                    </PopoverContent>
                  </Popover>
                  {state?.validation_errors.resignation ? (
                    <InputError
                      message={state.validation_errors.resignation[0]}
                    />
                  ) : null}
                </div>
              </>

              {/* grid control */}
              <div></div>
              <div></div>
              {/* grid control */}

              <div className="text-blue-dark-700 dark:text-white text-lg font-bold mt-4 mb-2 ml-1 ">
                Dados Financeiros
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 px-4 mt-4 flex-col pb-4 border-b-2">
              <div className="flex flex-row gap-4">
                <>
                  <div>
                    <InputForm
                      label="C. custo"
                      name="costC"
                      title="costC"
                      id="costC"
                      placeholder="C. Custo"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.costC ? (
                      <InputError message={state.validation_errors.costC[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Banco"
                      name="bank"
                      title="bank"
                      id="bank"
                      placeholder="Nome do Banco"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.bank ? (
                      <InputError message={state.validation_errors.bank[0]} />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="flex flex-row gap-4">
                <>
                  <div>
                    <InputForm
                      label="Agência"
                      name="agency"
                      title="agency"
                      id="agency"
                      placeholder="Nº da Agência"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.agency ? (
                      <InputError message={state.validation_errors.agency[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Conta"
                      name="accountNumber"
                      title="accountNumber"
                      id="accountNumber"
                      placeholder="Nº da Conta"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.accountNumber ? (
                      <InputError
                        message={state.validation_errors.accountNumber[0]}
                      />
                    ) : null}
                  </div>
                </>
              </div>
              <div className="flex flex-row gap-4">
                <>
                  <div>
                    <InputForm
                      label="Dígito"
                      name="dig"
                      title="dig"
                      id="dig"
                      placeholder="Dígito"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.dig ? (
                      <InputError message={state.validation_errors.dig[0]} />
                    ) : null}
                  </div>
                </>
                <>
                  <div>
                    <InputForm
                      label="Valor Cota Parte"
                      name="shareValue"
                      title="shareValue"
                      id="shareValue"
                      placeholder="Valor Cota Parte"
                      classStringLabel="text-18 mt-3 mb-0"
                      classString="mt-0"
                    />
                    {state?.validation_errors.shareValues ? (
                      <InputError
                        message={state.validation_errors.shareValues[0]}
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
                className="middle none center rounded-lg font-semibold py-2 px-7 font-sans bg-aditional-gray-700 dark:bg-[#878787] text-dark-blue-700 border-[1px] shadow-md shadow-blue-dark-600-500/20 transition-all hover:shadow-lg hover:shadow-blue-dark-700-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
          {/* topline is the div */}
        </form>
      </div>
    </DataModal>
  )
}
