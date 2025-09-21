import { Card } from './card'

export function ChartSkeleton() {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Título skeleton */}
        <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
        
        {/* Gráfica skeleton */}
        <div className="h-80 space-y-2">
          {/* Eje Y skeleton */}
          <div className="flex h-full space-x-2">
            <div className="w-8 space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-3 bg-muted rounded animate-pulse" />
              ))}
            </div>
            
            {/* Área principal de la gráfica */}
            <div className="flex-1 space-y-2">
              {/* Líneas de la gráfica */}
              <div className="h-full flex items-end space-x-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-muted rounded-t animate-pulse"
                    style={{
                      height: `${Math.random() * 60 + 20}%`,
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Eje X skeleton */}
          <div className="flex justify-between px-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-3 bg-muted rounded animate-pulse w-12" />
            ))}
          </div>
        </div>
        
        {/* Labels skeleton */}
        <div className="flex justify-between">
          <div className="h-4 bg-muted rounded animate-pulse w-20" />
          <div className="h-4 bg-muted rounded animate-pulse w-20" />
        </div>
      </div>
    </Card>
  )
}
