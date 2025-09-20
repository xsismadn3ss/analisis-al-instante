/**
 * Genera un color hexadecimal aleatorio
 * @returns string - Color hexadecimal en formato #RRGGBB
 */
export function generateRandomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

/**
 * Genera un array de colores hexadecimales únicos
 * @param count - Número de colores a generar
 * @returns string[] - Array de colores hexadecimales
 */
export function generateColorPalette(count: number): string[] {
  const colors: string[] = []
  const usedColors = new Set<string>()
  
  // Colores predefinidos para mejor contraste
  const predefinedColors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#6B7280', // Gray
  ]
  
  // Agregar colores predefinidos primero
  for (let i = 0; i < Math.min(count, predefinedColors.length); i++) {
    colors.push(predefinedColors[i])
    usedColors.add(predefinedColors[i])
  }
  
  // Generar colores aleatorios para el resto
  while (colors.length < count) {
    const color = generateRandomColor()
    if (!usedColors.has(color)) {
      colors.push(color)
      usedColors.add(color)
    }
  }
  
  return colors
}

/**
 * Genera un color basado en un string (hash)
 * @param str - String para generar el color
 * @returns string - Color hexadecimal consistente
 */
export function generateColorFromString(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  const color = Math.abs(hash).toString(16).substring(0, 6)
  return '#' + color.padEnd(6, '0')
}
