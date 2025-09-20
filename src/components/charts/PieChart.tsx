import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { removeDuplicateXValues } from '@/utils/chartData'
import { generateColorFromString } from '@/utils/colors'
import { ChartTooltipContent } from '@/components/ui/ChartTooltipContent'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PieChartProps {
  data: Array<{ x: string; y: string }>
  title: string
}

export function PieChartComponent({ data, title }: PieChartProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const uniqueData = removeDuplicateXValues(data)
  const chartData = uniqueData.map(item => ({
    name: item.x,
    value: parseFloat(item.y) || 0
  }))

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = chartData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(chartData.length / itemsPerPage)

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="w-full p-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <ChartContainer config={{}} className="h-full w-full p-5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={currentItems}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {currentItems.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={generateColorFromString(entry.name)} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
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
