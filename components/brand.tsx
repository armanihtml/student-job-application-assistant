import { Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Brand({
  className,
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Briefcase className="size-5" aria-hidden="true" />
      </span>
      {showText && (
        <span className="text-base font-semibold tracking-tight text-foreground">
          AutoApply <span className="text-primary">Student</span>
        </span>
      )}
    </div>
  )
}
