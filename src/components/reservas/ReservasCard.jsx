import React from "react";
import "./css/EntregaCard.css";
import Swal from "sweetalert2";

function ReservaCard({ reserva, handleEditar, handleArchivar, handleImprimir }) {
  const masInfo = (r) => {
    Swal.fire({
      title: r.id,
            html: `
        <p>${r.precio} €</p> 
        <br />
        <p>Cliente: ${r.cliente}</p>
        <p>Cliente Telf: <a href="tel:${r.telf_cliente}">${r.telf_cliente}</a></p> 
        <br />
        <p>Destinatario: ${r.nombre_mensaje}</p>
        <p>Estado Pago: ${r.estado_pago}</p>
        <p>Dinero a cuenta: ${r.dinero_a_cuenta} €</p>
        ${r.texto_mensaje !== null ? "<br /><p>Mensaje: " + r.texto_mensaje + " </p>" : ""}
        ${r.observaciones !== null ? "<br /><p>Observaciones: " + r.observaciones + " </p>" : ""}
      `,
    });

  };

  const fecha = new Date(reserva.fecha_entrega);
  const fechaFormateada = new Intl.DateTimeFormat("es-ES").format(fecha);

  return (
    <div className="entrega">      
      <div className="entrega__header">
        <strong>{reserva.id}</strong>
        <strong>{reserva.horario}</strong>
        <strong>{fechaFormateada}</strong>
      </div>

      <div className="entrega__content">
        <p>Producto: {reserva.producto}</p>

        <p>Cliente: {reserva.cliente}</p>

        <p>
          Teléfono cliente:{" "}
          <a href={`tel:${reserva.telf_cliente}`}>
            {reserva.telf_cliente}
          </a>
        </p>
      </div>

      <div className="entrega__actions">
        <button
          className="btn btn-info"
          onClick={() => masInfo(reserva)}
          aria-label="Más información"
          type="button"
        >
          <i className="fa-solid fa-circle-info"></i>
        </button>

        <button
          className="btn btn-warning"
          aria-label="Editar"
          type="button"
          onClick={() => handleEditar(reserva.id)}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        <button
          className="btn btn-success"
          aria-label="Imprimir"
          type="button"
          onClick={() => handleImprimir(reserva.id)}
        >
          <i className="fa-solid fa-print"></i>
        </button>
        
        <button
          className="btn btn-success"
          aria-label="Archivar"
          type="button"
          onClick={() => handleArchivar(reserva.id)}
        >
          Confirmar
        </button>


      </div>
    </div>
  );
}

export default ReservaCard;
