const URL_API = import.meta.env.VITE_API_URL;

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

async function request(path, { method = "GET", body, responseType = "json" } = {}) {
  const headers = {
    Accept: responseType === "blob" ? "application/pdf" : "application/json",
  };

  const init = { method, headers };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const response = await fetch(`${URL_API}${path}`, init);

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

export function getJson(path) {
  return request(path);
}

export function postJson(path, body) {
  return request(path, { method: "POST", body });
}

export function putJson(path, body) {
  return request(path, { method: "PUT", body });
}

export function deleteJson(path) {
  return request(path, { method: "DELETE" });
}

export function getBlob(path) {
  return request(path, { responseType: "blob" });
}

export function postBlob(path, body) {
  return request(path, { method: "POST", body, responseType: "blob" });
}
