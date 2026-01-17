export function mapEntregaFromDto(dto) {
    //console.log(dto)

    const entregaMapeada = 

    {
        id: dto.pedido_id,
        fuente: dto.pedido.fuente ?? null,
        producto: dto.pedido.producto,
        precio: dto.pedido.precio,
        fecha_entrega: dto.fecha,
        cliente: dto.pedido.cliente_nombre,
        telf_cliente: dto.pedido.cliente_telf,
        horario: dto.pedido.horario,
        observaciones: dto.pedido.observaciones ?? null,
        destinatario: dto.nombre_mensaje,
        mensaje: dto.texto_mensaje ?? null,
        direccion: dto.direccion,
        telf_destinatario: dto.destinatario_telf,
        codigo_postal: dto.codigo_postal,

    }
    console.log(entregaMapeada)
    return entregaMapeada
}


export function mapEntregaToDto(entrega) {
    return {
        id: entrega.id,
        fuente: entrega.fuente ?? null,
        producto: entrega.producto,
        precio: entrega.precio,
        fecha: entrega.fecha_entrega,
        nombre_mensaje: entrega.destinatario,
        texto_mensaje: entrega.mensaje ?? null,
        cliente_nombre: entrega.cliente,
        cliente_telf: entrega.telf_cliente,
        horario: entrega.horario,
        observaciones: entrega.observaciones ?? null,
        
        direccion: entrega.direccion,
        destinatario_telf: entrega.telf_destinatario,
        codigo_postal: entrega.codigo_postal,
    }
}
