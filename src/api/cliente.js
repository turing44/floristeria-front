import Swal from "sweetalert2"
import { handleApiError } from "./errorHandler"

const URL_API = import.meta.env.VITE_API_URL
async function request(path, accept = "application/json", { method = "GET", body } = {}) {
  const token = localStorage.getItem("token")

  const headers = { Accept: accept }

  if (body !== undefined) headers["Content-Type"] = "application/json"
  if (token) headers["Authorization"] = "Bearer " + token

  const esPDF = accept === "application/pdf"

  if (esPDF) {
    Swal.fire({
      title: "Creando PDF",
      text: "Esto debería tardar 2 segundos",
      icon: "info",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    })
  }

  const response = await fetch(`${URL_API}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw handleApiError({ response, data })
  }

  if (response.status === 204) {
    if (esPDF) Swal.close()
    return null
  }

  const result = esPDF ? response : await response.json()

  if (esPDF) Swal.close()

  return result
}


export const httpGet = (path) => request(path)
export const httpPost = (path, body) => request(path, "application/json", {method: "POST", body})
export const httpPut = (path, body) => request(path, "application/json", {method: "PUT", body})
export const httpDelete = (path) => request(path, "application/json", {method: "DELETE"})

export const pdfGet = (path) => request(path, "application/pdf")
export const pdfPost = (path, body) => request(path, "application/pdf", {method: "POST", body})