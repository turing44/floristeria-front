import {
  deleteJson,
  getBlob,
  getJson,
  normalizarEnvelope,
  postJson,
  putJson,
} from "@/modulos/compartido/api/clienteApi";

function normalizarLista(respuesta) {
  const envelope = normalizarEnvelope(respuesta);

  return {
    data: envelope.data ?? [],
    meta: envelope.meta ?? {},
  };
}

export async function listarReservas(filtros = {}, opciones = {}) {
  return normalizarLista(
    await getJson("/reservas", {
      query: filtros,
      signal: opciones.signal,
    })
  );
}

export function listarReservasArchivadas(filtros = {}, opciones = {}) {
  return listarReservas({ ...filtros, archivados: true }, opciones);
}

export async function obtenerReserva(id, opciones = {}) {
  return normalizarEnvelope(
    await getJson(`/reservas/${id}`, {
      signal: opciones.signal,
    })
  );
}

export async function crearReserva(datos, opciones = {}) {
  return normalizarEnvelope(await postJson("/reservas", datos, opciones));
}

export async function actualizarReserva(id, datos, opciones = {}) {
  return normalizarEnvelope(await putJson(`/reservas/${id}`, datos, opciones));
}

export async function archivarReserva(id, opciones = {}) {
  return normalizarEnvelope(await deleteJson(`/reservas/${id}`, opciones));
}

export async function restaurarReserva(id, opciones = {}) {
  return normalizarEnvelope(await postJson(`/reservas/restaurar/${id}`, undefined, opciones));
}

export function obtenerPdfReserva(id, opciones = {}) {
  return getBlob(`/reservas/pdf/${id}`, opciones);
}
