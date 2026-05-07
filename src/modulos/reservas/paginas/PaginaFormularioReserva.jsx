import { useNavigate, useParams } from "react-router-dom";
import {
  actualizarReserva,
  crearReserva,
  obtenerPdfReserva,
} from "@/modulos/reservas/api/reservasApi";
import FormularioReserva from "@/modulos/reservas/componentes/FormularioReserva";
import {
  cerrarAlerta,
  mostrarCargandoPdf,
  mostrarError,
} from "@/modulos/compartido/utilidades/alertas";
import { abrirPdfEnNuevaVentana } from "@/modulos/compartido/utilidades/pdf";

export default function PaginaFormularioReserva() {
  const { id } = useParams();
  const navigate = useNavigate();

  async function alGuardar(valores, { imprimir = false } = {}) {
    const respuesta = id
      ? await actualizarReserva(id, valores)
      : await crearReserva(valores);

    const guardada = respuesta.data;

    if (imprimir && guardada?.id) {
      try {
        mostrarCargandoPdf();
        const blob = await obtenerPdfReserva(guardada.id);
        cerrarAlerta();
        abrirPdfEnNuevaVentana(blob);
      } catch (error) {
        cerrarAlerta();
        mostrarError(error, "No se pudo generar el PDF");
      }
    }

    navigate("/reservas");
    return guardada;
  }

  function alCancelar() {
    navigate("/reservas");
  }

  return (
    <div className="pagina-formulario">
      <FormularioReserva
        key={id ?? "crear-reserva"}
        idEditar={id}
        alGuardar={alGuardar}
        alCancelar={alCancelar}
      />
    </div>
  );
}
