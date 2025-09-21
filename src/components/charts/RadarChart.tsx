import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { generateColorFromString } from '@/utils/colors'
import { ChartTooltipContent } from '@/components/ui/ChartTooltipContent'
import type { ChartParameterProcessed } from '@/api/types/chart'

interface RadarChartProps {
  data: ChartParameterProcessed[]
}

export function RadarChartComponent({ data }: RadarChartProps) {
  const chartData = data.flatMap((item)=>{
    return item.data.map((d)=>{
      return {
        subject: d.x,
        [item.x_axis]: parseFloat(d.y),
      }
    })
  })

  const chartConfig = data.reduce((acc, item) => {
    acc[item.x_axis] = {
      label: item.x_axis,
      color: generateColorFromString(item.x_axis),
    }
    return acc
  }, {} as Record<string, { label: string; color: string }>)

  return (
    <div className="w-full p-4">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <RadarChart data={chartData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
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
            dataKey={data[0]?.x_axis || 'x'}
            stroke={chartConfig[data[0].x_axis].color}
            fill={chartConfig[data[0].x_axis].color}
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ChartContainer>
    </div>
  )
}
