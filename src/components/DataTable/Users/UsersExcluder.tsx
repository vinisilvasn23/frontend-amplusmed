import { UserDeleteConfirmModal } from './UsersDeleteConfirmModal'
import { UsersRegisterProps } from './UsersRegister'

export const UsersExcluder = async ({ user }: UsersRegisterProps) => {
  return <UserDeleteConfirmModal user={user} />
}
