import Swal from "sweetalert2";
import "@/styles/PedidoCard.css";

function mostrarMasInfo(reserva) {
  Swal.fire({
    title: reserva.id,
    html: `
      <p>${Number(reserva.precio).toFixed(2)} €</p>
      <br />
      <p>Cliente: ${reserva.cliente_nombre} <a href="tel:${reserva.cliente_telf}">${reserva.cliente_telf}</a></p>
      ${reserva.observaciones ? "<br /><p>Observaciones: " + reserva.observaciones + "</p>" : ""}
      <br />
      <p>Dinero pendiente: ${Number(reserva.dinero_pendiente).toFixed(2)} €</p>
    `,
  });
}

export default function TarjetaReserva({
  reserva,
  mostrarArchivadas,
  alEditar,
  alArchivar,
  alRestaurar,
  alImprimir,
}) {
  const fecha = new Date(reserva.fecha);
  const fechaFormateada = Number.isNaN(fecha.getTime())
    ? reserva.fecha
    : new Intl.DateTimeFormat("es-ES").format(fecha);

  const pendiente = Number(reserva.dinero_pendiente || 0);
  const estadoPago = pendiente > 0 ? `Pendiente: ${pendiente.toFixed(2)} €` : "PAGADO";

  return (
    <div className={reserva.observaciones ? "pedido con_observaciones" : "pedido"}>
      <div className="pedido__header">
        <strong>{reserva.id}</strong>
        {pendiente > 0 ? (
          <strong style={{ color: "red" }}>{estadoPago}</strong>
        ) : (
          <strong>{estadoPago}</strong>
        )}
        <strong>{fechaFormateada}</strong>
      </div>

      <div className="pedido__content">
        <p>Producto: {reserva.producto}</p>
        <p>
          Cliente: {reserva.cliente_nombre}{" "}
          <a href={`tel:${reserva.cliente_telf}`}>{reserva.cliente_telf}</a>
        </p>
        {Boolean(reserva.hora_recogida) && (
          <p>Hora Recogida: {reserva.hora_recogida}h</p>
        )}
      </div>

      <div className="pedido__actions">
        <button
          className="btn btn-info"
          type="button"
          aria-label="Mas informacion"
          onClick={() => mostrarMasInfo(reserva)}
        >
          <i className="fa-solid fa-circle-info"></i>
        </button>

        {!mostrarArchivadas && (
          <button
            className="btn btn-warning"
            type="button"
            aria-label="Editar"
            onClick={() => alEditar(reserva.id)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        )}

        <button
          className="btn btn-success"
          type="button"
          aria-label="Imprimir"
          onClick={() => alImprimir(reserva.id)}
        >
          <i className="fa-solid fa-print"></i>
        </button>

        {mostrarArchivadas ? (
          <button
            className="btn btn-warning"
            type="button"
            aria-label="Restaurar"
            onClick={() => alRestaurar(reserva.id)}
          >
            Restaurar
          </button>
        ) : (
          <button
            className="btn btn-success"
            type="button"
            aria-label="Archivar"
            onClick={() => alArchivar(reserva.id)}
          >
            Confirmar
          </button>
        )}
      </div>
    </div>
  );
}
