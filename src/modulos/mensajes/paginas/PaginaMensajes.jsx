import { useState } from "react";
import "@/styles/CrearMensajePage.css";
import { generarPdfMensaje } from "@/modulos/mensajes/api/mensajesApi";
import {
  cerrarAlerta,
  mostrarCargandoPdf,
  mostrarError,
} from "@/modulos/compartido/utilidades/alertas";
import { abrirPdfEnNuevaVentana } from "@/modulos/compartido/utilidades/pdf";

const MAX_CHARS_NOMBRE = 30;
const MAX_CHARS_MENSAJE = 840;

export default function PaginaMensajes() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      mostrarCargandoPdf();
      const blob = await generarPdfMensaje({
        nombre_mensaje: nombre,
        texto_mensaje: mensaje,
      });
      cerrarAlerta();
      abrirPdfEnNuevaVentana(blob);
    } catch (error) {
      cerrarAlerta();
      mostrarError(error, "No se pudo generar el mensaje");
    }
  }

  return (
    <form onSubmit={handleSubmit} id="crear-mensaje-form">
      <h1>Crear mensaje</h1>

      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          required
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          maxLength={MAX_CHARS_NOMBRE}
        />

        <div className="char-counter">
          <strong>
            {nombre.length} / {MAX_CHARS_NOMBRE}
          </strong>
        </div>
      </div>

      <div className="form-group">
        <label>Mensaje</label>

        <textarea
          value={mensaje}
          onChange={(event) => setMensaje(event.target.value)}
          maxLength={MAX_CHARS_MENSAJE}
          rows={5}
        />

        <div className="char-counter">
          <strong>
            {mensaje.length} / {MAX_CHARS_MENSAJE}
          </strong>
        </div>
      </div>

      <button type="submit">Imprimir</button>
    </form>
  );
}
