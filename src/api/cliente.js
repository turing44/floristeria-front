const URL_API = "http://localhost:8000/api"

async function request(path, {method = "GET", body} = {}) {

    const token = localStorage.getItem("token")

    const headers = {"Accept": "application/json"}

    if (body !== undefined) headers["Content-Type"] = "application/json"
    if (token) headers["Authorization"] = "Bearer " + token

    const response = await fetch(`${URL_API}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,

    })

    console.log(response);
    

    if (!response.ok) {
        const error = new Error("HTTP_ERROR");
        error.status = response.status;
        error.errors = response.errors;
        throw error;
    }

    if (response.status === 204) return null  


    return response.json()
    
}


export const httpGet = (path) => request(path)
export const httpPost = (path, body) => request(path, {method: "POST", body})
export const httpPut = (path, body) => request(path, {method: "PUT", body})
export const httpDelete = (path) => request(path, {method: "DELETE"})