import { mapReservaFromDto, mapReservaToDto } from "../../mappers/reservaMapper";
import { httpGet, httpPost, httpPut, httpDelete } from "../cliente"


const RUTA_RESERVAS = "/reservas"

export async function listReservas() {
    const response = await httpGet(RUTA_RESERVAS) 
    console.log(response);
    
    const reservasMapeadas = response.reservas.map(mapReservaFromDto)
    console.log(reservasMapeadas);
    
    return reservasMapeadas
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
