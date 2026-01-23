import React from "react";


function PedidoCard({ pedido, handleEditar, handleArchivar, handleImprimir, handleMasInfo }) {
  const fecha = new Date(pedido.fecha_entrega);
  const fechaFormateada = new Intl.DateTimeFormat("es-ES").format(fecha);

  return (
    <div className="entrega">      
      <div className="entrega__header">
        <strong>{pedido.id}</strong>
        <strong>{pedido.horario}</strong>
        <strong>{fechaFormateada}</strong>
      </div>

      <div className="entrega__content">
        <p>Producto: {pedido.producto}</p>

        <p>Cliente: {pedido.cliente}</p>

        <p>
          Teléfono cliente:{" "}
          <a href={`tel:${pedido.telf_cliente}`}>
            {pedido.telf_cliente}
          </a>
        </p>
      </div>

      <div className="entrega__actions">
        <button
          className="btn btn-info"
          onClick={() => handleMasInfo(pedido)}
          aria-label="Más información"
          type="button"
        >
          <i className="fa-solid fa-circle-info"></i>
        </button>

        <button
          className="btn btn-warning"
          aria-label="Editar"
          type="button"
          onClick={() => handleEditar(pedido.id)}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        <button
          className="btn btn-success"
          aria-label="Imprimir"
          type="button"
          onClick={() => handleImprimir(pedido.id)}
        >
          <i className="fa-solid fa-print"></i>
        </button>
        
        <button
          className="btn btn-success"
          aria-label="Archivar"
          type="button"
          onClick={() => handleArchivar(pedido.id)}
        >
          Confirmar
        </button>


      </div>
    </div>
  );
}

export default PedidoCard;
