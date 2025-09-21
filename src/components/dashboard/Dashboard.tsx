import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { ChartSkeleton } from '@/components/ui/ChartSkeleton'
import { useCharts } from '@/contexts/ChartSchemaContext'
import SchemaChartGroup from './SchemaChartGroup'
import { FadeIn } from '../ui/FadeIn'
import FileCard from './FileCard'
import DashBoardNavMenu from './NavigationMenu'

export function Dashboard() {
  const { error, schemas } = useCharts()
  const [isLoaded, setIsLoaded] = useState(false)
  console.log(schemas)

  useEffect(() => {
    if (schemas.length > 0) {
      setIsLoaded(true)
      document.getElementById('dashboard-container')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [schemas])

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

  if (isLoaded === false) {
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

  if (isLoaded) {
    return (
      <FadeIn>
        <div className='space-y-8' id='dashboard-container'>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard de Análisis</h2>
            <p className="text-muted-foreground">
              Esquemas generados con tus datos
            </p>
          </div>
          <DashBoardNavMenu files={schemas.map(s => s.file)} />
          {schemas.map((s, index) => (
            <>
              <FileCard key={index} file={s.file} />
              <SchemaChartGroup key={index} schemas={s.schema} file={s.file} />
            </>
          ))}
        </div>
      </FadeIn>
    )
  }
}
