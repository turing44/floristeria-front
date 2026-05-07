import { obtenerFechaHoy } from "@/modulos/compartido/utilidades/formato";

function TarjetaResumen({ etiqueta, valor }) {
  return (
    <div className="pedidos-barra__resumen-item">
      <span>{etiqueta}</span>
      <strong>{valor ?? 0}</strong>
    </div>
  );
}

function ChipFiltro({ activa, texto, onClick }) {
  return (
    <button
      type="button"
      className={`pedidos-barra__chip ${activa ? "pedidos-barra__chip--activo" : ""}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
}

export default function BarraPedidos({
  titulo,
  descripcion,
  filtros,
  meta,
  opcionesOrden,
  inputBusquedaRef,
  alCambiarFiltro,
  alCrear,
  accionesRapidas = [],
}) {
  const resumen = meta.resumen ?? {};
  const hoy = obtenerFechaHoy();
  const tarjetas = [
    { etiqueta: "Activas", valor: resumen.activas },
    { etiqueta: "Archivadas", valor: resumen.archivadas },
    { etiqueta: "Hoy", valor: resumen.hoy },
  ];

  if (typeof resumen.pendientes_pago === "number") {
    tarjetas.push({ etiqueta: "Pendientes", valor: resumen.pendientes_pago });
  }

  return (
    <section className="pedidos-barra">
      <div className="pedidos-barra__principal">
        <div>
          <p className="pedidos-barra__eyebrow">{titulo}</p>
          <h1>{descripcion}</h1>
        </div>

        <div className="pedidos-barra__acciones">
          <button type="button" className="boton-principal" onClick={alCrear}>
            Nuevo pedido
          </button>
        </div>
      </div>

      <div className="pedidos-barra__resumen">
        {tarjetas.map((tarjeta) => (
          <TarjetaResumen key={tarjeta.etiqueta} {...tarjeta} />
        ))}
      </div>

      <div className="pedidos-barra__controles">
        <input
          ref={inputBusquedaRef}
          type="search"
          value={filtros.buscar}
          onChange={(event) => alCambiarFiltro("buscar", event.target.value)}
          placeholder="Buscar por ID, cliente, teléfono o dirección"
        />

        <input
          type="date"
          value={filtros.fecha}
          onChange={(event) => alCambiarFiltro("fecha", event.target.value)}
        />

        <select
          value={filtros.ordenar}
          onChange={(event) => alCambiarFiltro("ordenar", event.target.value)}
        >
          {opcionesOrden.map((opcion) => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
        </select>
      </div>

      <div className="pedidos-barra__chips">
        <ChipFiltro
          activa={filtros.fecha === hoy}
          texto="Hoy"
          onClick={() => alCambiarFiltro("fecha", filtros.fecha === hoy ? "" : hoy)}
        />

        <ChipFiltro
          activa={filtros.archivados}
          texto="Archivados"
          onClick={() => alCambiarFiltro("archivados", !filtros.archivados)}
        />

        {accionesRapidas.map((accion) => (
          <ChipFiltro
            key={accion.texto}
            activa={accion.activa}
            texto={accion.texto}
            onClick={accion.onClick}
          />
        ))}
      </div>
    </section>
  );
}
