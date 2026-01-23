
import { pdfPOST } from "../clientePdf";


export async function obtenerMensajePdf(nombre, mensaje) {
    const data = { nombre_mensaje: nombre, texto_mensaje: mensaje };

    console.log(data);

    const response = await pdfPOST("/mensaje/pdf", data);

    if (!response.ok) {
        throw new Error("Error generando PDF");
    }

    return await response.blob();
}