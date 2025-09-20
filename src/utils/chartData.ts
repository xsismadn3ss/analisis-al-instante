import type { Chart } from "@/api/types/chart";
/**
 * Elimina duplicados del eje X manteniendo el último valor
 * @param data - Array de datos con propiedades x e y
 * @returns Array de datos sin duplicados en el eje X
 */
export function removeDuplicateXValues(data: Array<{ x: string; y: string }>): Array<{ x: string; y: string }> {
  const uniqueData = new Map<string, { x: string; y: string }>()
  
  // Iterar en orden para mantener el último valor de cada x
  data.forEach(item => {
    uniqueData.set(item.x, item)
  })
  
  return Array.from(uniqueData.values())
}

/**
 * Agrupa datos por archivo
 * @param charts - Array de gráficas
 * @param files - Array de archivos
 * @returns Objeto con gráficas agrupadas por archivo
 */
export function groupChartsByFile(charts: Chart[], files: File[]): Record<string, Chart[]> {
  const groupedCharts: Record<string, Chart[]> = {}
  
  // Inicializar grupos para cada archivo
  files.forEach(file => {
    groupedCharts[file.name] = []
  })
  
  // Si solo hay un archivo, todas las gráficas van a ese archivo
  if (files.length === 1) {
    groupedCharts[files[0].name] = charts
    return groupedCharts
  }
  
  // Distribuir gráficas entre archivos de manera más inteligente
  // Agrupar por lotes de esquemas por archivo
  const chartsPerFile = Math.ceil(charts.length / files.length)
  
  charts.forEach((chart, index) => {
    const fileIndex = Math.floor(index / chartsPerFile)
    const actualFileIndex = Math.min(fileIndex, files.length - 1)
    const fileName = files[actualFileIndex].name
    groupedCharts[fileName].push(chart)
  })
  
  return groupedCharts
}
