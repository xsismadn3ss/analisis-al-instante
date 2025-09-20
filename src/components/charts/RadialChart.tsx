import { RadialBar, RadialBarChart, Tooltip } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { removeDuplicateXValues } from '@/utils/chartData'
import { generateColorPalette } from '@/utils/colors'
import { ChartTooltipContent } from '@/components/ui/ChartTooltipContent'

interface RadialChartProps {
  data: Array<{ x: string; y: string }>
  title: string
}

export function RadialChartComponent({ data, title }: RadialChartProps) {
  const uniqueData = removeDuplicateXValues(data)
  const colors = generateColorPalette(uniqueData.length)
  
  const chartData = uniqueData.map((item, index) => ({
    name: item.x,
    value: parseFloat(item.y) || 0,
    fill: colors[index]
  }))

  const chartConfig = {
    value: {
      label: "Valor"
    }
  }

  return (
    <div className="w-full h-[24rem] p-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
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
