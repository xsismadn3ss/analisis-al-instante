import InteractiveChartCard from "./ChartSchemaCard";
import type { ChartSchema } from "@/api/types/chart";

export default function SchemaChartGroup({schemas, file}: {schemas: ChartSchema[], file: File}){
    return(
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schemas.map((s, index) => (
                <InteractiveChartCard key={index} schema={s} file={file} />
            ))}
        </div>
    )
}