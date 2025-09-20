import { useFiles } from "@/contexts/FileContext"
import { FileUploadZone } from "@/components/FileUploadZone"
import { FeatureShowcase } from "@/components/FeatureShowcase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { FileManager } from "@/components/FileManager"
import { Accordion } from "@/components/ui/accordion"
import { useCharts } from "@/contexts/ChartContext"

export default function Home() {
  const { files, addFiles } = useFiles()
  const { generateSchemas } = useCharts()
  const navigate = useNavigate()

  const handleFileSelect = (files: File[]) => {
    addFiles(files)
  }

  const handleAnalyze = () => {
    if (files.length > 0) {
      navigate("/analyze")
      generateSchemas(files)
    }
  }

  useEffect(() => {
    if (files.length > 0) {
      document.getElementById('upload-section')?.scrollIntoView({ behavior: "smooth" })
    }
  }, [files])

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Analiza tus datos con <span className="text-primary">Inteligencia Artificial</span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground leading-relaxed text-pretty">
            Sube tus archivos CSV o Excel y obtén insights automáticos, visualizaciones interactivas y propuestas de
            mejora impulsadas por IA.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 cursor-pointer"
              onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Comenzar análisis
            </Button>

            {/* <Button variant="outline" size="lg">
                Ver demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button> */}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="mb-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Sube tus datos</h2>
            <p className="text-muted-foreground">
              Arrastra y suelta tus archivos CSV o Excel para comenzar el análisis
            </p>
          </div>

          <FileUploadZone onFileSelect={handleFileSelect} />
          {files.length > 0 && (
            <Accordion
              type="single"
              collapsible
            >
              <FileManager />
            </Accordion>
          )}
          {files.length > 0 && (
            <div className="mt-6 text-center">
              <Button size="lg" onClick={handleAnalyze} className="bg-gray-800  hover:bg-gray-700 cursor-pointer">
                <Sparkles className="mr-2 h-5 w-5" />
                Analizar datos ({files.length} archivo{files.length !== 1 ? "s" : ""})
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mb-16">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Potencia tu análisis de datos</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Descubre patrones, genera insights y toma decisiones informadas con nuestras herramientas de análisis
            impulsadas por IA.
          </p>
        </div>

        <FeatureShowcase />
      </section>

      {/* CTA Section */}
      <section className="text-center" id="cta">
        <Card className="mx-auto max-w-2xl p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <h3 className="mb-4 text-2xl font-bold text-foreground">¿Listo para transformar tus datos?</h3>
          <p className="mb-6 text-muted-foreground">
            Únete a miles de analistas que ya están usando DataAnalyzer para obtener insights más profundos de sus
            datos.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            Comenzar gratis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 DataAnalyzer. Potenciado por Inteligencia Artificial.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}