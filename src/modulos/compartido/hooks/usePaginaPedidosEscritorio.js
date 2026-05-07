import { useCallback, useEffect, useState } from "react";
import {
  cerrarAlerta,
  mostrarCargandoPdf,
  mostrarError,
  mostrarExito,
} from "@/modulos/compartido/utilidades/alertas";
import { abrirPdfEnNuevaVentana } from "@/modulos/compartido/utilidades/pdf";

const FILTROS_BASE = {
  archivados: false,
  ordenar: "fecha_desc",
  buscar: "",
  fecha: "",
  horario: "",
  pendientes_pago: false,
};

export function usePaginaPedidosEscritorio({
  listarPedidos,
  archivarPedido,
  restaurarPedido,
  obtenerPdf,
  textos,
  filtrosIniciales = {},
}) {
  const [filtros, setFiltros] = useState({ ...FILTROS_BASE, ...filtrosIniciales });
  const [pedidos, setPedidos] = useState([]);
  const [meta, setMeta] = useState({ resumen: {} });
  const [cargandoLista, setCargandoLista] = useState(true);
  const [procesando, setProcesando] = useState(false);

  const cargarPedidos = useCallback(async (signal) => {
    setCargandoLista(true);

    try {
      const respuesta = await listarPedidos(
        {
          archivados: filtros.archivados,
          ordenar: filtros.ordenar,
          buscar: filtros.buscar,
          fecha: filtros.fecha,
          horario: filtros.horario,
          pendientes_pago: filtros.pendientes_pago,
        },
        { signal }
      );

      if (signal?.aborted) {
        return null;
      }

      setPedidos(respuesta.data ?? []);
      setMeta(respuesta.meta ?? { resumen: {} });

      return respuesta;
    } catch (error) {
      if (error?.name !== "AbortError") {
        mostrarError(error, textos.errorCarga);
      }

      return null;
    } finally {
      if (!signal?.aborted) {
        setCargandoLista(false);
      }
    }
  }, [
    filtros.archivados,
    filtros.buscar,
    filtros.fecha,
    filtros.horario,
    filtros.ordenar,
    filtros.pendientes_pago,
    listarPedidos,
    textos.errorCarga,
  ]);

  useEffect(() => {
    const controller = new AbortController();

    cargarPedidos(controller.signal);

    return () => {
      controller.abort();
    };
  }, [cargarPedidos]);

  function actualizarFiltro(clave, valor) {
    setFiltros((previos) => ({
      ...previos,
      [clave]: valor,
    }));
  }

  async function imprimirPedido(id) {
    if (!id) {
      return;
    }

    try {
      mostrarCargandoPdf();
      const blob = await obtenerPdf(id);
      cerrarAlerta();
      abrirPdfEnNuevaVentana(blob);
    } catch (error) {
      cerrarAlerta();
      mostrarError(error, textos.errorPdf);
      throw error;
    }
  }

  async function archivarPedidoSeleccionado(id) {
    setProcesando(true);

    try {
      await archivarPedido(id);
      mostrarExito(textos.exitoArchivar);
      await cargarPedidos();
    } catch (error) {
      mostrarError(error, textos.errorArchivar);
    } finally {
      setProcesando(false);
    }
  }

  async function restaurarPedidoSeleccionado(id) {
    setProcesando(true);

    try {
      await restaurarPedido(id);
      mostrarExito(textos.exitoRestaurar);
      await cargarPedidos();
    } catch (error) {
      mostrarError(error, textos.errorRestaurar);
    } finally {
      setProcesando(false);
    }
  }

  return {
    filtros,
    meta,
    pedidos,
    cargandoLista,
    procesando,
    actualizarFiltro,
    imprimirPedido,
    archivarPedido: archivarPedidoSeleccionado,
    restaurarPedido: restaurarPedidoSeleccionado,
  };
}
