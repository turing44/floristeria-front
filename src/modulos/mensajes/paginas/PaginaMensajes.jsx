import { useState } from "react";
import "./PaginaMensajes.css";
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
        nombre_destinatario: nombre,
        mensaje_tarjeta: mensaje,
      });
      cerrarAlerta();
      abrirPdfEnNuevaVentana(blob);
    } catch (error) {
      cerrarAlerta();
      mostrarError(error, "No se pudo generar el mensaje");
    }
  }

  return (
    <div className="pagina-mensajes">
      <form onSubmit={handleSubmit} className="pagina-mensajes__form">
        <div className="pagina-mensajes__cabecera">
          <p className="pagina-mensajes__eyebrow">Mensajes</p>
          <h1>Crear mensaje</h1>
        </div>

        <div className="pagina-mensajes__grupo">
          <label htmlFor="mensaje-nombre">Nombre del destinatario</label>
          <input
            id="mensaje-nombre"
            type="text"
            required
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            maxLength={MAX_CHARS_NOMBRE}
          />
          <div className="pagina-mensajes__contador">
            {nombre.length} / {MAX_CHARS_NOMBRE}
          </div>
        </div>

        <div className="pagina-mensajes__grupo">
          <label htmlFor="mensaje-texto">Mensaje</label>
          <textarea
            id="mensaje-texto"
            value={mensaje}
            onChange={(event) => setMensaje(event.target.value)}
            maxLength={MAX_CHARS_MENSAJE}
            rows={6}
          />
          <div className="pagina-mensajes__contador">
            {mensaje.length} / {MAX_CHARS_MENSAJE}
          </div>
        </div>

        <div className="pagina-mensajes__acciones">
          <button type="submit" className="boton-principal">
            Imprimir
          </button>
        </div>
      </form>
    </div>
  );
}
