import { httpGet } from "../cliente";

export async function linkFormulario() {
    const response = await httpGet("/generar-link")
    return response.link;
}

export async function importarFormularios() {
    httpGet("/importar-pedidos")
}