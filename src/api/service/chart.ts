import { apiUrl } from "@/config/env";
import type { Chart, ChartSchema } from "../types/chart";
import axios from "axios";

const url = `${apiUrl}/charts`



export async function generateSchema(formdata: FormData) {
    return await axios.post<ChartSchema[]>(`${url}/generate`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export async function buildChart(title: string, parameter: string, chart_type: string, file: FormData){
    return await axios.post<Chart>(`${url}/build?title=${encodeURIComponent(title)}&chart_type=${chart_type}&parameter=${encodeURIComponent(parameter)}`, file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}