import { createContext, useContext, useState, type ReactNode } from "react"
import { generateSchema, buildChart } from "@/api/service/chart"
import type { ChartSchema, Chart } from "@/api/types/chart"
import { toast } from "sonner"

interface ChartContextType {
  schemas: ChartSchema[]
  charts: Chart[]
  isLoading: boolean
  error: string | null
  generateSchemas: (files: File[]) => Promise<void>
  buildCharts: (schemas: ChartSchema[], files: File[]) => Promise<void>
  clearData: () => void
}

const ChartContext = createContext<ChartContextType | undefined>(undefined)

interface ChartProviderProps {
  children: ReactNode
}

export function ChartProvider({ children }: ChartProviderProps) {
  const [schemas, setSchemas] = useState<ChartSchema[]>([])
  const [charts, setCharts] = useState<Chart[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSchemas = async (files: File[]) => {
    try {
      setIsLoading(true)
      setError(null)
      
      if (files.length === 0) {
        throw new Error('No hay archivos para procesar')
      }
      
      // Crear FormData con el primer archivo (el servidor espera un solo archivo)
      const formData = new FormData()
      formData.append('file', files[0])

      const response = await generateSchema(formData)
      console.log(response.data)
      setSchemas(response.data)
      
      toast.success(`Se generaron ${response.data.length} esquemas de gráficas`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al generar esquemas'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const buildCharts = async (schemas: ChartSchema[], files: File[]) => {
    try {
      setIsLoading(true)
      setError(null)
      setCharts([])
      
      if (files.length === 0) {
        throw new Error('No hay archivos para procesar')
      }
      
      // Generar gráficas para cada archivo
      const allCharts: Chart[] = []
      
      for (const file of files) {
        const fileCharts = await Promise.all(
          schemas.map(async (schema) => {
            // Crear FormData con el archivo actual
            const formData = new FormData()
            formData.append('file', file)

            // Convertir parámetros a JSON string
            const parameters = JSON.stringify(schema.parameter)

            const response = await buildChart(
              schema.title,
              parameters,
              schema.chart_type,
              formData
            )
            console.log(response.data)
            
            return response.data
          })
        )
        
        allCharts.push(...fileCharts)
      }

      setCharts(allCharts)
      
      toast.success(`Se generaron ${allCharts.length} gráficas con datos de ${files.length} archivo${files.length !== 1 ? 's' : ''}`)
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
