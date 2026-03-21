import Swal from "sweetalert2";
import "@/styles/PedidoCard.css";

function mostrarMasInfo(entrega) {
  Swal.fire({
    title: entrega.id,
    html: `
      <p>${Number(entrega.precio).toFixed(2)} €</p>
      <br />
      <p>Cliente: ${entrega.cliente_nombre} <a href="tel:${entrega.cliente_telf}">${entrega.cliente_telf}</a></p>
      <br />
      <p>Destinatario: ${entrega.nombre_mensaje ?? ""} <a href="tel:${entrega.destinatario_telf}">${entrega.destinatario_telf}</a></p>
      ${entrega.observaciones ? "<br /><p>Observaciones: " + entrega.observaciones + "</p>" : ""}
      ${entrega.texto_mensaje ? "<br /><p>Mensaje: " + entrega.texto_mensaje + "</p>" : ""}
    `,
  });
}

export default function TarjetaEntrega({
  entrega,
  mostrarArchivadas,
  alEditar,
  alArchivar,
  alRestaurar,
  alImprimir,
}) {
  const fecha = new Date(entrega.fecha);
  const fechaFormateada = Number.isNaN(fecha.getTime())
    ? entrega.fecha
    : new Intl.DateTimeFormat("es-ES").format(fecha);

  const direccionQuery = encodeURIComponent(
    `${entrega.direccion}, ${entrega.codigo_postal}`
  );

  return (
    <div className={entrega.observaciones ? "pedido con_observaciones" : "pedido"}>
      <div className="pedido__header">
        <strong>{entrega.id}</strong>
        <strong>{entrega.horario}</strong>
        <strong>{fechaFormateada}</strong>
      </div>

      <div className="pedido__content">
        <p>Producto: {entrega.producto}</p>
        <p>
          Destinatario: {entrega.nombre_mensaje}{" "}
          <a href={`tel:${entrega.destinatario_telf}`}>{entrega.destinatario_telf}</a>
        </p>
        <p>
          Direccion:{" "}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${direccionQuery}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {entrega.direccion}, {entrega.codigo_postal}
          </a>
        </p>
      </div>

      <div className="pedido__actions">
        <button
          className="btn btn-info"
          type="button"
          aria-label="Mas informacion"
          onClick={() => mostrarMasInfo(entrega)}
        >
          <i className="fa-solid fa-circle-info"></i>
        </button>

        {!mostrarArchivadas && (
          <button
            className="btn btn-warning"
            type="button"
            aria-label="Editar"
            onClick={() => alEditar(entrega.id)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        )}

        <button
          className="btn btn-success"
          type="button"
          aria-label="Imprimir"
          onClick={() => alImprimir(entrega.id)}
        >
          <i className="fa-solid fa-print"></i>
        </button>

        {mostrarArchivadas ? (
          <button
            className="btn btn-warning"
            type="button"
            aria-label="Restaurar"
            onClick={() => alRestaurar(entrega.id)}
          >
            Restaurar
          </button>
        ) : (
          <button
            className="btn btn-success"
            type="button"
            aria-label="Archivar"
            onClick={() => alArchivar(entrega.id)}
          >
            Confirmar
          </button>
        )}
      </div>
    </div>
  );
}
