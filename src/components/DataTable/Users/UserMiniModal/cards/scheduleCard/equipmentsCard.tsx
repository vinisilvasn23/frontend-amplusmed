import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { permissions } from '../scheduleCard/data/data'

export default function EquipmentsCard() {
  const { title, description } = permissions[0].schedule
  const paramOneTitle = permissions[0].schedule.scheduleType01.paramTitle
  const paramOneLabel = permissions[0].schedule.scheduleType01.paramLabel
  return (
    <>
      <div>
        <Card className="w-[650px] h-[26.063rem]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
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
      </div>
    </>
  )
}
