import { Card } from '@/components/ui/card'
import { ChartRenderer } from '@/components/charts/ChartRenderer'
import { FadeIn } from '@/components/ui/FadeIn'
import { FileSpreadsheet } from 'lucide-react'
import type { Chart } from '@/api/types/chart'

export interface FileChartGroupProps {
  fileName: string
  charts: Chart[]
  fileIndex: number
}

export function FileChartGroup({ fileName, charts, fileIndex }: FileChartGroupProps) {
  if (charts.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header del archivo */}
      <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <FileSpreadsheet className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{fileName}</h2>
          <p className="text-sm text-muted-foreground">
            {charts.length} gráfica{charts.length !== 1 ? 's' : ''} generada{charts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Grid de gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charts.map((chart, chartIndex) => (
          <FadeIn 
            key={`${chart.title}-${chartIndex}`} 
            delay={fileIndex * 200 + chartIndex * 100}
            duration={1500}
          >
            <Card className="overflow-hidden">
              <ChartRenderer chart={chart} />
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
