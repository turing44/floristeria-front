import {
  archivarReserva,
  listarReservas,
  obtenerPdfReserva,
  restaurarReserva,
} from "@/modulos/reservas/api/reservasApi";
import TarjetaReserva from "@/modulos/reservas/componentes/TarjetaReserva";
import EspacioPedidos from "@/modulos/compartido/componentes/pedidos/EspacioPedidos";
import { usePaginaPedidosEscritorio } from "@/modulos/compartido/hooks/usePaginaPedidosEscritorio";
import { mostrarDetallePedido } from "@/modulos/compartido/utilidades/alertas";
import { construirHtmlDetalleReserva } from "@/modulos/reservas/utilidades/htmlDetalleReserva";

const OPCIONES_ORDEN = [
  { value: "fecha_desc", label: "Fecha descendente" },
  { value: "fecha_asc", label: "Fecha ascendente" },
];

export default function PaginaReservas() {
  const pagina = usePaginaPedidosEscritorio({
    listarPedidos: listarReservas,
    archivarPedido: archivarReserva,
    restaurarPedido: restaurarReserva,
    obtenerPdf: obtenerPdfReserva,
    filtrosIniciales: {
      ordenar: "fecha_desc",
    },
    textos: {
      errorCarga: "No se pudieron cargar las reservas",
      errorPdf: "No se pudo generar el PDF",
      exitoArchivar: "Reserva archivada",
      errorArchivar: "No se pudo archivar la reserva",
      exitoRestaurar: "Reserva restaurada",
      errorRestaurar: "No se pudo restaurar la reserva",
    },
  });

  function alAbrirDetalle(reserva, { archivados, alEditar, alImprimir, alArchivar, alRestaurar }) {
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
      html: construirHtmlDetalleReserva(reserva),
      acciones,
    });
  }

  return (
    <EspacioPedidos
      titulo="Reservas"
      descripcion="Recogidas en tienda"
      pagina={pagina}
      opcionesOrden={OPCIONES_ORDEN}
      rutaCrear="/reservas/nueva"
      rutaEditar={(id) => `/reservas/${id}/editar`}
      accionesRapidas={[
        {
          texto: "Pendiente de pago",
          activa: pagina.filtros.pendientes_pago,
          onClick: () =>
            pagina.actualizarFiltro("pendientes_pago", !pagina.filtros.pendientes_pago),
        },
      ]}
      renderTarjeta={({ pedido, ...acciones }) => (
        <TarjetaReserva key={pedido.id} pedido={pedido} {...acciones} />
      )}
      alAbrirDetalle={alAbrirDetalle}
    />
  );
}
