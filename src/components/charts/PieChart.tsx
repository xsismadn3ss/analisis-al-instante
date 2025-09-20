import { Pie, PieChart, Cell, Tooltip } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { removeDuplicateXValues } from '@/utils/chartData'
import { generateColorPalette } from '@/utils/colors'
import { ChartTooltipContent } from '@/components/ui/ChartTooltipContent'

interface PieChartProps {
  data: Array<{ x: string; y: string }>
  title: string
}

export function PieChartComponent({ data, title }: PieChartProps) {
  const uniqueData = removeDuplicateXValues(data)
  const colors = generateColorPalette(uniqueData.length)
  
  const chartData = uniqueData.map((item, index) => ({
    name: item.x,
    value: parseFloat(item.y) || 0,
    color: colors[index]
  }))

  const chartConfig = {
    value: {
      label: "Valor"
    }
  }

  return (
    <div className="w-full h-[25rem] p-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <ChartContainer config={chartConfig} className="h-full w-full pb-5">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ChartContainer>
    </div>
  )
}
