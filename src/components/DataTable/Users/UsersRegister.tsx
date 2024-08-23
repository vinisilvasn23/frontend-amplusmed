import { UserDTO } from '@/dtos/userDTO'
import { UsersFormModal } from './UsersFormModal'
export type UsersRegisterProps = {
  user?: UserDTO
}

export const UsersRegister = async ({ user }: UsersRegisterProps) => {
  return <UsersFormModal user={user} />
}
