import "./TarjetaPedidoBase.css";

export default function TarjetaPedidoBase({
  id,
  fecha,
  archivado,
  destacado,
  badges,
  lineas,
  onSeleccionar,
}) {
  return (
    <button
      type="button"
      className={[
        "pedido-tarjeta",
        archivado ? "pedido-tarjeta--archivada" : "",
        destacado ? "pedido-tarjeta--destacada" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onSeleccionar}
    >
      <div className="pedido-tarjeta__cabecera">
        <span className="pedido-tarjeta__id">#{id}</span>
        <span className="pedido-tarjeta__fecha">{fecha}</span>
      </div>

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

      <div className="pedido-tarjeta__contenido">
        {lineas.map((linea) => (
          <p key={linea.etiqueta}>
            <strong>{linea.etiqueta}:</strong> {linea.valor}
          </p>
        ))}
      </div>
    </button>
  );
}
