import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { filiationData } from './data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'

const filiations = filiationData
const count = Object.keys(filiationData).length

export function FiliationTable() {
  return (
    <Card className="w-full p-4 mt-4">
      <CardHeader className="text-xl font-medium -mt-4">
        Lista de afiliações
      </CardHeader>
      <CardDescription className="ml-6 -mt-4">
        Relação de todas as filiações do usuário
      </CardDescription>
      <CardContent>
        <Table className="mt-4 ">
          <TableCaption>{count} Filiações existentes. </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Empresa</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Situação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filiations.map((filiation) => (
              <TableRow key={filiation.company} className="font-medium">
                <TableCell>{filiation.company}</TableCell>
                <TableCell>{filiation.role}</TableCell>
                <TableCell>{filiation.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
