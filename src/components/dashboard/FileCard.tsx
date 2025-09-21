import { formatFileSize } from "@/lib/utils"
import { FileChartColumn } from "lucide-react"

interface FileCardProps {
    file: File
}

export default function FileCard(data: FileCardProps) {
    const { file } = data
    const fileSize = formatFileSize(file.size)

    return (
        <div className="p-4 rounded-md bg-accent" id={`${file.name}`}>
            <div className="flex items-center justify-start space-x-4">
                <FileChartColumn className="h-8 w-8 text-muted-foreground" />
                <div>
                    <p className="text-lg font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{fileSize}</p>
                </div>
            </div>
        </div>
    )

}