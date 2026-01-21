export function mapReservaFromDto(dto) {

    const reservaMappeada =
    {
        id: dto.pedido.id,
        fuente: dto.pedido.fuente ?? null,
        producto: dto.pedido.producto,
        precio: dto.pedido.precio,
        fecha_entrega: dto.pedido.fecha_entrega,
        cliente: dto.pedido.cliente_nombre,
        telf_cliente: dto.pedido.cliente_telf,
        horario: dto.pedido.horario,
        observaciones: dto.pedido.observaciones ?? null,
        nombre_mensaje: dto.pedido.nombre_mensaje,
        texto_mensaje: dto.pedido.texto_mensaje,
        dinero_a_cuenta: dto.dinero_a_cuenta,
        estado_pago: dto.estado_pago
    }
    console.log(reservaMappeada)
    return reservaMappeada
}

export function mapReservaToDto(reserva) {
        return {
            estado_pago: reserva.estado_pago,
            dinero_a_cuenta: reserva.dinero_a_cuenta,
            pedido: {
                id: reserva.id,
                fuente: reserva.fuente ?? null,
                producto: reserva.producto,
                precio: reserva.precio,
                fecha_entrega: reserva.fecha_entrega,
                cliente_telf: reserva.telf_cliente,
                horario: reserva.horario,
                observaciones: reserva.observaciones ?? null,
                nombre_mensaje: reserva.nombre_mensaje,
                texto_mensaje: reserva.texto_mensaje
            }
        }
}
