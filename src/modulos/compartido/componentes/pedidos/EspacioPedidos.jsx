import { useEffect, useRef } from "react";
import BarraPedidos from "@/modulos/compartido/componentes/pedidos/BarraPedidos";
import PanelLateralPedidos from "@/modulos/compartido/componentes/pedidos/PanelLateralPedidos";
import "./EspacioPedidos.css";

export default function EspacioPedidos({
  titulo,
  descripcion,
  pagina,
  opcionesOrden,
  accionesRapidas,
  renderTarjeta,
  renderDetalle,
  renderFormulario,
}) {
  const inputBusquedaRef = useRef(null);

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
        pagina.abrirCrear();
      }

      if (event.key.toLowerCase() === "p" && pagina.seleccionado) {
        event.preventDefault();
        pagina.imprimirPedido();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        pagina.cerrarPanel();
      }
    }

    window.addEventListener("keydown", manejarAtajos);
    return () => window.removeEventListener("keydown", manejarAtajos);
  }, [pagina]);

  const contenidoPanel =
    pagina.modoPanel === "crear" ||
    (pagina.modoPanel === "editar" && pagina.seleccionado) ? (
      renderFormulario({
        idEditar: pagina.modoPanel === "editar" ? pagina.seleccionado?.id : null,
        alGuardar: pagina.guardarPedido,
        alCancelar: pagina.cerrarPanel,
      })
    ) : pagina.seleccionado ? (
      renderDetalle({
        pedido: pagina.seleccionado,
        archivados: pagina.filtros.archivados,
        procesando: pagina.procesando,
        alEditar: () => pagina.abrirEditar(pagina.seleccionado.id),
        alArchivar: () => pagina.archivarPedido(pagina.seleccionado.id),
        alRestaurar: () => pagina.restaurarPedido(pagina.seleccionado.id),
        alImprimir: () => pagina.imprimirPedido(pagina.seleccionado.id),
      })
    ) : (
      <div className="panel-pedidos__vacio">
        <h2>Sin seleccion</h2>
        <p>Selecciona un pedido de la lista o crea uno nuevo.</p>
      </div>
    );

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
        alCrear={pagina.abrirCrear}
        alImprimirSeleccionado={() => pagina.imprimirPedido()}
        haySeleccion={Boolean(pagina.seleccionado)}
        accionesRapidas={accionesRapidas}
      />

      <section className="pedidos-escritorio__lista">
        {pagina.cargandoLista ? (
          <div className="panel-pedidos__vacio">
            <h2>Cargando pedidos...</h2>
          </div>
        ) : pagina.pedidos.length === 0 ? (
          <div className="panel-pedidos__vacio">
            <h2>No hay resultados</h2>
            <p>Prueba otro filtro o crea un nuevo pedido.</p>
          </div>
        ) : (
          pagina.pedidos.map((pedido) =>
            renderTarjeta({
              pedido,
              seleccionado: pagina.seleccionado?.id === pedido.id,
              archivados: pagina.filtros.archivados,
              procesando: pagina.procesando,
              alSeleccionar: () => pagina.seleccionarPedido(pedido.id),
              alEditar: () => pagina.abrirEditar(pedido.id),
              alArchivar: () => pagina.archivarPedido(pedido.id),
              alRestaurar: () => pagina.restaurarPedido(pedido.id),
              alImprimir: () => pagina.imprimirPedido(pedido.id),
            })
          )
        )}
      </section>

      <PanelLateralPedidos>{contenidoPanel}</PanelLateralPedidos>
    </div>
  );
}
