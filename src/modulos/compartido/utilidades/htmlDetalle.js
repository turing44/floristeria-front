export function escaparHtml(valor) {
  if (valor === null || valor === undefined) {
    return "";
  }

  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function bloque(filas) {
  const contenido = filas
    .filter((fila) => fila && fila.valor !== "" && fila.valor !== null && fila.valor !== undefined)
    .map((fila) => {
      const valor = fila.html ? fila.valor : escaparHtml(fila.valor);
      return `<p><strong>${escaparHtml(fila.etiqueta)}:</strong> ${valor}</p>`;
    })
    .join("");

  return `<div class="swal-detalle__bloque">${contenido}</div>`;
}

export function cabecera({ eyebrow, titulo, badge }) {
  return `
    <div class="swal-detalle__cabecera">
      <div>
        <p class="swal-detalle__eyebrow">${escaparHtml(eyebrow)}</p>
        <h2>${escaparHtml(titulo)}</h2>
      </div>
      ${badge ? `<span class="swal-detalle__badge">${escaparHtml(badge)}</span>` : ""}
    </div>
  `;
}
