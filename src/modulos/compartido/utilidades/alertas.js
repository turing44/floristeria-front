import Swal from "sweetalert2";

export function mostrarError(error, titulo = "Error") {
  Swal.fire({
    icon: "error",
    title: titulo,
    text: error?.message || "Ha ocurrido un error inesperado.",
  });
}

export function mostrarExito(titulo) {
  Swal.fire({
    icon: "success",
    title: titulo,
  });
}

export function mostrarCargandoPdf() {
  Swal.fire({
    title: "Creando PDF",
    text: "Esto deberia tardar 2 segundos",
    icon: "info",
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
  });
}

export function cerrarAlerta() {
  Swal.close();
}
