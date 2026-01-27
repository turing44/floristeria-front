import Swal from "sweetalert2"

export function handleApiError(error) {

  // 1. Sin conexión con el backend
  if (!error || !error.response) {
    Swal.fire({
      icon: "error",
      title: "Sin conexión",
      text: "No se pudo conectar con el servidor. Compruebe su conexión."
    })

    return {
      type: "NETWORK",
      message: "No se pudo conectar con el servidor"
    }
  }

  const { status } = error.response
  const data = error.data

  // 2. Errores de validación Laravel (422)
  if (status === 422 && data?.errors) {
    const message = buildLaravelValidationMessage(data.errors)

    Swal.fire({
      icon: "warning",
      title: "Errores de validación",
      text: message
    })

    return {
      type: "VALIDATION",
      status,
      message,
      fields: data.errors
    }
  }

  // 3. Recurso no encontrado (404)
  if (status === 404) {
    const message = data?.message || "Recurso no encontrado"

    Swal.fire({
      icon: "error",
      title: "No encontrado",
      text: message
    })

    return {
      type: "NOT_FOUND",
      status,
      message
    }
  }

  // 4. Fallback silencioso
  return {
    type: "UNKNOWN",
    status,
    message: data?.message || "Error inesperado"
  }
}

function buildLaravelValidationMessage(errors) {
  return Object.values(errors)
    .flat()
    .map(msg => `• ${msg}`)
    .join('\n')
}
