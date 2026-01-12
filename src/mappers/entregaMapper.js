export function mapEntregaFromDto(dto) {
    return {
        id: String(dto.pedido.id),
        codigo_postal: dto.codigo_postal,
        destinatario: dto.destinatario_nombre,
        telf_destinatario: dto.destinatario_telf,
        direccion: dto.direccion,
        fecha_entrega: dto.fecha_entrega,
        fuente: dto.fuente ?? null,
        horario: dto.horario,
        mensaje: dto.mensaje_dedicatoria ?? null,
        cliente: dto.pedido.cliente_nombre,
        telf_cliente: dto.pedido.cliente_telf,
        observaciones: dto.pedido.observaciones ?? null,
        precio: dto.pedido.precio,
        producto: dto.pedido.producto

    }
}


export function mapEntregaToDto(entrega) {
    return {
        codigo_postal: entrega.codigo_postal,
        destinatario_nombre: entrega.destinatario,
        destinatario_telf: entrega.telf_destinatario,
        direccion: entrega.direccion,
        fecha_entrega: entrega.fecha_entrega,
        fuente: entrega.fuente ?? null,
        horario: entrega.horario,
        mensaje_dedicatoria: entrega.mensaje ?? null,
        pedido: {
            id: entrega.id,
            cliente_nombre: entrega.cliente,
            cliente_telf: entrega.telf_cliente,
            observaciones: entrega.observaciones ?? null,
            precio: entrega.precio
        }
    }
}
