import { useState } from "react";
import "@/styles/SideBar.css";

export default function PanelPedidos({
  opcionesOrden,
  ordenSeleccionado,
  alCambiarOrden,
  alCrear,
  alAlternarArchivadas,
  textoArchivadas,
  alImprimirPorId,
}) {
  const [idBuscar, setIdBuscar] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    alImprimirPorId(idBuscar);
  }

  return (
    <aside id="sidebar-aside">
      <form onSubmit={handleSubmit} className="cuadro-busqueda-id">
        <input
          type="number"
          placeholder="Introduce el ID"
          required
          min={1}
          value={idBuscar}
          onChange={(event) => setIdBuscar(event.target.value)}
        />

        <button type="submit">
          <i className="fa-solid fa-search"></i>
        </button>
      </form>

      <select
        value={ordenSeleccionado}
        onChange={(event) => alCambiarOrden(event.target.value)}
        id="sort"
      >
        {opcionesOrden.map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>

      <button type="button" onClick={alCrear}>
        Crear nuevo
      </button>
      <button type="button" onClick={alAlternarArchivadas}>
        {textoArchivadas}
      </button>
    </aside>
  );
}
