import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { formatFileSize } from "@/lib/utils";
import { useFiles } from "@/contexts/FileContext";
import { useCharts } from "@/contexts/ChartSchemaContext";
import { FadeIn } from "./ui/FadeIn";

export function FileManager() {
  const { files, clearFiles, removeFile } = useFiles();
  const { clearData } = useCharts()

  const handleClearAll = () => {
    clearFiles()
    clearData()
  }

  return (
    <>
      {
        files.length > 0 && (
          <FadeIn>
            <AccordionItem value="files">
              <AccordionTrigger className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  <span className="text-xl font-semibold text-foreground">
                    Archivos cargados ({files.length})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="mx-6 mb-4">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-foreground">
                        Gestión de archivos
                      </h3>
                      <Button
                        variant="outline"
                        onClick={handleClearAll}
                        className="text-destructive hover:text-destructive cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Limpiar todo
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg bg-muted/50 p-4"
                        >
                          <div className="flex items-center gap-3">
                            <FileSpreadsheet className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium text-foreground">{file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-destructive hover:text-destructive cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </FadeIn>
        )
      }
    </>
  );
}