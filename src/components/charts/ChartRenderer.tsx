import { BarChartComponent } from './BarChart'
import { LineChartComponent } from './LineChart'
import { AreaChartComponent } from './AreaChart'
import { PieChartComponent } from './PieChart'
import { RadarChartComponent } from './RadarChart'
import type { Chart } from '@/api/types/chart'

interface ChartRendererProps {
  chart: Chart
}

export function ChartRenderer({ chart }: ChartRendererProps) {
  const { title, chart_type, data } = chart

  const chartData = data[0]?.data || []

  const renderChart = () => {
    switch (chart_type) {
      case 'area_chart':
        return (
          <AreaChartComponent
            data={chartData} 
            title={title}
            xAxisLabel={data[0]?.x_axis}
            yAxisLabel={data[0]?.y_axis}
          />
        )
      case 'bar_chart':
        return (
          <BarChartComponent 
            data={chartData} 
            title={title}
            xAxisLabel={data[0]?.x_axis}
            yAxisLabel={data[0]?.y_axis}
          />
        )
      case 'line_chart':
        return (
          <LineChartComponent 
            data={chartData} 
            title={title}
            xAxisLabel={data[0]?.x_axis}
            yAxisLabel={data[0]?.y_axis}
          />
        )
      case 'pie_chart':
        return (
          <PieChartComponent 
            data={chartData} 
            title={title}
          />
        )
      case 'radar_chart':
        return (
          <RadarChartComponent 
            data={chartData} 
            title={title}
          />
        )
      default:
        return (
          <div className="w-full h-80 p-4 flex items-center justify-center">
            <p className="text-muted-foreground">Tipo de gráfica no soportado: {chart_type}</p>
          </div>
        )
    }
  }

  return (
    <div className="w-full">
      {renderChart()}
    </div>
  )
}
