import EquipmentsCard from './cards/equipmentsCard/equipmentsCard'
import SchedulesCard from './cards/scheduleCard/equipmentsCard'
import { companies } from '../UserMiniModal/filiation/data'
import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
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

export default function Toggles() {
  const [selectedCompany, setSelectedCompany] = React.useState('')
  const [companyOpen, setCompanyOpen] = React.useState(false)

  return (
    <>
      <div className="mb-4 mt-2">
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
      <div className="flex flex-row gap-4 ">
        <div className="flex flex-col gap-4">
          <EquipmentsCard />
          <EquipmentsCard />
        </div>
        <div className="">
          <SchedulesCard />
        </div>
      </div>
    </>
  )
}
