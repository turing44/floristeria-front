import { getJson } from "@/modulos/compartido/api/clienteApi";

export function obtenerContratoEntrega(operacion = "crear") {
  return getJson(`/contratos/entregas?${new URLSearchParams({ operacion })}`);
}

export function obtenerContratoReserva(operacion = "crear") {
  return getJson(`/contratos/reservas?${new URLSearchParams({ operacion })}`);
}
