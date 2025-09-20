import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { generateColorFromString } from '@/utils/colors'
import { ChartTooltipContent } from '@/components/ui/ChartTooltipContent'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ChartParameterProcessed} from '@/api/types/chart'

interface AreaChartProps {
  data: ChartParameterProcessed[]
  title: string
  xAxisLabel?: string
  yAxisLabel?: string
}

export function AreaChartComponent({ data, title, xAxisLabel, yAxisLabel }: AreaChartProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const transformedData = data.reduce((acc, currentChartParam) => {
    currentChartParam.data.forEach(dataPoint => {
      const existingX = acc.find(item => item.x === dataPoint.x)
      if (existingX) {
        existingX[currentChartParam.y_axis] = parseFloat(dataPoint.y) || 0
      } else {
        acc.push({
          x: dataPoint.x,
          [currentChartParam.y_axis]: parseFloat(dataPoint.y) || 0
        })
      }
    })
    return acc
  }, [] as Record<string, string | number>[])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedData = transformedData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(transformedData.length / itemsPerPage)

  const yAxisKeys = data.map(param => param.y_axis)

  const chartConfig = {
    x: {
      label: xAxisLabel || data[0]?.x_axis || "Eje X"
    },
    y: {
      label: yAxisLabel || data[0]?.y_axis || "Eje Y"
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
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={paginatedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="x"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Tooltip content={<ChartTooltipContent />} />
            {yAxisKeys.map((key) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={generateColorFromString(key)}
                fill={generateColorFromString(key)}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
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
