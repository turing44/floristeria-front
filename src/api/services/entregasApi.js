import { mapEntregaFromDto, mapEntregaToDto } from "../../mappers/entregaMapper";
import { httpDelete, httpGet, httpPost, httpPut } from "../cliente";

/** 
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

    console.log(dto)
    return mapEntregaFromDto(dto)
}

export async function createEntrega(entrega) {

    const dto = mapEntregaToDto(entrega)

    const response = await httpPost(RUTA_ENTREGAS, { body: dto })

    return mapEntregaFromDto(response)
    
}

export async function updateEntrega(id, entrega) {

    const dto = mapEntregaToDto(entrega)

    const response = await httpPut(RUTA_ENTREGAS + "/" + id, { body: dto })

    return mapEntregaFromDto(response)
    
}


export async function deleteEntrega(id) {
    return await httpDelete(RUTA_ENTREGAS + "/" + id)
}