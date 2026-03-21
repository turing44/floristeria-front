import {
  deleteJson,
  getBlob,
  getJson,
  postJson,
  putJson,
} from "@/modulos/compartido/api/clienteApi";

export async function listarEntregas(orden = "fecha_desc") {
  const respuesta = await getJson(`/entregas?${new URLSearchParams({ ordenar: orden })}`);
  return respuesta.data;
}

export async function listarEntregasArchivadas() {
  const respuesta = await getJson("/entregas/archivadas");
  return respuesta.data;
}

export async function obtenerEntrega(id) {
  const respuesta = await getJson(`/entregas/${id}`);
  return respuesta.data;
}

export async function crearEntrega(datos) {
  const respuesta = await postJson("/entregas", datos);
  return respuesta.data;
}

export async function actualizarEntrega(id, datos) {
  const respuesta = await putJson(`/entregas/${id}`, datos);
  return respuesta.data;
}

export function archivarEntrega(id) {
  return deleteJson(`/entregas/${id}`);
}

export async function restaurarEntrega(id) {
  const respuesta = await postJson(`/entregas/restaurar/${id}`);
  return respuesta.data;
}

export function obtenerPdfEntrega(id) {
  return getBlob(`/entregas/pdf/${id}`);
}
