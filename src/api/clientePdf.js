const BASE_URL = "http://localhost:8000/api";

export function pdfGET(path) {
    const token = localStorage.getItem("token");
    
    const headers = {
        "Accept": "application/pdf",
    };  
    if (token) headers["Authorization"] = "Bearer " + token;
    
    return fetch(`${BASE_URL}${path}`, {
        method: "GET",
        headers: headers,
    });

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