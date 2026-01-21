
export function mapReservaFromDto(dto) {
    const reserva = {
        id: dto.pedido_id,
        fuente: dto.pedido.fuente ?? null,
        producto: dto.pedido.producto,
        precio: dto.pedido.precio,
        fecha: dto.fecha,
        cliente_nombre: dto.pedido.cliente_nombre,
        cliente_telf: dto.pedido.cliente_telf,
        horario: dto.pedido.horario,
        observaciones: dto.pedido.observaciones ?? null,
        nombre_mensaje: dto.pedido.nombre_mensaje,
        texto_mensaje: dto.pedido.texto_mensaje ?? null,

        dinero_dejado_a_cuenta: dto.dinero_dejado_a_cuenta ?? null,
        estado_pago: dto.estado_pago,
    }

    return reserva
}


export function mapReservaToDto(reserva) {  
    const dto = {
        id: reserva.id,
        fuente: reserva.fuente ?? null,
        producto: reserva.producto,
        precio: reserva.precio,
        fecha: reserva.fecha,
        nombre_mensaje: reserva.nombre_mensaje,
        texto_mensaje: reserva.texto_mensaje ?? null,
        cliente_nombre: reserva.cliente_nombre,     
        cliente_telf: reserva.cliente_telf,
        horario: reserva.horario,
        observaciones: reserva.observaciones ?? null,
        
        dinero_dejado_a_cuenta: reserva.dinero_dejado_a_cuenta ?? null,
        estado_pago: reserva.estado_pago,
    }

    return dto
}   
