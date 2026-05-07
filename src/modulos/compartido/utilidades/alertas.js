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

export function mostrarDetallePedido({ html, acciones = [] }) {
  const accionesHtml = acciones
    .map(
      ({ id, texto, tono = "secundario" }) =>
        `<button type="button" class="swal-detalle-boton swal-detalle-boton--${tono}" data-accion="${id}">${texto}</button>`
    )
    .join("");

  Swal.fire({
    html: `
      <div class="swal-detalle">${html}</div>
      ${accionesHtml ? `<div class="swal-detalle-acciones">${accionesHtml}</div>` : ""}
    `,
    width: 640,
    showConfirmButton: false,
    showCloseButton: true,
    customClass: { popup: "swal-detalle-popup" },
    didOpen: (popup) => {
      acciones.forEach(({ id, onClick }) => {
        const boton = popup.querySelector(`button[data-accion="${id}"]`);
        if (boton) {
          boton.addEventListener("click", () => {
            Swal.close();
            onClick?.();
          });
        }
      });
    },
  });
}
