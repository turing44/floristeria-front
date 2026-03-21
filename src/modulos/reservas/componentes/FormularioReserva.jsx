import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { obtenerContratoReserva } from "@/modulos/contratos/api/contratosApi";
import { obtenerReserva } from "@/modulos/reservas/api/reservasApi";
import FormularioContrato from "@/modulos/compartido/componentes/FormularioContrato";
import { construirValoresIniciales } from "@/modulos/compartido/utilidades/contratos";
import { mostrarError } from "@/modulos/compartido/utilidades/alertas";

export default function FormularioReserva({ idEditar, alGuardar }) {
  const operacion = idEditar ? "actualizar" : "crear";
  const [contrato, setContrato] = useState(null);
  const [valores, setValores] = useState({});

  useEffect(() => {
    let cancelado = false;

    async function cargarFormulario() {
      try {
        const [contratoRemoto, reserva] = await Promise.all([
          obtenerContratoReserva(operacion),
          idEditar ? obtenerReserva(idEditar) : Promise.resolve(null),
        ]);

        if (cancelado) {
          return;
        }

        setContrato(contratoRemoto);
        setValores(construirValoresIniciales(contratoRemoto, reserva ?? {}));
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
      mostrarError(error, "No se pudo guardar la reserva");
      Swal.close();
    }
  }

  if (!contrato) {
    return <p>Cargando formulario...</p>;
  }

  return (
    <FormularioContrato
      titulo="Reservas"
      contrato={contrato}
      valores={valores}
      alCambiar={handleChange}
      alEnviar={handleSubmit}
    />
  );
}
