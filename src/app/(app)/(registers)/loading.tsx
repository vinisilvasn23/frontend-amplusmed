import { Skeleton } from '@/components/Skeleton'

export default function Loading() {
  return (
    <div className="h-full space-y-1 mt-1">
      <Skeleton className="h-16" />
      <Skeleton className="h-4/5" />
      <Skeleton className="h-16" />
    </div>
  )
}
