import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { FileChartGroup } from '@/components/FileChartGroup'
import { ChartSkeleton } from '@/components/ui/ChartSkeleton'
import { useCharts, type GroupedChart } from '@/contexts/ChartContext'
import { useFiles } from '@/contexts/FileContext'

export function Dashboard() {
  const { buildCharts, charts, isLoading, error, schemas } = useCharts()
  const { files } = useFiles()
  const [generatedCharts, setGeneratedCharts] = useState<GroupedChart[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  console.log(schemas)

  useEffect(() => {
    if (schemas.length > 0 && files.length > 0) {
      generateCharts()
    }
  }, [schemas, files])

  const generateCharts = async () => {
    setIsGenerating(true)
    try {
      await buildCharts()
    } catch (err) {
      console.error('Error generando gráficas:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (charts.length > 0) {
      setGeneratedCharts(charts)
    }
  }, [charts])

  if (error) {
    return (
      <Card className="p-6 border-destructive">
        <div className="flex items-center gap-2 text-destructive">
          <div className="h-2 w-2 rounded-full bg-destructive" />
          <p className="font-medium">Error generando gráficas</p>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{error}</p>
      </Card>
    )
  }

  if (isGenerating || isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Generando Dashboard</h2>
          <p className="text-muted-foreground">
            Creando gráficas basadas en tus datos...
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemas.map((_, index) => (
            <ChartSkeleton 
              key={index} 
              title={`Generando gráfica ${index + 1}...`} 
            />
          ))}
        </div>
      </div>
    )
  }

  if (generatedCharts.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <div className="h-8 w-8 text-muted-foreground">📊</div>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          No hay gráficas generadas
        </h3>
        <p className="text-muted-foreground">
          Las gráficas aparecerán aquí una vez que se generen
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-8" id='dashboard-container'>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard de Análisis</h2>
        <p className="text-muted-foreground">
          {charts.length} gráfica{charts.length !== 1 ? 's' : ''} generada{charts.length !== 1 ? 's' : ''} con tus datos
        </p>
      </div>
      
      {/* Gráficas agrupadas por archivo */}
      {charts.map((groupedChart, fileIndex) => (
        <FileChartGroup
          key={groupedChart.file.name}
          fileName={groupedChart.file.name}
          charts={groupedChart.charts}
          fileIndex={fileIndex}
        />
      ))}
    </div>
  )
}
