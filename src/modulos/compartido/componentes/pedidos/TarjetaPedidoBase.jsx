import "./TarjetaPedidoBase.css";

export default function TarjetaPedidoBase({
  id,
  fecha,
  seleccionado,
  archivado,
  destacado,
  badges,
  lineas,
  acciones,
  onSeleccionar,
}) {
  return (
    <article
      className={[
        "pedido-tarjeta",
        seleccionado ? "pedido-tarjeta--seleccionada" : "",
        archivado ? "pedido-tarjeta--archivada" : "",
        destacado ? "pedido-tarjeta--destacada" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button type="button" className="pedido-tarjeta__cuerpo" onClick={onSeleccionar}>
        <div className="pedido-tarjeta__cabecera">
          <span className="pedido-tarjeta__id">#{id}</span>

          <div className="pedido-tarjeta__badges">
            {badges.map((badge) => (
              <span
                key={badge.texto}
                className={`pedido-tarjeta__badge pedido-tarjeta__badge--${badge.tono || "neutro"}`}
              >
                {badge.texto}
              </span>
            ))}
          </div>

          <span className="pedido-tarjeta__fecha">{fecha}</span>
        </div>

        <div className="pedido-tarjeta__contenido">
          {lineas.map((linea) => (
            <p key={linea.etiqueta}>
              <strong>{linea.etiqueta}:</strong> {linea.valor}
            </p>
          ))}
        </div>
      </button>

      <div className="pedido-tarjeta__acciones">
        {acciones.map((accion) => (
          <button
            key={accion.texto}
            type="button"
            className={`pedido-tarjeta__accion pedido-tarjeta__accion--${accion.tono || "neutro"}`}
            onClick={accion.onClick}
            disabled={accion.deshabilitada}
          >
            {accion.icono && <i className={accion.icono}></i>}
            <span>{accion.texto}</span>
          </button>
        ))}
      </div>
    </article>
  );
}
