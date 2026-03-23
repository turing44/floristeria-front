import {
  actualizarReserva,
  archivarReserva,
  crearReserva,
  listarReservas,
  obtenerPdfReserva,
  restaurarReserva,
} from "@/modulos/reservas/api/reservasApi";
import FormularioReserva from "@/modulos/reservas/componentes/FormularioReserva";
import TarjetaReserva from "@/modulos/reservas/componentes/TarjetaReserva";
import DetalleReserva from "@/modulos/reservas/componentes/detalle/DetalleReserva";
import EspacioPedidos from "@/modulos/compartido/componentes/pedidos/EspacioPedidos";
import { usePaginaPedidosEscritorio } from "@/modulos/compartido/hooks/usePaginaPedidosEscritorio";

const OPCIONES_ORDEN = [
  { value: "fecha_desc", label: "Fecha descendente" },
  { value: "fecha_asc", label: "Fecha ascendente" },
];

export default function PaginaReservas() {
  const pagina = usePaginaPedidosEscritorio({
    listarPedidos: listarReservas,
    crearPedido: crearReserva,
    actualizarPedido: actualizarReserva,
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

  return (
    <EspacioPedidos
      titulo="Reservas"
      descripcion="Recogidas en tienda"
      pagina={pagina}
      opcionesOrden={OPCIONES_ORDEN}
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
      renderDetalle={({ pedido, ...acciones }) => (
        <DetalleReserva key={pedido.id} reserva={pedido} {...acciones} />
      )}
      renderFormulario={({ idEditar, alGuardar, alCancelar }) => (
        <FormularioReserva
          key={idEditar ?? "crear-reserva"}
          idEditar={idEditar}
          alGuardar={alGuardar}
          alCancelar={alCancelar}
        />
      )}
    />
  );
}
