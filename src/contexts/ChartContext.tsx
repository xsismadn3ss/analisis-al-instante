import { createContext, useContext, useState, type ReactNode } from "react"
import { generateSchema } from "@/api/service/chart"
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


interface ChartSchemaContextType {
  schemas: GroupedShcema[]
  isLoading: boolean
  error: string | null
  generateSchemas: (files: File[]) => Promise<void>
  clearData: () => void
}

const ChartContext = createContext<ChartSchemaContextType | undefined>(undefined)

interface ChartProviderProps {
  children: ReactNode
}

export function ChartSchemasProvider({ children }: ChartProviderProps) {
  const [schemas, setSchemas] = useState<GroupedShcema[]>([])
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

  const clearData = () => {
    setSchemas([])
    setError(null)
  }

  return (
    <ChartContext.Provider value={{ 
      schemas, 
      isLoading, 
      error, 
      generateSchemas, 
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
