import { postBlob } from "@/modulos/compartido/api/clienteApi";

export function generarPdfMensaje(datos) {
  return postBlob("/mensaje/pdf", datos);
}
