import { useEffect } from "react";
import { obtenerContratoReserva } from "@/modulos/contratos/api/contratosApi";
import { obtenerReserva } from "@/modulos/reservas/api/reservasApi";
import FormularioContrato from "@/modulos/compartido/componentes/FormularioContrato";
import { useFormularioPedido } from "@/modulos/compartido/hooks/useFormularioPedido";
import { mostrarError } from "@/modulos/compartido/utilidades/alertas";

export default function FormularioReserva({ idEditar, alGuardar, alCancelar }) {
  const formulario = useFormularioPedido({
    idEditar,
    obtenerContrato: obtenerContratoReserva,
    obtenerRegistro: obtenerReserva,
    alGuardar,
  });

  useEffect(() => {
    if (formulario.errorCarga) {
      mostrarError(formulario.errorCarga, "No se pudo cargar el formulario de reserva");
    }
  }, [formulario.errorCarga]);

  async function guardar(imprimir) {
    try {
      await formulario.enviar({ imprimir });
    } catch (error) {
      mostrarError(error, "No se pudo guardar la reserva");
    }
  }

  if (formulario.cargando || !formulario.contrato) {
    if (formulario.errorCarga) {
      return (
        <div className="panel-pedidos__vacio">
          No se pudo cargar el formulario. Revisa la conexion con la API y la
          configuracion del despliegue.
        </div>
      );
    }

    return <div className="panel-pedidos__vacio">Cargando formulario...</div>;
  }

  return (
    <FormularioContrato
      titulo="Reservas"
      contrato={formulario.contrato}
      valores={formulario.valores}
      errores={formulario.errores}
      enviando={formulario.enviando}
      sucio={formulario.sucio}
      alCambiar={formulario.cambiarValor}
      alGuardar={() => guardar(false)}
      alGuardarEImprimir={() => guardar(true)}
      alCancelar={alCancelar}
    />
  );
}
