import { useState } from 'react'
import { Line, LineChart, CartesianGrid, XAxis, Tooltip } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { removeDuplicateXValues } from '@/utils/chartData'
import { generateColorFromString } from '@/utils/colors'
import { ChartTooltipContent } from '@/components/ui/ChartTooltipContent'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface LineChartProps {
  data: Array<{ x: string; y: string }>
  title: string
  xAxisLabel?: string
  yAxisLabel?: string
}

export function LineChartComponent({ data, title, xAxisLabel, yAxisLabel }: LineChartProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const uniqueData = removeDuplicateXValues(data)
  const chartData = uniqueData.map(item => ({
    x: item.x,
    y: parseFloat(item.y) || 0
  }))
  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = chartData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(chartData.length / itemsPerPage)
  
  const primaryColor = generateColorFromString(title)

  const chartConfig = {
    x: {
      label: xAxisLabel || "Eje X"
    },
    y: {
      label: yAxisLabel || "Eje Y"
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
      <ChartContainer config={chartConfig} className="h-full w-full pb-2">
        <LineChart data={currentItems}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="x"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone" 
            dataKey="y" 
            stroke={primaryColor} 
            strokeWidth={2}
            dot={{ fill: primaryColor, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: primaryColor, strokeWidth: 2 }}
          />
        </LineChart>
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
