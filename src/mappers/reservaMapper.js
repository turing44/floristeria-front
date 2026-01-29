import { mapEntregaToDto } from "./entregaMapper"
import { mapPedidoFromDto, mapPedidoToDto } from "./pedidoMapper"

export function mapReservaFromDto(dto) {
    const reserva = {
        ...mapPedidoFromDto(dto),

        dinero_pendiente: dto.dinero_pendiente ?? "",
        estado_pago: dto.estado_pago,
    }

    console.log(reserva);
    
    return reserva
}


export function mapReservaToDto(reserva) {  
    const dto = {
        ...mapPedidoToDto(reserva),
        
        dinero_pendiente: reserva.dinero_pendiente ?? null,
        estado_pago: reserva.estado_pago,
    }

    return dto
}   
