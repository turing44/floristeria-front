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

    }
}
