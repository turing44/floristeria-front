import TarjetaPedidoBase from "@/modulos/compartido/componentes/pedidos/TarjetaPedidoBase";
import { formatearFecha, formatearMoneda } from "@/modulos/compartido/utilidades/formato";

export default function TarjetaReserva({
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
  const pendiente = Number(pedido.dinero_pendiente || 0);

  return (
    <TarjetaPedidoBase
      id={pedido.id}
      fecha={formatearFecha(pedido.fecha)}
      seleccionado={seleccionado}
      archivado={archivados}
      destacado={Boolean(pedido.observaciones) || pendiente > 0}
      onSeleccionar={alSeleccionar}
      badges={[
        {
          texto: pendiente > 0 ? `Pendiente ${formatearMoneda(pendiente)}` : "Pagado",
          tono: pendiente > 0 ? "peligro" : "estado",
        },
        ...(pedido.hora_recogida
          ? [{ texto: `${pedido.hora_recogida}h`, tono: "neutro" }]
          : []),
      ]}
      lineas={[
        { etiqueta: "Producto", valor: pedido.producto },
        { etiqueta: "Cliente", valor: `${pedido.nombre_cliente} · ${pedido.telefono_cliente}` },
        { etiqueta: "Recogida", valor: pedido.hora_recogida ? `${pedido.hora_recogida} h` : "Sin hora" },
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
