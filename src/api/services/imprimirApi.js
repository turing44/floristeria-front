
export async function getEntregaPdf(id) {
    try {
        const entrega = await fetch(`http://localhost:8000/api/entregas/pdf/${id}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/pdf",
                
            }
        })

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
        const entrega = await fetch(`http://localhost:8000/api/reservas/pdf/${id}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/pdf",
                
            }
        })

        const blob = await reserva.blob()
        const url = URL.createObjectURL(blob)

        return url

    } catch (error) {
        console.log(error)
    }
}
