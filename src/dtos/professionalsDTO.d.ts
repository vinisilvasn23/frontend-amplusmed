export interface ProfessionalDTO {
  // Professional's data
  name: string
  code: string
  situation: string
  prolabore: string
  inssCharge: boolean
  contractType: string
  bondType: string
  speciality: string
  fathersName: string
  mothersName: string
  seniority: string
  gender: string
  fullName: string
  cnpj: string
  marritalStatus: string
  fantasyName: string
  email: string
  whatsapp: string
  telephone: string

  // Current Address
  cep: string
  state: string
  areaCode: string
  cellphoneNumber: string
  streetAddress: string
  city: string
  neighborhood: string
  complement?: string

  // Documents
  iptuNumber: string
  inssNumber: string
  cnesNumber: string
  cnhNumber: string
  counselNumber: string
  rqeNumber: string
  cpf: string
  country: string
  placeOfBirth: string
  validated: string

  // Control Dates
  birthDate: string
  firstMedicalDuty?: string
  countryArrival?: string
  gradutation: string
  inssDate: string
  admissionDate: string
  dismissalDate: string

  // Financial Data
  costC: string
  bank: string
  bankAgency: string
  bankAccount: string
  bankDig: string

  // Occurrence
  occurrenceDate: string
  startPeriod: string
  endPeriod: string
  occurrenceType: string
  medicalSchedule: string
  financialDepartment: string
  administrativeFees: string
  occurrenceDescription: string
  occurrenceUser: string
  incDT: string
}
