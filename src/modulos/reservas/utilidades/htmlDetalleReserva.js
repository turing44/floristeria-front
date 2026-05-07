import { formatearFecha, formatearMoneda } from "@/modulos/compartido/utilidades/formato";
import { bloque, cabecera, escaparHtml } from "@/modulos/compartido/utilidades/htmlDetalle";

export function construirHtmlDetalleReserva(reserva) {
  const dineroPendiente = Number(reserva.dinero_pendiente || 0);
  const telCliente = `<a href="tel:${escaparHtml(reserva.telefono_cliente)}">${escaparHtml(reserva.telefono_cliente)}</a>`;

  return [
    cabecera({
      eyebrow: `Reserva #${reserva.id}`,
      titulo: reserva.nombre_cliente || "Sin cliente",
      badge: dineroPendiente > 0 ? `Pendiente ${formatearMoneda(dineroPendiente)}` : "Pagado",
    }),
    bloque([
      { etiqueta: "Fecha", valor: formatearFecha(reserva.fecha) },
      { etiqueta: "Precio", valor: formatearMoneda(reserva.precio) },
      { etiqueta: "Producto", valor: reserva.producto },
    ]),
    bloque([
      { etiqueta: "Cliente", valor: reserva.nombre_cliente },
      { etiqueta: "Teléfono", valor: telCliente, html: true },
      reserva.hora_recogida ? { etiqueta: "Hora de recogida", valor: `${reserva.hora_recogida} h` } : null,
      { etiqueta: "Dinero pendiente", valor: formatearMoneda(dineroPendiente) },
    ]),
    reserva.observaciones
      ? bloque([{ etiqueta: "Observaciones", valor: reserva.observaciones }])
      : "",
  ].join("");
}
