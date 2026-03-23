import { useCallback, useEffect, useMemo, useState } from "react";
import {
  cerrarAlerta,
  mostrarCargandoPdf,
  mostrarError,
  mostrarExito,
} from "@/modulos/compartido/utilidades/alertas";
import { obtenerFechaHoy } from "@/modulos/compartido/utilidades/formato";
import { abrirPdfEnNuevaVentana } from "@/modulos/compartido/utilidades/pdf";

const FILTROS_BASE = {
  archivados: false,
  ordenar: "fecha_desc",
  buscar: "",
  fecha: "",
  horario: "",
  pendientes_pago: false,
  solo_observaciones: false,
};

export function usePaginaPedidosEscritorio({
  listarPedidos,
  crearPedido,
  actualizarPedido,
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
  const [modoPanel, setModoPanel] = useState("detalle");
  const [idSeleccionado, setIdSeleccionado] = useState(null);

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

  const pedidosVisibles = useMemo(() => {
    if (!filtros.solo_observaciones) {
      return pedidos;
    }

    return pedidos.filter((pedido) => Boolean(pedido.observaciones));
  }, [pedidos, filtros.solo_observaciones]);

  const seleccionado = useMemo(
    () => pedidos.find((pedido) => pedido.id === idSeleccionado) ?? null,
    [pedidos, idSeleccionado]
  );

  useEffect(() => {
    if (modoPanel === "crear") {
      return;
    }

    if (pedidosVisibles.length === 0) {
      setIdSeleccionado(null);

      if (modoPanel === "editar") {
        setModoPanel("detalle");
      }

      return;
    }

    const existeSeleccionado = pedidosVisibles.some((pedido) => pedido.id === idSeleccionado);

    if (!existeSeleccionado) {
      setIdSeleccionado(pedidosVisibles[0].id);

      if (modoPanel === "editar") {
        setModoPanel("detalle");
      }
    }
  }, [pedidosVisibles, idSeleccionado, modoPanel]);

  function actualizarFiltro(clave, valor) {
    setFiltros((previos) => ({
      ...previos,
      [clave]: valor,
    }));
  }

  function alternarArchivados() {
    setFiltros((previos) => ({
      ...previos,
      archivados: !previos.archivados,
    }));
  }

  function alternarSoloObservaciones() {
    setFiltros((previos) => ({
      ...previos,
      solo_observaciones: !previos.solo_observaciones,
    }));
  }

  function alternarFiltroHoy() {
    const hoy = obtenerFechaHoy();

    setFiltros((previos) => ({
      ...previos,
      fecha: previos.fecha === hoy ? "" : hoy,
    }));
  }

  function seleccionarPedido(id) {
    setIdSeleccionado(id);

    if (modoPanel !== "editar") {
      setModoPanel("detalle");
    }
  }

  function abrirCrear() {
    setModoPanel("crear");
  }

  function abrirEditar(id) {
    setIdSeleccionado(id);
    setModoPanel("editar");
  }

  function cerrarPanel() {
    setModoPanel("detalle");

    if (!idSeleccionado && pedidosVisibles[0]) {
      setIdSeleccionado(pedidosVisibles[0].id);
    }
  }

  async function imprimirPedido(id = idSeleccionado) {
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

  async function guardarPedido(valores, { imprimir = false } = {}) {
    setProcesando(true);

    try {
      const respuesta =
        modoPanel === "editar" && idSeleccionado
          ? await actualizarPedido(idSeleccionado, valores)
          : await crearPedido(valores);

      const pedidoGuardado = respuesta.data;

      setModoPanel("detalle");
      setIdSeleccionado(pedidoGuardado?.id ?? null);
      await cargarPedidos();

      if (imprimir && pedidoGuardado?.id) {
        await imprimirPedido(pedidoGuardado.id);
      }

      return pedidoGuardado;
    } finally {
      setProcesando(false);
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
    pedidos: pedidosVisibles,
    seleccionado,
    cargandoLista,
    procesando,
    modoPanel,
    actualizarFiltro,
    alternarArchivados,
    alternarSoloObservaciones,
    alternarFiltroHoy,
    seleccionarPedido,
    abrirCrear,
    abrirEditar,
    cerrarPanel,
    imprimirPedido,
    guardarPedido,
    archivarPedido: archivarPedidoSeleccionado,
    restaurarPedido: restaurarPedidoSeleccionado,
  };
}
