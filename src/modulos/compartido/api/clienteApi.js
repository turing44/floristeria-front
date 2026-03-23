const URL_API = import.meta.env.VITE_API_URL;

function construirUrl(path, query) {
  const params = new URLSearchParams();

  Object.entries(query ?? {}).forEach(([clave, valor]) => {
    if (valor === undefined || valor === null || valor === "" || valor === false) {
      return;
    }

    params.append(clave, String(valor));
  });

  const queryString = params.toString();
  const separador = queryString ? (path.includes("?") ? "&" : "?") : "";

  return `${URL_API}${path}${separador}${queryString}`;
}

async function construirError(response) {
  const contentType = response.headers.get("content-type") || "";
  let data = null;
  let message = `Error ${response.status}`;

  if (contentType.includes("application/json")) {
    data = await response.json().catch(() => null);
    message =
      data?.message ||
      data?.error ||
      extraerMensajeValidacion(data?.errors) ||
      message;
  } else {
    const texto = await response.text().catch(() => "");
    message = texto || message;
  }

  return {
    status: response.status,
    message,
    fields: data?.errors ?? null,
    data,
  };
}

function extraerMensajeValidacion(errors) {
  if (!errors) {
    return null;
  }

  return Object.values(errors)
    .flat()
    .join("\n");
}

async function request(
  path,
  { method = "GET", body, query, responseType = "json", signal } = {}
) {
  const headers = {
    Accept: responseType === "blob" ? "application/pdf" : "application/json",
  };

  const init = { method, headers, signal };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const response = await fetch(construirUrl(path, query), init);

  if (!response.ok) {
    throw await construirError(response);
  }

  if (response.status === 204) {
    return null;
  }

  if (responseType === "blob") {
    return response.blob();
  }

  return response.json();
}

export function normalizarEnvelope(respuesta) {
  if (
    respuesta &&
    typeof respuesta === "object" &&
    ("data" in respuesta || "meta" in respuesta)
  ) {
    return {
      data: respuesta.data ?? null,
      meta: respuesta.meta ?? null,
    };
  }

  return {
    data: respuesta ?? null,
    meta: null,
  };
}

export function getJson(path, options = {}) {
  return request(path, options);
}

export function postJson(path, body, options = {}) {
  return request(path, { ...options, method: "POST", body });
}

export function putJson(path, body, options = {}) {
  return request(path, { ...options, method: "PUT", body });
}

export function deleteJson(path, options = {}) {
  return request(path, { ...options, method: "DELETE" });
}

export function getBlob(path, options = {}) {
  return request(path, { ...options, responseType: "blob" });
}

export function postBlob(path, body, options = {}) {
  return request(path, { ...options, method: "POST", body, responseType: "blob" });
}
