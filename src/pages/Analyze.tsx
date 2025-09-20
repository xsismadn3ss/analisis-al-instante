import { useFiles } from "@/contexts/FileContext"
import { useCharts } from "@/contexts/ChartContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Dashboard } from "@/components/Dashboard"
import { Accordion } from "@/components/ui/accordion"
import { FileManager } from "@/components/FileManager";

export default function Analyze() {
  const { files } = useFiles()
  const { schemas, isLoading, error, generateSchemas } = useCharts()
  const navigate = useNavigate()

  const handleAnalyze = async () => {
    if (files.length === 0) return
    
    try {
      await generateSchemas(files)
    } catch (err) {
      console.error("Error en el análisis:", err)
    }
  }

  const handleDownloadResults = () => {
    // Aquí se implementará la descarga de resultados
    console.log("Descargando resultados...")
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Análisis de Datos</h1>
          <p className="text-muted-foreground">
            Analiza tus archivos de datos y obtén insights valiosos
          </p>
        </div>

        {files.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              No hay archivos para analizar
            </h3>
            <p className="text-muted-foreground mb-6">
              Ve a la página principal para cargar archivos CSV o Excel
            </p>
            <Button asChild className="cursor-pointer">
              <a onClick={() => navigate("/")}>Cargar archivos</a>
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Lista de archivos con accordion */}
            <Accordion 
              type="single" 
              collapsible 
              defaultValue={schemas.length === 0 ? "files" : undefined}
              className="w-full"
            >
              <FileManager />
            </Accordion>

            {/* Controles de análisis */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Opciones de análisis
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAnalyze}
                  disabled={isLoading || files.length === 0}
                  className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generando dashboard...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Generar Dashboard
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleDownloadResults}
                  disabled={schemas.length === 0}
                  variant="outline"
                  className="flex-1 disabled:opacity-50"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Descargar resultados
                </Button>
              </div>
            </Card>

            {/* Estado de error */}
            {error && (
              <Card className="p-6 border-destructive">
                <div className="flex items-center gap-2 text-destructive">
                  <div className="h-2 w-2 rounded-full bg-destructive" />
                  <p className="font-medium">Error en el análisis</p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{error}</p>
              </Card>
            )}

            {/* Dashboard */}
            {schemas.length > 0 && (
              <Dashboard/>
            )}
          </div>
         )}
     </div>
   )
 }
