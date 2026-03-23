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

export async function listarEntregas(filtros = {}, opciones = {}) {
  return normalizarLista(
    await getJson("/entregas", {
      query: filtros,
      signal: opciones.signal,
    })
  );
}

export function listarEntregasArchivadas(filtros = {}, opciones = {}) {
  return listarEntregas({ ...filtros, archivados: true }, opciones);
}

export async function obtenerEntrega(id, opciones = {}) {
  return normalizarEnvelope(
    await getJson(`/entregas/${id}`, {
      signal: opciones.signal,
    })
  );
}

export async function crearEntrega(datos, opciones = {}) {
  return normalizarEnvelope(await postJson("/entregas", datos, opciones));
}

export async function actualizarEntrega(id, datos, opciones = {}) {
  return normalizarEnvelope(await putJson(`/entregas/${id}`, datos, opciones));
}

export async function archivarEntrega(id, opciones = {}) {
  return normalizarEnvelope(await deleteJson(`/entregas/${id}`, opciones));
}

export async function restaurarEntrega(id, opciones = {}) {
  return normalizarEnvelope(await postJson(`/entregas/restaurar/${id}`, undefined, opciones));
}

export function obtenerPdfEntrega(id, opciones = {}) {
  return getBlob(`/entregas/pdf/${id}`, opciones);
}
