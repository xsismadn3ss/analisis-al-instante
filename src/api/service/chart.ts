import { apiUrl } from "@/config/env";
import type { Chart, ChartSchema, ChartParameter } from "../types/chart";
import axios from "axios";

const url = `${apiUrl}/charts`



export async function generateSchema(formdata: FormData) {
    return await axios.post<ChartSchema[]>(`${url}/generate`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export async function buildChart(title: string, parameter: ChartParameter[], chart_type: string, file: FormData){
    const p = JSON.stringify(parameter)
    console.log(p)
    return await axios.post<Chart>(`${url}/build?title=${title}&chart_type=${chart_type}&parameter=${p}`, file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}