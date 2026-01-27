
import { pdfPost } from "../cliente";


export async function obtenerMensajePdf(nombre, mensaje) {
    const data = { nombre_mensaje: nombre, texto_mensaje: mensaje };

    console.log(data);

    const response = await pdfPost("/mensaje/pdf", data);

    if (!response.ok) {
        throw new Error("Error generando PDF");
    }

    return await response.blob();
}