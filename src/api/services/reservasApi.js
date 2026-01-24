import { mapReservaFromDto, mapReservaToDto } from "../../mappers/reservaMapper";
import { httpGet, httpPost, httpPut, httpDelete } from "../cliente"


const RUTA_RESERVAS = "/reservas"

export async function listReservas({sort = "fecha_desc"} = {}) {
    const dtos = await httpGet(RUTA_RESERVAS + "?" + new URLSearchParams({ sort }));
    return dtos.reservas.map(mapReservaFromDto)
}

export async function getReserva(id) {
    const dto = await httpGet(RUTA_RESERVAS + "/" + id)
    return mapReservaFromDto(dto)
}

export async function createReserva(reserva) {

    const dto = mapReservaToDto(reserva)

    const response = await httpPost(RUTA_RESERVAS, dto)
    return mapReservaFromDto(response)

}

export async function updateReserva(id, reserva) {
    const dto = mapReservaToDto(reserva)

    const response = await httpPut(RUTA_RESERVAS + "/" + id, dto)
    return mapReservaFromDto(response)

}


export async function deleteReserva(id) {
    return await httpDelete(RUTA_RESERVAS + "/" + id)
}

export async function listReservasArchivadas({ sort = "fecha_desc" } = {}) {
    const dtos = await httpGet(RUTA_RESERVAS + "/archivadas?" + new URLSearchParams({ sort }));
    console.log(dtos.reservas.map(mapReservaFromDto));
    return dtos.reservas.map(mapReservaFromDto);
}