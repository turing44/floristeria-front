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
    
    return (
        <MainPage
            useHook={useReservas}
            useHookArchivadas={useReservasArchivadas}
            create={createReserva}
            update={updateReserva}
            getPdf={getReservaPdf}
            FormComponent={FormReserva}
            tipo="reservas"
            />
    )
}

export default ReservasPage
