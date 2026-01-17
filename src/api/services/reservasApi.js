import { httpGet, httpPost, httpPut, httpDelete } from "../cliente"


const RUTA_RESERVAS = "/reservas"

export async function listReservas() {
    return await httpGet(RUTA_RESERVAS)
}

export async function getReserva(id) {
    return await httpGet(RUTA_RESERVAS + "/" + id)
}

export async function createReserva(reserva) {

    const dto = mapReservaToDto(reserva)

    const response = await httpPost(RUTA_RESERVAS, { body: dto })

    return mapReservaFromDto(response)
}

export async function updateReserva(id, reserva) {
    
    const dto = mapReservaToDto(reserva)
    const response = await httpPut(RUTA_RESERVAS + "/" + id, { body: dto })
    
    return mapReservaFromDto(response)
}


export async function deleteReserva(id) {
    return await httpDelete(RUTA_RESERVAS + "/" + id)
}
