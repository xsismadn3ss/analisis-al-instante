import { Card } from "@/components/ui/card"
import { BarChart3, Brain, TrendingUp, FileText } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Visualización Avanzada",
    description: "Genera gráficos interactivos y dashboards automáticamente desde tus datos.",
    color: "text-chart-1",
  },
  {
    icon: Brain,
    title: "Análisis con IA",
    description: "Obtén insights inteligentes y patrones ocultos en tus dataframes.",
    color: "text-chart-2",
  },
  {
    icon: TrendingUp,
    title: "Estadísticas Detalladas",
    description: "Análisis estadístico completo con métricas y correlaciones.",
    color: "text-chart-3",
  },
  {
    icon: FileText,
    title: "Reportes Automáticos",
    description: "Genera conclusiones y propuestas de mejora basadas en tus datos.",
    color: "text-chart-4",
  },
]

export function FeatureShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <feature.icon className={`h-6 w-6 ${feature.color}`} />
          </div>

          <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>

          <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
        </Card>
      ))}
    </div>
  )
}
