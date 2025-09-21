import type { Chart, ChartSchema } from "@/api/types/chart";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { buildChart } from "@/api/service/chart";
import { ChartRenderer } from "../charts/ChartRenderer";
import { FadeIn } from "../ui/FadeIn";
import { Sparkles } from 'lucide-react'
import AiChartMessage from "./AiChartMessage";

export default function InteractiveChartCard({ schema, file }: { schema: ChartSchema, file: File }) {
  const [chart, setChart] = useState<Chart | undefined>()

  const haddleClick = async () => {
    const formData = new FormData()
    formData.append('file', file)
    buildChart([schema], formData).then((res) => {
      setChart(res.data[0])
      toast.success(`${schema.title} ha sido generada`)
    })
  }

  return (
    <Card>
      <CardContent>
        <h1 className="font-semibold text-gray-800 mb-2 text-lg">{schema.title}</h1>
        {!chart && (
          <Button
            onClick={haddleClick}
            className="cursor-pointer bg-emerald-600 hover:bg-emerald-500"
          >
            <span>
              <Sparkles className="inline-block w-4 h-4 mr-2" />
              Analizar y crear gráfica
            </span>
          </Button>
        )}
        {chart && (
          <>
            <FadeIn>
              <ChartRenderer chart={chart} />
              <AiChartMessage chart={chart} />
            </FadeIn>
          </>
        )}
      </CardContent>
    </Card>
  )
}