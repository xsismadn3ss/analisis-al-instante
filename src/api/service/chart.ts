import { apiUrl } from "@/config/env";
import type { Chart, ChartSchema, Message } from "../types/chart";
import axios from "axios";

const url = `${apiUrl}/charts`



export async function generateSchema(formdata: FormData) {
    return await axios.post<ChartSchema[]>(`${url}/generate`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export async function buildChart(schemas: ChartSchema[], file: FormData){
    const s = JSON.stringify(schemas)
    return await axios.post<Chart[]>(`${url}/build?charts_schema=${s}`, file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


export async function readCharts(charts: Chart[]){
    return await axios.post<Message>(`${url}/read`, {
        charts
    })
}