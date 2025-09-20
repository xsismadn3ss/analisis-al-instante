import { useState } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { removeDuplicateXValues } from '@/utils/chartData'
import { generateColorFromString } from '@/utils/colors'
import { ChartTooltipContent } from '@/components/ui/ChartTooltipContent'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface RadarChartProps {
  data: Array<{ x: string; y: string }>
  title: string
}

export function RadarChartComponent({ data, title }: RadarChartProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const uniqueData = removeDuplicateXValues(data)
  const primaryColor = generateColorFromString(title)
  
  const chartData = uniqueData.map(item => ({
    subject: item.x,
    A: parseFloat(item.y) || 0,
    fullMark: Math.max(...uniqueData.map(d => parseFloat(d.y) || 0)) * 1.2
  }))

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = chartData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(chartData.length / itemsPerPage)

  const chartConfig = {
    A: {
      label: "Valor"
    }
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="w-full p-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <ChartContainer config={chartConfig} className="h-full w-full p-5">
        <RadarChart data={currentItems} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          <PolarGrid stroke="hsl(var(--muted-foreground))" opacity={0.3} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={false}
          />
          <PolarRadiusAxis 
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Valor"
            dataKey="A"
            stroke={primaryColor}
            fill={primaryColor}
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ChartContainer>
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">Página {currentPage} de {totalPages}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
