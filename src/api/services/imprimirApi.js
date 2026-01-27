import { pdfGet } from "../cliente"

export async function getEntregaPdf(id) {
    const entrega = await pdfGet(`/entregas/pdf/${id}`) 
    return await entrega.blob()
}

/**
 * 
 * @param {*} id 
 * @returns URL del PDF de la reserva 
 */
export async function getReservaPdf(id) {
    const reserva = await pdfGet(`/reservas/pdf/${id}`)
    return await reserva.blob()
}
