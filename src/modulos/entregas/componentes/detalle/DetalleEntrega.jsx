import { formatearFecha, formatearMoneda } from "@/modulos/compartido/utilidades/formato";

export default function DetalleEntrega({
  entrega,
  archivados,
  procesando,
  alEditar,
  alArchivar,
  alRestaurar,
  alImprimir,
}) {
  const direccionQuery = encodeURIComponent(
    `${entrega.direccion}, ${entrega.codigo_postal}`
  );

  return (
    <div className="panel-detalle">
      <div className="panel-detalle__cabecera">
        <div>
          <p className="panel-detalle__eyebrow">Entrega #{entrega.id}</p>
          <h2>{entrega.nombre_destinatario || entrega.nombre_cliente}</h2>
        </div>

        <span className="panel-detalle__badge">{entrega.horario}</span>
      </div>

      <div className="panel-detalle__bloque">
        <p><strong>Fecha:</strong> {formatearFecha(entrega.fecha)}</p>
        <p><strong>Precio:</strong> {formatearMoneda(entrega.precio)}</p>
        <p><strong>Producto:</strong> {entrega.producto}</p>
      </div>

      <div className="panel-detalle__bloque">
        <p><strong>Cliente:</strong> {entrega.nombre_cliente}</p>
        <p><strong>Telefono cliente:</strong> <a href={`tel:${entrega.telefono_cliente}`}>{entrega.telefono_cliente}</a></p>
        <p><strong>Destinatario:</strong> {entrega.nombre_destinatario || "Sin tarjeta"}</p>
        <p>
          <strong>Telefono destinatario:</strong>{" "}
          <a href={`tel:${entrega.telefono_destinatario}`}>{entrega.telefono_destinatario}</a>
        </p>
      </div>

      <div className="panel-detalle__bloque">
        <p>
          <strong>Direccion:</strong>{" "}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${direccionQuery}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {entrega.direccion}, {entrega.codigo_postal}
          </a>
        </p>

        {entrega.mensaje_tarjeta && (
          <p><strong>Mensaje:</strong> {entrega.mensaje_tarjeta}</p>
        )}

        {entrega.observaciones && (
          <p><strong>Observaciones:</strong> {entrega.observaciones}</p>
        )}
      </div>

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
