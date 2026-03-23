import { formatearFecha, formatearMoneda } from "@/modulos/compartido/utilidades/formato";

export default function DetalleReserva({
  reserva,
  archivados,
  procesando,
  alEditar,
  alArchivar,
  alRestaurar,
  alImprimir,
}) {
  const dineroPendiente = Number(reserva.dinero_pendiente || 0);

  return (
    <div className="panel-detalle">
      <div className="panel-detalle__cabecera">
        <div>
          <p className="panel-detalle__eyebrow">Reserva #{reserva.id}</p>
          <h2>{reserva.nombre_cliente}</h2>
        </div>

        <span className="panel-detalle__badge">
          {dineroPendiente > 0 ? `Pendiente ${formatearMoneda(dineroPendiente)}` : "Pagado"}
        </span>
      </div>

      <div className="panel-detalle__bloque">
        <p><strong>Fecha:</strong> {formatearFecha(reserva.fecha)}</p>
        <p><strong>Precio:</strong> {formatearMoneda(reserva.precio)}</p>
        <p><strong>Producto:</strong> {reserva.producto}</p>
      </div>

      <div className="panel-detalle__bloque">
        <p><strong>Cliente:</strong> {reserva.nombre_cliente}</p>
        <p><strong>Telefono:</strong> <a href={`tel:${reserva.telefono_cliente}`}>{reserva.telefono_cliente}</a></p>
        {Boolean(reserva.hora_recogida) && (
          <p><strong>Hora de recogida:</strong> {reserva.hora_recogida} h</p>
        )}
        <p><strong>Dinero pendiente:</strong> {formatearMoneda(dineroPendiente)}</p>
      </div>

      {reserva.observaciones && (
        <div className="panel-detalle__bloque">
          <p><strong>Observaciones:</strong> {reserva.observaciones}</p>
        </div>
      )}

      <div className="panel-detalle__acciones">
        {!archivados && (
          <button type="button" className="boton-secundario" onClick={alEditar}>
            Editar
          </button>
        )}

        <button type="button" className="boton-principal" onClick={alImprimir}>
          Imprimir
        </button>

        {archivados ? (
          <button
            type="button"
            className="boton-accion"
            onClick={alRestaurar}
            disabled={procesando}
          >
            Restaurar
          </button>
        ) : (
          <button
            type="button"
            className="boton-accion boton-accion--peligro"
            onClick={alArchivar}
            disabled={procesando}
          >
            Archivar
          </button>
        )}
      </div>
    </div>
  );
}
