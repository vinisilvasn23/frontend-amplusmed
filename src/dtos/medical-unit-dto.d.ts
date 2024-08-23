export enum MedicalUnitSituation {
  Active = 1,
  Inactive = 0,
}

export enum MedicalUnitGenerateScale {
  Yes = 1,
  No = 0,
}

export enum MedicalUnitIsInCurrentSheet {
  Yes = 1,
  No = 0,
}

export enum MedicalUnitType {
  Hospital = 0,
}

export interface MedicalUnitImp {
  id: number
  companyId: number
  code: number
  situation: MedicalUnitSituation
  name: string
  fantasyName: string
  responsibleName: string
  responsibleCnpj: string
  responsibleTelphone: string | null
  responsibleCellphone: string
  responsibleFax: string | null
  responsibleEmail: string
  cep: string
  uf: string
  ddd: string
  number: number
  street: string
  city: string
  neighborhood: string
  complement: string | null
  createdAt: Date
  updatedAt: Date | null
  contractId: number
  generatesScale: MedicalUnitGenerateScale
  currentSheet: MedicalUnitIsInCurrentSheet
  rubricCode: string
  insertBruteMedicalDutyNFSe: string
  scaleLayout: string
  impressionOrder: number
  frequencyModel: string
  printedName: string
  fatPerson: number
  fatGroup: number
  mainUnit: string
  perimeter: number
  unitType: MedicalUnitType
  NFSeName: string
  latitude: number
  longitude: number
}
