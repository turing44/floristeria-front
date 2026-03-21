import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { obtenerContratoEntrega } from "@/modulos/contratos/api/contratosApi";
import { obtenerEntrega } from "@/modulos/entregas/api/entregasApi";
import FormularioContrato from "@/modulos/compartido/componentes/FormularioContrato";
import { construirValoresIniciales } from "@/modulos/compartido/utilidades/contratos";
import { mostrarError } from "@/modulos/compartido/utilidades/alertas";

export default function FormularioEntrega({ idEditar, alGuardar }) {
  const operacion = idEditar ? "actualizar" : "crear";
  const [contrato, setContrato] = useState(null);
  const [valores, setValores] = useState({});

  useEffect(() => {
    let cancelado = false;

    async function cargarFormulario() {
      try {
        const [contratoRemoto, entrega] = await Promise.all([
          obtenerContratoEntrega(operacion),
          idEditar ? obtenerEntrega(idEditar) : Promise.resolve(null),
        ]);

        if (cancelado) {
          return;
        }

        setContrato(contratoRemoto);
        setValores(construirValoresIniciales(contratoRemoto, entrega ?? {}));
      } catch (error) {
        mostrarError(error, "No se pudo cargar el formulario");
      }
    }

    cargarFormulario();

    return () => {
      cancelado = true;
    };
  }, [idEditar, operacion]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValores((previos) => ({ ...previos, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await alGuardar(valores);
    } catch (error) {
      mostrarError(error, "No se pudo guardar la entrega");
      Swal.close();
    }
  }

  if (!contrato) {
    return <p>Cargando formulario...</p>;
  }

  return (
    <FormularioContrato
      titulo="Entregas"
      contrato={contrato}
      valores={valores}
      alCambiar={handleChange}
      alEnviar={handleSubmit}
    />
  );
}
