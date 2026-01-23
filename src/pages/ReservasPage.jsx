import React, { useState } from 'react'
import "./EntregaPage.css"
import Swal from 'sweetalert2'
import { getReservaPdf } from '../api/services/imprimirApi'
import { createReserva, deleteReserva, updateReserva } from '../api/services/reservasApi'
import { useReservas } from '../hooks/useReservas'
import FormReserva from '../components/reservas/FormReserva'
import MainPage from '../components/genericos/MainPage'

function ReservasPage() {
    const handleMasInfo = (reserva) => {
        Swal.fire({
            title: reserva.id,
            html: `
        <p>${reserva.precio} €</p> 
        <br />
        <p>Cliente: ${reserva.cliente}</p>
        <p>Cliente Telf: <a href="tel:${reserva.telf_cliente}">${reserva.telf_cliente}</a></p> 
        <br />
        <p>Destinatario: ${reserva.destinatario}</p>
        <p>Estado Pago: ${reserva.estado_pago}</p>
        <p>Dinero a cuenta: ${reserva.dinero_dejado_a_cuenta} €</p>
        ${reserva.mensaje !== null ? "<br /><p>Mensaje: " + reserva.mensaje + " </p>" : ""}
        ${reserva.observaciones !== null ? "<br /><p>Observaciones: " + reserva.observaciones + " </p>" : ""}
      `,
        });
    }

    return (
        <MainPage
            useHook={useReservas}
            create={createReserva}
            update={updateReserva}
            getPdf={getReservaPdf}
            FormComponent={FormReserva}
            handleMasInfo={handleMasInfo}
            tipo="reservas"
            />
    )
}

export default ReservasPage
