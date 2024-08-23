import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { permissions } from '../equipmentsCard/data/data'

export default function EquipmentsCard() {
  const { title, description } = permissions[0].equipments
  const paramOneTitle = permissions[0].equipments.equipmentType01.paramOneTitle
  const paramOneLabel = permissions[0].equipments.equipmentType01.paramOneLabel
  return (
    <>
      <Card className="w-[355px] h-fit">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between space-x-2">
            <Label
              htmlFor="equipmentDeliver"
              className="flex flex-col space-y-1"
            >
              <span className="font-medium font-sans">{paramOneTitle}</span>
              <span className="font-normal leading-snug text-muted-foreground font-sans">
                {paramOneLabel}
              </span>
            </Label>
            <Switch id="equipmentDeliver" />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
