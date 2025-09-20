import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { removeDuplicateXValues } from '@/utils/chartData'
import { generateColorFromString } from '@/utils/colors'
import { ChartTooltipContent } from '@/components/ui/ChartTooltipContent'

interface RadarChartProps {
  data: Array<{ x: string; y: string }>
  title: string
}

export function RadarChartComponent({ data, title }: RadarChartProps) {
  const uniqueData = removeDuplicateXValues(data)
  const primaryColor = generateColorFromString(title)
  
  const chartData = uniqueData.map(item => ({
    subject: item.x,
    A: parseFloat(item.y) || 0,
    fullMark: Math.max(...uniqueData.map(d => parseFloat(d.y) || 0)) * 1.2
  }))

  const chartConfig = {
    A: {
      label: "Valor"
    }
  }

  return (
    <div className="w-full h-[25rem] p-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <ChartContainer config={chartConfig} className="h-full w-full p-5">
        <RadarChart data={chartData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          <PolarGrid stroke="hsl(var(--muted-foreground))" opacity={0.3} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
          />
          <PolarRadiusAxis 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
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
    </div>
  )
}
