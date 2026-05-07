import { useEffect, useMemo, useState } from "react";
import { construirValoresIniciales } from "@/modulos/compartido/utilidades/contratos";

export function useFormularioPedido({
  idEditar,
  obtenerContrato,
  obtenerRegistro,
  alGuardar,
}) {
  const operacion = idEditar ? "actualizar" : "crear";
  const [contrato, setContrato] = useState(null);
  const [valores, setValores] = useState({});
  const [valoresIniciales, setValoresIniciales] = useState({});
  const [errores, setErrores] = useState({});
  const [errorCarga, setErrorCarga] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    let cancelado = false;

    async function cargarFormulario() {
      setCargando(true);
      setErrorCarga(null);

      try {
        const [contratoRemoto, respuestaRegistro] = await Promise.all([
          obtenerContrato(operacion),
          idEditar ? obtenerRegistro(idEditar) : Promise.resolve(null),
        ]);

        if (cancelado) {
          return;
        }

        const valoresCargados = construirValoresIniciales(
          contratoRemoto,
          respuestaRegistro?.data ?? {}
        );

        setContrato(contratoRemoto);
        setValores(valoresCargados);
        setValoresIniciales(valoresCargados);
        setErrores({});
        setErrorCarga(null);
      } catch (error) {
        if (!cancelado) {
          setContrato(null);
          setErrorCarga(error);
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarFormulario();

    return () => {
      cancelado = true;
    };
  }, [idEditar, operacion, obtenerContrato, obtenerRegistro]);

  function cambiarValor(event) {
    const { name, value } = event.target;

    setValores((previos) => ({
      ...previos,
      [name]: value,
    }));

    setErrores((previos) => {
      if (!previos[name]) {
        return previos;
      }

      const actualizados = { ...previos };
      delete actualizados[name];
      return actualizados;
    });
  }

  async function enviar({ imprimir = false } = {}) {
    setEnviando(true);
    setErrores({});

    try {
      return await alGuardar(valores, { imprimir });
    } catch (error) {
      if (error?.status === 422 && error?.fields) {
        setErrores(error.fields);
        return null;
      }

      throw error;
    } finally {
      setEnviando(false);
    }
  }

  const sucio = useMemo(
    () => JSON.stringify(valores) !== JSON.stringify(valoresIniciales),
    [valores, valoresIniciales]
  );

  return {
    contrato,
    valores,
    errores,
    errorCarga,
    cargando,
    enviando,
    sucio,
    cambiarValor,
    enviar,
  };
}
