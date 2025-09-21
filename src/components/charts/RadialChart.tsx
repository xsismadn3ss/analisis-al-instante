import { RadialBar, RadialBarChart, Tooltip } from 'recharts'
import { ChartContainer, type ChartConfig } from '@/components/ui/chart'
import { generateColorPalette } from '@/utils/colors'
import { ChartTooltipContent } from '@/components/ui/ChartTooltipContent'
import type { ChartParameterProcessed } from '@/api/types/chart'
import { removeDuplicateXValues } from '@/utils/chartData'

interface RadialChartProps {
  data: ChartParameterProcessed[]
}

export function RadialChartComponent({ data }: RadialChartProps) {
  const colors = generateColorPalette(data.length)
  const processedData = removeDuplicateXValues(data.flatMap((items) => items.data || []))

  const chartData = processedData.map((d, index) => {
    return {
      x: d.x,
      y: parseFloat(d.y) || 0,
      fill: colors[index]
    }
  })

  const chartConfig: ChartConfig = data.reduce((acc, item, index) => {
    (acc as Record<string, { label: string; color: string }>)[item.x_axis] = {
      label: item.y_axis,
      color: colors[index],
    }
    return acc
  }, {}) as ChartConfig


  return (
    <div className="w-full h-[24rem] p-4">
      <ChartContainer config={chartConfig} className="h-full w-full pb-10">
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={chartData}>
          {chartData.map((entry, index) => (
            <RadialBar
              key={index}
              dataKey="value"
              cornerRadius={4}
              fill={entry.fill}
            />
          ))}
          <Tooltip content={<ChartTooltipContent />} />
        </RadialBarChart>
      </ChartContainer>
    </div>
  )
}
