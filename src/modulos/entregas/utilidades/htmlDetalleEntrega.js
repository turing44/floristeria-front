import { formatearFecha, formatearMoneda } from "@/modulos/compartido/utilidades/formato";
import { bloque, cabecera, escaparHtml } from "@/modulos/compartido/utilidades/htmlDetalle";

export function construirHtmlDetalleEntrega(entrega) {
  const direccionQuery = encodeURIComponent(
    `${entrega.direccion ?? ""}, ${entrega.codigo_postal ?? ""}`
  );

  const direccionHtml = `<a href="https://www.google.com/maps/search/?api=1&query=${direccionQuery}" target="_blank" rel="noopener noreferrer">${escaparHtml(entrega.direccion)}, ${escaparHtml(entrega.codigo_postal)}</a>`;
  const telCliente = `<a href="tel:${escaparHtml(entrega.telefono_cliente)}">${escaparHtml(entrega.telefono_cliente)}</a>`;
  const telDest = `<a href="tel:${escaparHtml(entrega.telefono_destinatario)}">${escaparHtml(entrega.telefono_destinatario)}</a>`;

  return [
    cabecera({
      eyebrow: `Entrega #${entrega.id}`,
      titulo: entrega.nombre_destinatario || entrega.nombre_cliente || "Sin destinatario",
      badge: entrega.horario,
    }),
    bloque([
      { etiqueta: "Fecha", valor: formatearFecha(entrega.fecha) },
      { etiqueta: "Precio", valor: formatearMoneda(entrega.precio) },
      { etiqueta: "Producto", valor: entrega.producto },
    ]),
    bloque([
      { etiqueta: "Cliente", valor: entrega.nombre_cliente },
      { etiqueta: "Teléfono cliente", valor: telCliente, html: true },
      { etiqueta: "Destinatario", valor: entrega.nombre_destinatario || "Sin tarjeta" },
      { etiqueta: "Teléfono destinatario", valor: telDest, html: true },
    ]),
    bloque([
      { etiqueta: "Dirección", valor: direccionHtml, html: true },
      entrega.mensaje_tarjeta ? { etiqueta: "Mensaje", valor: entrega.mensaje_tarjeta } : null,
      entrega.observaciones ? { etiqueta: "Observaciones", valor: entrega.observaciones } : null,
    ]),
  ].join("");
}
