import { mapPedidoFromDto, mapPedidoToDto } from "./pedidoMapper";

export function mapEntregaFromDto(dto) {
  return {
    ...mapPedidoFromDto(dto),

    direccion: dto.direccion ?? "",
    telf_destinatario: dto.destinatario_telf ?? "",
    codigo_postal: dto.codigo_postal ?? "",
  };
}


export function mapEntregaToDto(entrega) {
    return {
        ...mapPedidoToDto(entrega),

        direccion: entrega.direccion,
        destinatario_telf: entrega.telf_destinatario,
        codigo_postal: entrega.codigo_postal,
    }
}