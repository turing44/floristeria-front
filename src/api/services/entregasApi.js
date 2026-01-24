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
    try {
        const dto = mapEntregaToDto(entrega);
        const response = await httpPost(RUTA_ENTREGAS, dto );
        return mapEntregaFromDto(response);
    } catch (error) {
        mostrarErroresBackend(error);
        throw error;
    }
}

export async function updateEntrega(id, entrega) {
    try {
        const dto = mapEntregaToDto(entrega);
        const response = await httpPut(RUTA_ENTREGAS + "/" + id, dto );
        
        return mapEntregaFromDto(response);
    } catch (error) {
        mostrarErroresBackend(error);
        throw error;
    }
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

function mostrarErroresBackend(error) {
    if (error?.response?.status === 422) {
        console.error("Errores de validación:");
        console.table(error.response.data.errors);
    } else if (error?.response) {
        console.error("Error backend:", error.response.status, error.response.data);
    } else {
        console.error("Error de red:", error);
    }
}

export async function listEntregasArchivadas({ sort = "fecha_desc" } = {}) {
    const dtos = await httpGet(RUTA_ENTREGAS + "/archivadas?" + new URLSearchParams({ sort }));
    return dtos.entregas.map(mapEntregaFromDto);
}
