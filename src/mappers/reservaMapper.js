import { mapEntregaToDto } from "./entregaMapper"
import { mapPedidoFromDto, mapPedidoToDto } from "./pedidoMapper"

export function mapReservaFromDto(dto) {
    const reserva = {
        ...mapPedidoFromDto(dto),

        dinero_dejado_a_cuenta: dto.dinero_a_cuenta ?? "",
        estado_pago: dto.estado_pago,
    }

    return reserva
}


export function mapReservaToDto(reserva) {  
    const dto = {
        ...mapPedidoToDto(reserva),
        
        dinero_dejado_a_cuenta: reserva.dinero_dejado_a_cuenta ?? null,
        estado_pago: reserva.estado_pago,
    }

    return dto
}   
