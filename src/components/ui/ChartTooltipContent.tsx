import { Card } from './card'

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  label?: string
}

export function ChartTooltipContent({ active, payload, label }: ChartTooltipContentProps) {
  if (active && payload && payload.length) {
    return (
      <Card className="p-3 shadow-lg border">
        <div className="space-y-2">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground">
                {entry.dataKey}:
              </span>
              <span className="text-sm font-medium text-foreground">
                {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return null
}
