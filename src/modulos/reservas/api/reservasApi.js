import {
  deleteJson,
  getBlob,
  getJson,
  postJson,
  putJson,
} from "@/modulos/compartido/api/clienteApi";

export async function listarReservas(orden = "fecha_desc") {
  const respuesta = await getJson(`/reservas?${new URLSearchParams({ ordenar: orden })}`);
  return respuesta.data;
}

export async function listarReservasArchivadas() {
  const respuesta = await getJson("/reservas/archivadas");
  return respuesta.data;
}

export async function obtenerReserva(id) {
  const respuesta = await getJson(`/reservas/${id}`);
  return respuesta.data;
}

export async function crearReserva(datos) {
  const respuesta = await postJson("/reservas", datos);
  return respuesta.data;
}

export async function actualizarReserva(id, datos) {
  const respuesta = await putJson(`/reservas/${id}`, datos);
  return respuesta.data;
}

export function archivarReserva(id) {
  return deleteJson(`/reservas/${id}`);
}

export async function restaurarReserva(id) {
  const respuesta = await postJson(`/reservas/restaurar/${id}`);
  return respuesta.data;
}

export function obtenerPdfReserva(id) {
  return getBlob(`/reservas/pdf/${id}`);
}
