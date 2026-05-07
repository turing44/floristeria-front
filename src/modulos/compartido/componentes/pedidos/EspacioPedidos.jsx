import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BarraPedidos from "@/modulos/compartido/componentes/pedidos/BarraPedidos";
import "./EspacioPedidos.css";

export default function EspacioPedidos({
  titulo,
  descripcion,
  pagina,
  opcionesOrden,
  accionesRapidas,
  rutaCrear,
  rutaEditar,
  renderTarjeta,
  alAbrirDetalle,
}) {
  const inputBusquedaRef = useRef(null);
  const navigate = useNavigate();

  function irACrear() {
    navigate(rutaCrear);
  }

  function irAEditar(id) {
    navigate(rutaEditar(id));
  }

  useEffect(() => {
    function manejarAtajos(event) {
      const etiqueta = event.target?.tagName;
      const estaEscribiendo =
        etiqueta === "INPUT" || etiqueta === "TEXTAREA" || etiqueta === "SELECT";

      if (event.key === "/" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        inputBusquedaRef.current?.focus();
        return;
      }

      if (estaEscribiendo) {
        return;
      }

      if (event.key.toLowerCase() === "n") {
        event.preventDefault();
        irACrear();
      }
    }

    window.addEventListener("keydown", manejarAtajos);
    return () => window.removeEventListener("keydown", manejarAtajos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina]);

  return (
    <div className="pedidos-escritorio">
      <BarraPedidos
        titulo={titulo}
        descripcion={descripcion}
        filtros={pagina.filtros}
        meta={pagina.meta}
        opcionesOrden={opcionesOrden}
        inputBusquedaRef={inputBusquedaRef}
        alCambiarFiltro={pagina.actualizarFiltro}
        alCrear={irACrear}
        accionesRapidas={accionesRapidas}
      />

      {pagina.cargandoLista ? (
        <div className="pedidos-escritorio__estado">
          <h2>Cargando pedidos...</h2>
        </div>
      ) : pagina.pedidos.length === 0 ? (
        <div className="pedidos-escritorio__estado">
          <h2>No hay resultados</h2>
          <p>Prueba otro filtro o crea un nuevo pedido.</p>
        </div>
      ) : (
        <section className="pedidos-escritorio__grid">
          {pagina.pedidos.map((pedido) =>
            renderTarjeta({
              pedido,
              archivados: pagina.filtros.archivados,
              alSeleccionar: () =>
                alAbrirDetalle(pedido, {
                  archivados: pagina.filtros.archivados,
                  alEditar: () => irAEditar(pedido.id),
                  alImprimir: () => pagina.imprimirPedido(pedido.id),
                  alArchivar: () => pagina.archivarPedido(pedido.id),
                  alRestaurar: () => pagina.restaurarPedido(pedido.id),
                }),
            })
          )}
        </section>
      )}
    </div>
  );
}
