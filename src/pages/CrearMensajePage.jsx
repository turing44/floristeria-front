import React, { useState } from "react";
import "@/styles/CrearMensajePage.css";
import { obtenerMensajePdf } from "../api/services/mensajeApi";

function CrearMensajePage() {
  const MAX_CHARS_NOMBRE = 30;
  const MAX_CHARS_MENSAJE = 400;

  const [nombre, setNombre] = useState("")
  const [mensaje, setMensaje] = useState("");

  const handleNombreInput = (e) => {
    setNombre(e.target.value)


  }

  const handleTextareaInput = (e) => {
    setMensaje(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const blob = await obtenerMensajePdf(nombre, mensaje)
    const url = URL.createObjectURL(blob)
    window.open(url);
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
          onChange={(e) => { setNombre(e.target.value) }} 
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
          onInput={handleTextareaInput}
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

export default CrearMensajePage;
