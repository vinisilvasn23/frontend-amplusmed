'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { companies, roles } from '../data'

export default function Assigner() {
  const [companyOpen, setCompanyOpen] = React.useState(false)
  const [roleOpen, setRoleOpen] = React.useState(false)
  const [selectedCompany, setSelectedCompany] = React.useState('')
  const [selectedRole, setSelectedRole] = React.useState('')

  return (
    <div className="flex flex-row gap-4 justify-between">
      <div>
        <Popover open={companyOpen} onOpenChange={setCompanyOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={companyOpen}
              className="w-[300px] justify-between"
            >
              {selectedCompany
                ? companies.find((company) => company.value === selectedCompany)
                    ?.label
                : 'Selecionar Empresa'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Pesquisar empresa..." />
              <CommandEmpty>Empresa não encontrada.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {companies.map((company) => (
                    <CommandItem
                      key={company.value}
                      value={company.value}
                      onSelect={(currentValue) => {
                        setSelectedCompany(
                          currentValue === selectedCompany ? '' : currentValue,
                        )
                        setCompanyOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedCompany === company.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {company.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex-1">
        <Popover open={roleOpen} onOpenChange={setRoleOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={roleOpen}
              className="w-[300px] justify-between"
            >
              {selectedRole
                ? roles.find((role) => role.value === selectedRole)?.label
                : 'Selecionar Cargo'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Pesquisar cargo..." />
              <CommandEmpty>Cargo não encontrado.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {roles.map((role) => (
                    <CommandItem
                      key={role.value}
                      value={role.value}
                      onSelect={(currentValue) => {
                        setSelectedRole(
                          currentValue === selectedRole ? '' : currentValue,
                        )
                        setRoleOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedRole === role.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {role.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-500 text-center text-base">
        <PlusCircle className="w-4 h-4 mr-4" />
        <span> Adicionar Filiação </span>
      </Button>
    </div>
  )
}
