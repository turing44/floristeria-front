import { mapEntregaToDto } from "./entregaMapper"
import { mapPedidoFromDto, mapPedidoToDto } from "./pedidoMapper"

export function mapReservaFromDto(dto) {
    const reserva = {
        ...mapPedidoFromDto(dto),

        dinero_pendiente: dto.dinero_pendiente ?? "",
        hora_recogida: dto.hora_recogida ?? "",
    }

    console.log(reserva);
    
    return reserva
}


export function mapReservaToDto(reserva) {  
    const dto = {
        ...mapPedidoToDto(reserva),
        
        dinero_pendiente: reserva.dinero_pendiente ?? null,
        hora_recogida: reserva.hora_recogida ?? null,
    }

    return dto
}   
