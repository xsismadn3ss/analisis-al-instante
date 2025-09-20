export interface ChartParameter {
    x_axis: string
    y_axis: string
}

export interface ChartSchema {
    title: string
    chart_type: string
    mesure: string
    parameter: ChartParameter[]
}


export interface DataValue {
    x: string
    y: string
}


export interface ChartParameterProcessed extends ChartParameter{
    data: DataValue[]
}


export interface Chart{
    title: string
    chart_type: string
    data: ChartParameterProcessed[]
}

export interface Message{
    message: string
}