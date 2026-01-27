import { mapEntregaFromDto, mapEntregaToDto } from "../../mappers/entregaMapper";
import { httpDelete, httpGet, httpPost, httpPut } from "../cliente";

const RUTA_ENTREGAS = "/entregas";

export async function listEntregas({ sort = "fecha_desc" } = {}) {
    const dtos = await httpGet(RUTA_ENTREGAS + "?" + new URLSearchParams({ ordenar: sort }));
    return dtos.entregas.map(mapEntregaFromDto);
}

export async function getEntrega(id) {
    const dto = await httpGet(RUTA_ENTREGAS + "/" + id);
    return mapEntregaFromDto(dto);
}

export async function createEntrega(entrega) {

    const dto = mapEntregaToDto(entrega);
    const response = await httpPost(RUTA_ENTREGAS, dto );
    return mapEntregaFromDto(response);
    
}

export async function updateEntrega(id, entrega) {

    const dto = mapEntregaToDto(entrega);
    const response = await httpPut(RUTA_ENTREGAS + "/" + id, dto );
    
    return mapEntregaFromDto(response);
    
}

export async function deleteEntrega(id) {
    return await httpDelete(RUTA_ENTREGAS + "/" + id);
}

export async function getEntregasArchivadas() {
    return await httpGet(RUTA_ENTREGAS + "/archivadas");
}

export async function getEntregasArchivadasPorId(id) {
    return await httpGet(RUTA_ENTREGAS + "/archivadas/" + id);
}

export async function listEntregasArchivadas({ sort = "fecha_desc" } = {}) {
    const dtos = await httpGet(RUTA_ENTREGAS + "/archivadas?" + new URLSearchParams({ sort }));
    return dtos.entregas.map(mapEntregaFromDto);
}

export async function restaurarEntrega(id) {
    return await httpPost(RUTA_ENTREGAS + "/restaurar/" + id);
}