import {
  actualizarEntrega,
  archivarEntrega,
  crearEntrega,
  listarEntregas,
  obtenerPdfEntrega,
  restaurarEntrega,
} from "@/modulos/entregas/api/entregasApi";
import FormularioEntrega from "@/modulos/entregas/componentes/FormularioEntrega";
import TarjetaEntrega from "@/modulos/entregas/componentes/TarjetaEntrega";
import DetalleEntrega from "@/modulos/entregas/componentes/detalle/DetalleEntrega";
import EspacioPedidos from "@/modulos/compartido/componentes/pedidos/EspacioPedidos";
import { usePaginaPedidosEscritorio } from "@/modulos/compartido/hooks/usePaginaPedidosEscritorio";

const OPCIONES_ORDEN = [
  { value: "fecha_desc", label: "Fecha descendente" },
  { value: "fecha_asc", label: "Fecha ascendente" },
  { value: "cp", label: "Codigo Postal" },
];

export default function PaginaEntregas() {
  const pagina = usePaginaPedidosEscritorio({
    listarPedidos: listarEntregas,
    crearPedido: crearEntrega,
    actualizarPedido: actualizarEntrega,
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

  return (
    <EspacioPedidos
      titulo="Entregas"
      descripcion="Pedidos a domicilio"
      pagina={pagina}
      opcionesOrden={OPCIONES_ORDEN}
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
      renderDetalle={({ pedido, ...acciones }) => (
        <DetalleEntrega key={pedido.id} entrega={pedido} {...acciones} />
      )}
      renderFormulario={({ idEditar, alGuardar, alCancelar }) => (
        <FormularioEntrega
          key={idEditar ?? "crear-entrega"}
          idEditar={idEditar}
          alGuardar={alGuardar}
          alCancelar={alCancelar}
        />
      )}
    />
  );
}
