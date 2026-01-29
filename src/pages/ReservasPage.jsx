import React, { useState } from 'react'
import "@/styles/EntregaPage.css"
import Swal from 'sweetalert2'
import { getReservaPdf } from '../api/services/imprimirApi'
import { createReserva, deleteReserva, updateReserva } from '../api/services/reservasApi'
import { useReservas } from '../hooks/useReservas'
import FormReserva from '../components/FormReserva'
import MainPage from '../components/MainPage'
import { useReservasArchivadas } from '../hooks/useReservasArchivadas'

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
        <p>Dinero Pendiente: ${reserva.dinero_pendiente} €</p>
        ${reserva.mensaje !== null ? "<br /><p>Mensaje: " + reserva.mensaje + " </p>" : ""}
        ${reserva.observaciones !== null ? "<br /><p>Observaciones: " + reserva.observaciones + " </p>" : ""}
      `,
        });
    }

    return (
        <MainPage
            useHook={useReservas}
            useHookArchivadas={useReservasArchivadas}
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
