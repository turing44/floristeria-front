import React, { useState } from 'react'
import "./EntregaPage.css"
import Swal from 'sweetalert2'
import { getReservaPdf } from '../api/services/imprimirApi'
import { createReserva, deleteReserva } from '../api/services/reservasApi'
import { useReservas } from '../hooks/useReservas'
import ReservasSideBar from '../components/reservas/ReservasSideBar'
import FormReserva from '../components/reservas/FormReserva'
import PedidoCard from '../components/genericos/PedidoCard'

function ReservasPage() {
    const [editId, setEditId] = useState(null)
    const [sort, setSort] = useState("fecha")
    // vista o form 
    const [modo, setModo] = useState("vista")

    const { reservas } = useReservas({ sort })



    const enviarFormulario = async (formulario) => {
        await createReserva(formulario)
        setEditId(null)
        setModo("vista")
    }

    const handleMasInfo = (reserva) => {
        Swal.fire({
            title: reserva.id,
            html: `
        <p>${reserva.precio} €</p> 
        <br />
        <p>Cliente: ${reserva.cliente}</p>
        <p>Cliente Telf: <a href="tel:${reserva.telf_cliente}">${reserva.telf_cliente}</a></p> 
        <br />
        <p>Destinatario: ${reserva.nombre_mensaje}</p>
        <p>Estado Pago: ${reserva.estado_pago}</p>
        <p>Dinero a cuenta: ${reserva.dinero_a_cuenta} €</p>
        ${reserva.texto_mensaje !== null ? "<br /><p>Mensaje: " + reserva.texto_mensaje + " </p>" : ""}
        ${reserva.observaciones !== null ? "<br /><p>Observaciones: " + reserva.observaciones + " </p>" : ""}
      `,
        });
    }

    const handleEditarReserva = (id) => {
        setEditId(id)
        setModo("form")
    }

    const handleArchivarReserva = (id) => {
        deleteReserva(id)
            .then(Swal.fire({
                icon: "success",
                title: "Reserva archivada"
            }))
            .catch(Swal.fire({
                icon: "error",
                title: "Error al archivar la reserva"
            }))
    }

    const handleImprimir = async (id) => {
        const pdfBlob = await getReservaPdf(id)
        const url = URL.createObjectURL(pdfBlob)
        window.open(url)
        window.print()
    }

    if (modo === "form") {
        return (
            <FormReserva
                modo={modo}
                editId={editId}
                onSubmit={enviarFormulario}
            />
        )
    }

    return (

        <div id='entregas-page'>

            <ReservasSideBar
                setModo={setModo}
            />

            <div id='entregas-grid'>
                {reservas.map(reserva => (
                    <PedidoCard
                        key={reserva.id}
                        pedido={reserva}
                        handleEditar={handleEditarReserva}
                        handleArchivar={handleArchivarReserva}
                        handleImprimir={handleImprimir}
                        handleMasInfo={handleMasInfo}
                    />
                ))}
            </div>
        </div>
    )
}

export default ReservasPage
