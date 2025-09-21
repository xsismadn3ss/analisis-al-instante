import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { GripHorizontal } from "lucide-react"

interface DashBoardNavMenuProps {
  files: File[]
}

export default function DashBoardNavMenu(data: DashBoardNavMenuProps) {
  const { files } = data
  const [fileSelected, setFileSelected] = useState<File | null>(null)

  const handleFileSelect = (file: File) => {
    setFileSelected(file)
    document.getElementById(file.name)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 bg-card rounded-md shadow-lg pl-2 pr-2 w-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex w-10">
            <GripHorizontal className="hover:text-emerald-600 focus:text-emerald-600 transition-colors duration-300 cursor-pointer" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="translate-x-5">
          {files.map((file) => (
            <DropdownMenuItem key={file.name} onClick={() => handleFileSelect(file)}>
              {/* darle color diferente si esta seleccionado */}
              <span className={fileSelected?.name === file.name ? 'text-emerald-600' : ''}>{file.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}