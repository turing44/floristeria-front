export function mapEntregaFromDto(dto) {
  return {
    id: dto.pedido_id ?? "",
    fuente: dto.pedido?.fuente ?? "",
    producto: dto.pedido?.producto ?? "",
    precio: dto.pedido?.precio ?? "",
    fecha_entrega: dto.pedido?.fecha ?? "",
    cliente: dto.pedido?.cliente_nombre ?? "",
    telf_cliente: dto.pedido?.cliente_telf ?? "",
    horario: dto.pedido?.horario ?? "INDIFERENTE",
    observaciones: dto.pedido?.observaciones ?? "",
    destinatario: dto.pedido?.nombre_mensaje ?? "",
    mensaje: dto.pedido?.texto_mensaje ?? "",
    direccion: dto.direccion ?? "",
    telf_destinatario: dto.destinatario_telf ?? "",
    codigo_postal: dto.codigo_postal ?? "",
  };
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
