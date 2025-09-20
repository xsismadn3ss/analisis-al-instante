import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadZoneProps {
  onFileSelect: (files: File[]) => void
  className?: string
}

export function FileUploadZone({ onFileSelect, className }: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files).filter(
        (file) =>
          file.type === "text/csv" ||
          file.type === "application/vnd.ms-excel" ||
          file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      )

      if (files.length > 0) {
        onFileSelect(files)
      }
    },
    [onFileSelect],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      if (files.length > 0) {
        onFileSelect(files)
      }
    },
    [onFileSelect],
  )


  return (
    <div className={cn("space-y-4", className)}>
      <Card
        className={cn(
          "relative border-2 border-dashed transition-all duration-200 ease-in-out",
          isDragOver
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-muted/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-8 w-8 text-primary" />
          </div>

          <h3 className="mb-2 text-xl font-semibold text-foreground">Arrastra y suelta tus archivos aquí</h3>

          <p className="mb-6 text-sm text-muted-foreground">Soportamos archivos CSV y Excel (.xlsx, .xls)</p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={() => document.getElementById("file-input")?.click()}
              className="bg-primary hover:bg-primary/90 cursor-pointer"
            >
              <Upload className="mr-2 h-4 w-4" />
              Seleccionar archivos
            </Button>

            <span className="text-xs text-muted-foreground">o arrastra y suelta</span>
          </div>

          <input
            id="file-input"
            type="file"
            multiple
            accept=".csv,.xlsx,.xls"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </Card>

    </div>
  )
}
