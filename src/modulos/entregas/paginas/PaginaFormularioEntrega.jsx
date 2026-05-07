import { useNavigate, useParams } from "react-router-dom";
import { actualizarEntrega, crearEntrega, obtenerPdfEntrega } from "@/modulos/entregas/api/entregasApi";
import FormularioEntrega from "@/modulos/entregas/componentes/FormularioEntrega";
import {
  cerrarAlerta,
  mostrarCargandoPdf,
  mostrarError,
} from "@/modulos/compartido/utilidades/alertas";
import { abrirPdfEnNuevaVentana } from "@/modulos/compartido/utilidades/pdf";

export default function PaginaFormularioEntrega() {
  const { id } = useParams();
  const navigate = useNavigate();

  async function alGuardar(valores, { imprimir = false } = {}) {
    const respuesta = id
      ? await actualizarEntrega(id, valores)
      : await crearEntrega(valores);

    const guardada = respuesta.data;

    if (imprimir && guardada?.id) {
      try {
        mostrarCargandoPdf();
        const blob = await obtenerPdfEntrega(guardada.id);
        cerrarAlerta();
        abrirPdfEnNuevaVentana(blob);
      } catch (error) {
        cerrarAlerta();
        mostrarError(error, "No se pudo generar el PDF");
      }
    }

    navigate("/");
    return guardada;
  }

  function alCancelar() {
    navigate("/");
  }

  return (
    <div className="pagina-formulario">
      <FormularioEntrega
        key={id ?? "crear-entrega"}
        idEditar={id}
        alGuardar={alGuardar}
        alCancelar={alCancelar}
      />
    </div>
  );
}
