import { readCharts } from "@/api/service/chart";
import type { Chart } from "@/api/types/chart";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogTitle, DialogHeader } from "./ui/dialog";
import { FadeIn } from "./ui/FadeIn";
import { ScrollArea } from "./ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface AiChartMessageProps {
  chart: Chart
}

export default function AiChartMessage(data: AiChartMessageProps) {
  const { chart } = data
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (chart) {
      setIsLoading(true)
      toast.info('Estamos analizando la gráfica, por favor espera...')
      readCharts([chart]).then((res) => {
        setMessage(res.data.message)
        console.log(message)
      }).catch((err) => {
        toast.error(err.message)
        setMessage('')
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }, [chart])

  return (
    <>
      <Dialog>
        <DialogTrigger>
          {isLoading ? (
            <span className="animate-pulse">Analizando...</span>
          ) : (
            <FadeIn>
              <Button className="bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-110 focus:scale-110 focus:bg-emerald-500 transition-transform duration-300 cursor-pointer">
                <span>
                  Ver análisis
                </span>
                <ArrowRight />
              </Button>
            </FadeIn>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isLoading ? (
                <>
                  <h1 className="text-2xl font-bold animate-pulse">Analizando, por favor espera...</h1>
                  <DialogDescription className="animate-pulse">Estamos preparando el análisis de la gráfica, te notificaremos cuando este listo.</DialogDescription>
                </>
              ) : (
                <h1 className="text-2xl font-bold text-emerald-500">Analísis con IA</h1>
              )}
            </DialogTitle>
          </DialogHeader>
          <FadeIn duration={500}>
            <ScrollArea className="w-full h-[70vh] p-4 text-[1.1rem] text-gray-600">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message}
              </ReactMarkdown>
            </ScrollArea>
          </FadeIn>
        </DialogContent>
      </Dialog>
    </>
  )
}