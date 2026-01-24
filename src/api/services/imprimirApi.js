import { pdfGET } from "../clientePdf"

export async function getEntregaPdf(id) {
    try {
        const entrega = await pdfGET(`/entregas/pdf/${id}`) 

        return await entrega.blob()
        
    } catch (error) {
        console.log(error)
    }

}

/**
 * 
 * @param {*} id 
 * @returns URL del PDF de la reserva 
 */
export async function getReservaPdf(id) {
    try {
        const reserva = await pdfGET(`/reservas/pdf/${id}`)

        return await reserva.blob()
        

    } catch (error) {
        console.log(error)
    }
}
