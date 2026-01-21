import React, { useState } from 'react'
import "./EntregaPage.css"
import Swal from 'sweetalert2'
import { getPdf } from '../api/services/imprimirApi'
import { createReserva, deleteReserva } from '../api/services/reservasApi'
import { useReservas } from '../hooks/useReservas'
import ReservasSideBar from '../components/reservas/ReservasSideBar'
import ReservaCard from '../components/reservas/ReservasCard'
import FormReserva from '../components/reservas/FormReserva'

function ReservasPage() {
    const [editId, setEditId] = useState(null)
    const [sort, setSort] = useState("fecha")
    const [dir, setDir] = useState("desc")
    // vista o form 
    const [modo, setModo] = useState("vista")

    //const { reservas } = useReservas({ sort, dir })

    const reservas = [
    {
        id: 101,
        fuente: "web",
        producto: "Tarta de chocolate",
        precio: 45.00,
        fecha_entrega: "2026-02-14",
        cliente: "María González",
        telf_cliente: "612345678",
        horario: "16:00 - 18:00",
        observaciones: "Sin frutos secos",
        nombre_mensaje: "María",
        texto_mensaje: "Feliz cumpleaños ❤️",
        dinero_a_cuenta: 45.00,
        estado_pago: "pagado"
    },
    {
        id: 102,
        fuente: null,
        producto: "Ramo de rosas rojas",
        precio: 30.00,
        fecha_entrega: "2026-01-25",
        cliente: "Carlos Pérez",
        telf_cliente: "698112233",
        horario: "10:00 - 12:00",
        observaciones: null,
        nombre_mensaje: null,
        texto_mensaje: null,
        dinero_a_cuenta: 0,
        estado_pago: "pendiente"
    }
];

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
