//return await httpGet(`/pedidos/${id}/pdf`)

export async function getPdf(id) {

    try {
        const pedido = await fetch(`/pedido/${id}/pdf`, {
            "method": "GET",
            "headers": {
                "Accept": "application/pdf",
                
            }
        })

        return await pedido.blob()
        
    } catch (error) {
        console.log(error)
    }



}