export function formatearFecha(fecha) {
  const fechaReal = new Date(fecha);

  if (Number.isNaN(fechaReal.getTime())) {
    return fecha ?? "";
  }

  return new Intl.DateTimeFormat("es-ES").format(fechaReal);
}

export function formatearMoneda(valor) {
  const numero = Number(valor ?? 0);

  return `${numero.toFixed(2)} €`;
}

export function obtenerFechaHoy() {
  return new Date().toISOString().slice(0, 10);
}
