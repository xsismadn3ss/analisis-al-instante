import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart'
import { generateColorPalette } from '@/utils/colors' // Importar generateColorPalette
import type { ChartParameterProcessed } from '@/api/types/chart'

interface PieChartProps {
  data: ChartParameterProcessed[]
  title: string
}

export function PieChartComponent({ data, title }: PieChartProps) {

  const colors = generateColorPalette(data.length) // Generar paleta de colores

  return (
    <div className="w-full h-[21rem] p-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <ChartContainer config={{}} className="h-full w-full pb-5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
