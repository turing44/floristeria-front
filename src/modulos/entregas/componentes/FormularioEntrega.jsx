import { obtenerContratoEntrega } from "@/modulos/contratos/api/contratosApi";
import { obtenerEntrega } from "@/modulos/entregas/api/entregasApi";
import FormularioContrato from "@/modulos/compartido/componentes/FormularioContrato";
import { useFormularioPedido } from "@/modulos/compartido/hooks/useFormularioPedido";
import { mostrarError } from "@/modulos/compartido/utilidades/alertas";

export default function FormularioEntrega({ idEditar, alGuardar, alCancelar }) {
  const formulario = useFormularioPedido({
    idEditar,
    obtenerContrato: obtenerContratoEntrega,
    obtenerRegistro: obtenerEntrega,
    alGuardar,
  });

  async function guardar(imprimir) {
    try {
      await formulario.enviar({ imprimir });
    } catch (error) {
      mostrarError(error, "No se pudo guardar la entrega");
    }
  }

  if (formulario.cargando || !formulario.contrato) {
    return <div className="panel-pedidos__vacio">Cargando formulario...</div>;
  }

  return (
    <FormularioContrato
      titulo="Entregas"
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
