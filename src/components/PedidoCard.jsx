import React from "react";
import "@/styles/PedidoCard.css";


function ReservaContent({reserva}) {
  return(
    <>
    <p>Producto: {reserva.producto}</p>

    <p>Cliente: {reserva.cliente}</p>

    <p>
      Teléfono cliente:{" "}
      <a href={`tel:${reserva.telf_cliente}`}>
        {reserva.telf_cliente}
      </a>
    </p>

    </>
  )
}

function EntregaContent({entrega}) {
  const direccionQuery = encodeURIComponent(
    `${entrega.direccion}, ${entrega.codigo_postal}`
  );
  return(
    <>
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

    </>
  )
}


function PedidoCard({ 
  pedido, 
  tipo, 
  handleEditar, 
  handleArchivar, 
  handleMostrarPdf, 
  handleMasInfo, 
  handleRestaurar,
  mostrarArchivadas,
}) 
{
  const fecha = new Date(pedido.fecha_entrega);
  const fechaFormateada = new Intl.DateTimeFormat("es-ES").format(fecha);
  const pedidoClass = pedido.observaciones ? "pedido con_observaciones" : "pedido";
  const reservaPagada = pedido.estado_pago === "PENDIENTE" ? "PENDIENTE" : "";

  return (
    <div className={pedidoClass}>
      <div className="pedido__header">
        <strong>{pedido.id}</strong>
        <strong>{reservaPagada}</strong>
        <strong>{pedido.horario}</strong>
        <strong>{fechaFormateada}</strong>

      </div>

      <div className="pedido__content">
        {tipo === "entregas" && <EntregaContent entrega={pedido} /> }
        {tipo === "reservas" && <ReservaContent reserva={pedido} /> }
      </div>

      <div className="pedido__actions">
        <button
          className="btn btn-info"
          onClick={() => handleMasInfo(pedido)}
          aria-label="Más información"
          type="button"
        >
          <i className="fa-solid fa-circle-info"></i>
        </button>

        {!mostrarArchivadas && (
          <button
            className="btn btn-warning"
            aria-label="Editar"
            type="button"
            onClick={() => handleEditar(pedido.id)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        )}

        <button
          className="btn btn-success"
          aria-label="Imprimir"
          type="button"
          onClick={() => handleMostrarPdf(pedido.id)}
        >
          <i className="fa-solid fa-print"></i>
        </button>

        {
          mostrarArchivadas 
          ? (
            <button
              className="btn btn-warning"
              aria-label="Restaurar"
              type="button"
              onClick={() => handleRestaurar(pedido.id)}
            >
              Restaurar
            </button>
          ) : 
          (
            <button
              className="btn btn-success"
              aria-label="Archivar"
              type="button"
              onClick={() => handleArchivar(pedido.id)}
            >
              Confirmar
            </button>
          )
        }  



      </div>
    </div>
  );
}

export default PedidoCard;
