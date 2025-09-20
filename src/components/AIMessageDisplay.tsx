import ReactMarkdown from 'react-markdown'
import { useCharts } from '@/contexts/ChartContext'
import { useEffect, useState } from 'react'
import { readCharts } from '@/api/service/chart'
import { FadeIn } from './ui/FadeIn'
import remarkGfm from 'remark-gfm'
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from './ui/accordion'

interface AIMessageDisplayProps {
  id: number
}

export function AIMessageDisplay({ id }: AIMessageDisplayProps) {
  const { charts } = useCharts()
  const [aiMessage, setAiMessage] = useState<string>('')
  const currentCharts = charts[id].charts

  useEffect(() => {
    if (currentCharts.length > 0) {
      readCharts(currentCharts)
        .then((res) => {
          document.getElementById(`ai-message-${id}`)?.scrollIntoView({ behavior: 'smooth' })
          console.log(res)
          // renderizar caracter por caracter
          let message = res.data.message
          res.data.message.split('').forEach((char) => {
            // añadir una espera proporcional al renderizado de cada carácter
            setTimeout(() => {
              message += char
              setAiMessage(message)
              // scroll to end
              // document.getElementById(`ai-message-end-${id}`)?.scrollIntoView({ behavior: 'smooth' })
            }, 20) // espera de 10ms entre cada carácter
          })
        })
        .catch((err) => {
          console.error('Error reading charts:', err)
          setAiMessage('Error al obtener el análisis de la IA.')
        })
    }
  }, [id, currentCharts])

  return (
    <div className="w-full mt-8 font-semibold text-gray-600" id={`ai-message-${id}`}>
      <FadeIn duration={1000}>
        <Accordion type='single' collapsible>
          <AccordionItem value='analysis' className='shadow-lg rounded-lg border-2'>
            <AccordionTrigger className='cursor-pointer bg-accent pt-4 pb-4 p-4 rounded-br-none'>
              {aiMessage.length === 0 ? (
                <span className='text-2xl font-bold animate-pulse p-4'>Estamos analizando los datos de la gráfica</span>
              ) : (
                <>
                  <FadeIn>
                    <span className='text-2xl font-bold'>Análisis con IA</span>
                  </FadeIn>
                </>
              )}
            </AccordionTrigger>
            <AccordionContent className='p-4 text-[1.1rem]'>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {aiMessage}
              </ReactMarkdown>
              <span id={`ai-message-end-${id}`}></span>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </FadeIn>
    </div>
  )
}