import React from "react";
import "@/styles/PedidoCard.css";
import Swal from "sweetalert2";

function handleReservaMasInfo(reserva) {
  Swal.fire({
        title: reserva.id,
        html: `
        <p>${((reserva.precio / 100) * 100).toFixed(2)} €</p>
        <br />
        <p>Cliente: ${reserva.cliente} <a href="tel:${reserva.telf_cliente}">${reserva.telf_cliente}</a></p>
        ${reserva.observaciones !== "" ? "<br /><p>Observaciones: " + reserva.observaciones + " </p>" : ""}

        
        `,
    });

}

function handleEntregaMasInfo(entrega) {
  Swal.fire({
    title: entrega.id,
    html: `
        <p>${((entrega.precio / 100) * 100).toFixed(2)} €</p> 
        <br />
        <p>Cliente: ${entrega.cliente}  <a href="tel:${entrega.telf_cliente}">${entrega.telf_cliente}</a></p>
      
        <br />
        <p>Destinatario: ${entrega.destinatario} <a href="tel:${entrega.telf_destinatario}">${entrega.telf_destinatario}</a></p>
        ${entrega.observaciones !== null ? "<br /><p>Observaciones: " + entrega.observaciones + " </p>" : ""}
        ${entrega.mensaje !== null ? "<br /><p>Mensaje: " + entrega.mensaje + " </p>" : ""}
      `,
    });
}


function ReservaContent({reserva}) {
  return(
    <>
    <p>Producto: {reserva.producto}</p>

    <p>
      Cliente: {reserva.cliente} 
      <a href={`tel:${reserva.telf_cliente}`}> {reserva.telf_cliente}</a>
    </p>

    {reserva.hora_recogida === "" ? "" 
    : <p>Hora Recogida: {reserva.hora_recogida}h</p>
    }

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

    <p>Destinatario: {entrega.destinatario} {" "} <a href={`tel:${entrega.telf_destinatario}`}>
        {entrega.telf_destinatario}
      </a></p>

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
  handleRestaurar,
  mostrarArchivadas,
}) 
{
  const fecha = new Date(pedido.fecha_entrega);
  const fechaFormateada = new Intl.DateTimeFormat("es-ES").format(fecha);
  const pedidoClass = pedido.observaciones ? "pedido con_observaciones" : "pedido";

  const estadoPago = pedido?.dinero_pendiente > 0 ? "Pediente: " + (((pedido?.precio - pedido?.dinero_pendiente) / 100 )* 100).toFixed(2) : "PAGADO"

  return (
    <div className={pedidoClass}>
      <div className="pedido__header">
        <strong>{pedido.id}</strong>        
        {tipo === "entregas" 
        ? <strong>{pedido.horario}</strong> 
        : estadoPago === "PAGADO" 
          ? <strong>{estadoPago}</strong>
          : <strong style={{color: "red"}} >{estadoPago} €</strong>
        }
        
        
        <strong>{fechaFormateada}</strong>

      </div>

      <div className="pedido__content">
        {tipo === "entregas" && <EntregaContent entrega={pedido} /> }
        {tipo === "reservas" && <ReservaContent reserva={pedido} /> }
      </div>

      <div className="pedido__actions">
        <button
          className="btn btn-info"
          onClick={() => {
            tipo === "entregas"
              ? handleEntregaMasInfo(pedido)
              : handleReservaMasInfo(pedido);
          }}
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
