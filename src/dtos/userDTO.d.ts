export type UserDTO = {
  id: number
  email: string
  name: string
  cpf: number
  type: number
}

export type UserResponseDTO = {
  users: UserDTO[]
  page: number
  itemsPerPage: number
  total: number
}
