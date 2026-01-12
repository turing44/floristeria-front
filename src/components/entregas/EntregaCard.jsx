import React from "react";
import "./EntregaCard.css";
import Swal from "sweetalert2";

function EntregaCard({ entrega }) {
  const masInfo = (e) => {
    Swal.fire({

      title: e.id,
      html: `
        <p>${e.precio} €</p> 
        <br />
        <p>Cliente: ${e.cliente}</p>
        <p>Cliente Telf: <a href="tel:${e.telf_cliente}">${e.telf_cliente}</a></p> 
        <br />
        <p>Destinatario: ${e.destinatario}</p>
        <p>Destinatario Telf: <a href="tel:${e.telf_destinatario}">${e.telf_destinatario}</a></p>  
        ${e.mensaje !== null ? "<br /><p>Mensaje: " + e.mensaje + " </p>" : ""}
        ${e.observaciones !== null ? "<br /><p>Observaciones: " + e.observaciones + " </p>" : ""}
      `,
    
    });

    
  };

  const direccionQuery = encodeURIComponent(
    `${entrega.direccion}, ${entrega.codigo_postal}`
  );

  return (
    <div className={`entrega ${entrega.estado === 'PENDIENTE' ? 'pendiente': 'completado'}`}>
      
      <div className="entrega__header">
        <strong>{entrega.id}</strong>
        <strong>{entrega.horario}</strong>
        <strong>{entrega.fecha_entrega}</strong>
      </div>

      <div className="entrega__content">
        <p>Producto: {entrega.producto}</p>

        <p>Destinatario: {entrega.destinatario}</p>

        <p>
          Teléfono destinatario:{" "}
          <a href={`tel:${entrega.telf_destinatario}`}>
            {entrega.telf_destinatario}
          </a>
        </p>

        <p>
          Dirección:{" "}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${direccionQuery}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {entrega.direccion}, {entrega.codigo_postal}
          </a>
        </p>

      </div>

      <div className="entrega__actions">
        <button
          className="btn btn-info"
          onClick={() => masInfo(entrega)}
          aria-label="Más información"
          type="button"
        >
          <i className="fa-solid fa-circle-info"></i>
        </button>

        <button
          className="btn btn-warning"
          aria-label="Editar"
          type="button"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        <button
          className="btn btn-success"
          aria-label="Imprimir"
          type="button"
        >
          <i className="fa-solid fa-print"></i>
        </button>
      </div>
    </div>
  );
}

export default EntregaCard;
