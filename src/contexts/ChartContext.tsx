import { createContext, useContext, useState, type ReactNode } from "react"
import { generateSchema, buildChart } from "@/api/service/chart"
import type { ChartSchema, Chart } from "@/api/types/chart"
import { toast } from "sonner"

export interface GroupedChart{
  file: File
  charts: Chart[]
}


export interface GroupedShcema{
  file: File
  schema: ChartSchema[]
}


interface ChartContextType {
  schemas: GroupedShcema[]
  charts: GroupedChart[]
  isLoading: boolean
  error: string | null
  generateSchemas: (files: File[]) => Promise<void>
  buildCharts: () => Promise<void>
  clearData: () => void
}

const ChartContext = createContext<ChartContextType | undefined>(undefined)

interface ChartProviderProps {
  children: ReactNode
}

export function ChartProvider({ children }: ChartProviderProps) {
  const [schemas, setSchemas] = useState<GroupedShcema[]>([])
  const [charts, setCharts] = useState<GroupedChart[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSchemas = async (files: File[]) => {
    try {
      setIsLoading(true)
      setError(null)
      
      if (files.length === 0) {
        throw new Error('No hay archivos para procesar')
      }
      
      // iterar por archivo
      const groupedSchemas: GroupedShcema[] = []
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        const response = await generateSchema(formData)
        groupedSchemas.push({
          file,
          schema: response.data
        })
      }
      setSchemas(groupedSchemas)
      toast.success(`Se generaron esquemas para ${files.length} archivo${files.length !== 1 ? 's' : ''}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al generar esquemas'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const buildCharts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setCharts([])
      
      // verificar si hay archivos y esquemas
      if (schemas.length === 0 || schemas.some((s)=> s.schema.length === 0)) {
        throw new Error('No hay archivos o esquemas para procesar')
      }
      
      // Generar gráficas para cada archivo
        // Generar gráficas para cada archivo
      const allCharts: GroupedChart[] = []
      
      // iterar por archivo y esquema
      for (const { file, schema } of schemas) {
        const formData = new FormData()
        formData.append('file', file)
        const response = await buildChart(schema, formData)
        allCharts.push({
          file,
          charts: response.data
        })
      }
      setCharts(allCharts)
      // numero de archivos
      const numFiles = schemas.length
      // numero de graficas
      const numCharts = allCharts.reduce((acc, cur) => acc + cur.charts.length, 0)
      toast.success(`Se generaron ${numCharts} gráficas con datos de ${numFiles} archivo${numFiles !== 1 ? 's' : ''}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al construir gráficas'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const clearData = () => {
    setSchemas([])
    setCharts([])
    setError(null)
  }

  return (
    <ChartContext.Provider value={{ 
      schemas, 
      charts, 
      isLoading, 
      error, 
      generateSchemas, 
      buildCharts, 
      clearData 
    }}>
      {children}
    </ChartContext.Provider>
  )
}

export function useCharts() {
  const context = useContext(ChartContext)
  if (context === undefined) {
    throw new Error("useCharts must be used within a ChartProvider")
  }
  return context
}
