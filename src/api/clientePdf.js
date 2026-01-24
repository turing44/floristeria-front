import Swal from "sweetalert2";

const BASE_URL = "http://localhost:8000/api";

export function pdfGET(path) {
    const token = localStorage.getItem("token");

    const headers = {
        "Accept": "application/pdf",
    };
    if (token) headers["Authorization"] = "Bearer " + token;

    Swal.fire({
        title: 'Cargando',
        text: 'Espera un momento...',
        icon: 'success',
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false
    });

    return fetch(`${BASE_URL}${path}`, {
        method: "GET",
        headers: headers,
    }).then(response => {
        Swal.close()
        return response
    })

}

export async function pdfPOST(path, body) {
    const token = localStorage.getItem("token");

    const headers = {
        "Accept": "application/pdf",
        "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = "Bearer " + token;


    return fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
    });

}