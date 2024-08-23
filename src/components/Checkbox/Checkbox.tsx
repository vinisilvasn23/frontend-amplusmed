import * as React from 'react'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { fetchPrivilege } from '@/services/Privileges'
import ErrorApp from '@/erros/error'
import { toast } from '../ui/use-toast'
import { PrivilegeContext } from '@/contexts/PrivilegeContext'

// role id
export default function IndeterminateCheckbox() {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({})
  const [permissions, setPermissions] = React.useState<any[]>([])
  const [privilegesIds, setPrivilegesIds] = React.useState<number[]>([])
  const { updateCheckSelected, privilegesUser } =
    React.useContext(PrivilegeContext)

  const handleChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>,
    isParent?: boolean,
  ) => {
    const isChecked = event.target.checked
    if (isParent) {
      // Quando um checkbox pai é clicado, atualize todos os checkboxes filhos
      const updatedChecked: Record<string, boolean> = {}
      permissions.forEach((permission) => {
        if (permission.id === id) {
          permission.Privileges.forEach((item: any) => {
            updatedChecked[item.name] = isChecked // Use item.name para indexar o estado checked
            updatePriviledId(item.id, isChecked)
          })
        }
      })
      setChecked((prevChecked) => ({
        ...prevChecked,
        ...updatedChecked,
      }))
    } else {
      // Quando um checkbox filho é clicado, atualize apenas esse checkbox
      setChecked((prevChecked) => ({
        ...prevChecked,
        [event.target.name]: isChecked, // Use item.name para indexar o estado checked
      }))
      updatePriviledId(id, isChecked)
    }
  }

  const updatePriviledId = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setPrivilegesIds((prevPriviledId) => [...prevPriviledId, id])
      updateCheckSelected([...privilegesIds, id])
    } else {
      const newPriviledId = privilegesIds.filter((privId) => privId !== id)
      setPrivilegesIds(newPriviledId)
      updateCheckSelected(newPriviledId)
    }
  }

  React.useEffect(() => {
    getPrivileges()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (!privilegesUser || privilegesUser.length === 0) {
      // Lógica para desmarcar todos os itens
      const allPermissionsUnchecked = permissions.reduce(
        (acc, permission) => {
          permission.Privileges.forEach((privilege: any) => {
            acc[privilege.name] = false // Use item.name para indexar o estado checked
          })
          return acc
        },
        {} as Record<string, boolean>,
      )

      setChecked(allPermissionsUnchecked)
    } else {
      // Extrai os nomes das permissões marcadas pelo usuário
      const userCheckedNames = privilegesUser.map(
        (privilege: any) => privilege.name,
      )

      // Atualiza o estado checked com base nos nomes das permissões marcadas pelo usuário
      const updatedChecked: Record<string, boolean> = {}
      permissions.forEach((permission) => {
        permission.Privileges.forEach((item: any) => {
          updatedChecked[item.name] = userCheckedNames.includes(item.name) // Use item.name para indexar o estado checked
        })
      })
      setChecked(updatedChecked)
    }
  }, [permissions, privilegesUser])

  async function getPrivileges() {
    try {
      const response = await fetchPrivilege()
      setPermissions(response.data.resource)
    } catch (error) {
      handleError(error)
    }
  }

  const handleError = (error: any) => {
    const isAppError = error instanceof ErrorApp
    const title = isAppError
      ? error.message
      : 'Não foi possível buscar as permissões!'
    console.log(title)
    toast({
      title,
      description: 'Por favor, tente novamente.',
      duration: 4000,
    })
    throw error
  }

  return (
    <>
      {permissions.map((permission) => {
        const allChecked = permission.Privileges.every(
          (item: any) => checked[item.name], // Use item.name para indexar o estado checked
        )
        const indeterminate =
          permission.Privileges.some((item: any) => checked[item.name]) &&
          !allChecked

        return (
          <div key={permission.id}>
            <FormControlLabel
              label={permission.name}
              control={
                <Checkbox
                  checked={allChecked}
                  indeterminate={indeterminate}
                  onChange={(event) => handleChange(permission.id, event, true)}
                />
              }
            />
            {permission.Privileges.map((item: any) => {
              return (
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}
                  key={item.name}
                >
                  <FormControlLabel
                    label={item.description}
                    control={
                      <Checkbox
                        name={item.name} // Use item.name para definir o atributo name
                        checked={checked[item.name] || false}
                        onChange={(event) => handleChange(item.id, event)}
                      />
                    }
                  />
                </Box>
              )
            })}
          </div>
        )
      })}
    </>
  )
}
