import TarjetaPedidoBase from "@/modulos/compartido/componentes/pedidos/TarjetaPedidoBase";
import { formatearFecha } from "@/modulos/compartido/utilidades/formato";

export default function TarjetaEntrega({
  pedido,
  seleccionado,
  archivados,
  procesando,
  alSeleccionar,
  alEditar,
  alArchivar,
  alRestaurar,
  alImprimir,
}) {
  return (
    <TarjetaPedidoBase
      id={pedido.id}
      fecha={formatearFecha(pedido.fecha)}
      seleccionado={seleccionado}
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
          etiqueta: "Direccion",
          valor: `${pedido.direccion}, ${pedido.codigo_postal}`,
        },
      ]}
      acciones={[
        ...(!archivados
          ? [
              {
                texto: "Editar",
                icono: "fa-solid fa-pen-to-square",
                tono: "secundario",
                onClick: alEditar,
                deshabilitada: procesando,
              },
            ]
          : []),
        {
          texto: "Imprimir",
          icono: "fa-solid fa-print",
          tono: "primario",
          onClick: alImprimir,
          deshabilitada: procesando,
        },
        archivados
          ? {
              texto: "Restaurar",
              tono: "neutro",
              onClick: alRestaurar,
              deshabilitada: procesando,
            }
          : {
              texto: "Archivar",
              tono: "peligro",
              onClick: alArchivar,
              deshabilitada: procesando,
            },
      ]}
    />
  );
}
