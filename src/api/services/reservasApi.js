import { mapReservaFromDto, mapReservaToDto } from "../../mappers/reservaMapper";
import { httpDelete, httpGet, httpPost, httpPut } from "../cliente";

/** 
 * sort Sorted => ordenado
 * dir Direccion ascendente o descendente (asc / desc) 
 */

const RUTA_RESERVAS = "/reservas"

export async function listReservas({ sort = "fecha", dir = "desc" }) {
    const dtos = await httpGet(RUTA_RESERVAS + "?" + new URLSearchParams({ sort, dir }))

    const reservas = dtos.reservas.map(mapReservaFromDto)

    return reservas
}

export async function getReserva(id) {
    const dto = await httpGet(RUTA_RESERVAS + "/" + id)
    console.log(dto)
    return mapReservaFromDto(dto)
}

export async function createReserva(reserva) {

    const dto = mapReservaToDto(reserva)

    const response = await httpPost(RUTA_RESERVAS, { body: dto })
    return mapReservaFromDto(response)

}

export async function updateReserva(id, reserva) {
    const dto = mapReservaToDto(reserva)

    const response = await httpPut(RUTA_RESERVAS + "/" + id, { body: dto })
    return mapEntregaFromDto(response)

}


export async function deleteReserva(id) {
    return await httpDelete(RUTA_RESERVAS + "/" + id)
}

