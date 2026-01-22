import React, { useState } from 'react'
import "./EntregaPage.css"
import Swal from 'sweetalert2'
import { getReservaPdf } from '../api/services/imprimirApi'
import { createReserva, deleteReserva } from '../api/services/reservasApi'
import { useReservas } from '../hooks/useReservas'
import ReservasSideBar from '../components/reservas/ReservasSideBar'
import ReservaCard from '../components/reservas/ReservasCard'
import FormReserva from '../components/reservas/FormReserva'

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
            const pdfBlob = await getPdf(id)
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
                    <ReservaCard
                        key={reserva.id}
                        reserva={reserva}
                        setModo={setModo}
                        handleEditar={handleEditarReserva}
                        handleArchivar={handleArchivarReserva}
                        handleImprimir={handleImprimir}
                    />
                ))}
            </div>
        </div>
    )
}

export default ReservasPage
