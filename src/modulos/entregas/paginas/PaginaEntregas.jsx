import {
  archivarEntrega,
  listarEntregas,
  obtenerPdfEntrega,
  restaurarEntrega,
} from "@/modulos/entregas/api/entregasApi";
import TarjetaEntrega from "@/modulos/entregas/componentes/TarjetaEntrega";
import EspacioPedidos from "@/modulos/compartido/componentes/pedidos/EspacioPedidos";
import { usePaginaPedidosEscritorio } from "@/modulos/compartido/hooks/usePaginaPedidosEscritorio";
import { mostrarDetallePedido } from "@/modulos/compartido/utilidades/alertas";
import { construirHtmlDetalleEntrega } from "@/modulos/entregas/utilidades/htmlDetalleEntrega";

const OPCIONES_ORDEN = [
  { value: "fecha_desc", label: "Fecha descendente" },
  { value: "fecha_asc", label: "Fecha ascendente" },
  { value: "cp", label: "Código Postal" },
];

export default function PaginaEntregas() {
  const pagina = usePaginaPedidosEscritorio({
    listarPedidos: listarEntregas,
    archivarPedido: archivarEntrega,
    restaurarPedido: restaurarEntrega,
    obtenerPdf: obtenerPdfEntrega,
    filtrosIniciales: {
      ordenar: "fecha_desc",
    },
    textos: {
      errorCarga: "No se pudieron cargar las entregas",
      errorPdf: "No se pudo generar el PDF",
      exitoArchivar: "Entrega archivada",
      errorArchivar: "No se pudo archivar la entrega",
      exitoRestaurar: "Entrega restaurada",
      errorRestaurar: "No se pudo restaurar la entrega",
    },
  });

  function alAbrirDetalle(entrega, { archivados, alEditar, alImprimir, alArchivar, alRestaurar }) {
    const acciones = [
      ...(!archivados
        ? [{ id: "editar", texto: "Editar", tono: "secundario", onClick: alEditar }]
        : []),
      { id: "imprimir", texto: "Imprimir", tono: "primario", onClick: alImprimir },
      archivados
        ? { id: "restaurar", texto: "Restaurar", tono: "secundario", onClick: alRestaurar }
        : { id: "archivar", texto: "Archivar", tono: "peligro", onClick: alArchivar },
    ];

    mostrarDetallePedido({
      html: construirHtmlDetalleEntrega(entrega),
      acciones,
    });
  }

  return (
    <EspacioPedidos
      titulo="Entregas"
      descripcion="Pedidos a domicilio"
      pagina={pagina}
      opcionesOrden={OPCIONES_ORDEN}
      rutaCrear="/entregas/nueva"
      rutaEditar={(id) => `/entregas/${id}/editar`}
      accionesRapidas={[
        {
          texto: "Mañana",
          activa: pagina.filtros.horario === "MAÑANA",
          onClick: () =>
            pagina.actualizarFiltro(
              "horario",
              pagina.filtros.horario === "MAÑANA" ? "" : "MAÑANA"
            ),
        },
        {
          texto: "Tarde",
          activa: pagina.filtros.horario === "TARDE",
          onClick: () =>
            pagina.actualizarFiltro(
              "horario",
              pagina.filtros.horario === "TARDE" ? "" : "TARDE"
            ),
        },
      ]}
      renderTarjeta={({ pedido, ...acciones }) => (
        <TarjetaEntrega key={pedido.id} pedido={pedido} {...acciones} />
      )}
      alAbrirDetalle={alAbrirDetalle}
    />
  );
}
