import TarjetaPedidoBase from "@/modulos/compartido/componentes/pedidos/TarjetaPedidoBase";
import { formatearFecha } from "@/modulos/compartido/utilidades/formato";

export default function TarjetaEntrega({ pedido, archivados, alSeleccionar }) {
  return (
    <TarjetaPedidoBase
      id={pedido.id}
      fecha={formatearFecha(pedido.fecha)}
      archivado={archivados}
      destacado={Boolean(pedido.observaciones)}
      onSeleccionar={alSeleccionar}
      badges={[
        { texto: pedido.horario || "INDIFERENTE", tono: "estado" },
        ...(pedido.observaciones ? [{ texto: "Observaciones", tono: "aviso" }] : []),
      ]}
      lineas={[
        { etiqueta: "Producto", valor: pedido.producto },
        {
          etiqueta: "Destinatario",
          valor: `${pedido.nombre_destinatario || "Sin tarjeta"} · ${pedido.telefono_destinatario}`,
        },
        {
          etiqueta: "Dirección",
          valor: `${pedido.direccion}, ${pedido.codigo_postal}`,
        },
      ]}
    />
  );
}
