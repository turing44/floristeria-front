
export async function getEntregaPdf(id) {
    try {
        const entrega = await fetch(`/entregas/${id}/pdf`, {
            "method": "GET",
            "headers": {
                "Accept": "application/pdf",
                
            }
        })

        const blob = await entrega.blob()
        const url = URL.createObjectURL(blob)
        return blob
        
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
        const reserva = await fetch(`/reservas/${id}/pdf`, {
            "method": "GET",
            "headers": {
                "Accept": "application/pdf",
                
            }
        })

        const blob = await reserva.blob()

        const url = URL.createObjectURL(blob)
        return blob
        
    } catch (error) {
        console.log(error)
    }

}