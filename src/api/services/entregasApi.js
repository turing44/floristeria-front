import { mapEntregaFromDto } from "../../mappers/entregaMapper";
import { httpDelete, httpGet } from "../cliente";

/**
 * 
 * sort Sorted => ordenado
 * dir Direccion ascendente o descendente (asc / desc) 
*/

const RUTA_ENTREGAS = "/entregas"

export async function listEntregas({sort = "fecha", dir = "desc"}) {
    const dtos = await httpGet(RUTA_ENTREGAS + "?" + new URLSearchParams({sort, dir}))

    const entregas = dtos.entregas.map(mapEntregaFromDto)

    return entregas

}

export async function getEntrega(id) {
    const dto = await httpGet(RUTA_ENTREGAS + "/" + id)

    return mapEntregaFromDto(dto)
}

export async function deleteEntrega(id) {
    return await httpDelete(RUTA_ENTREGAS + "/" + id)
}