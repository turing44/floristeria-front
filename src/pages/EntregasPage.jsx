import React, { useEffect, useState } from 'react'
import { useEntregas } from '../hooks/useEntregas'
import "@/styles/EntregaPage.css"
import FormEntrega from '../components/FormEntrega'
import { createEntrega, getEntrega, updateEntrega } from '../api/services/entregasApi'
import Swal from 'sweetalert2'
import { getEntregaPdf } from '../api/services/imprimirApi'
import MainPage from '../components/MainPage'
import { useEntregasArchivadas } from '../hooks/useEntregasArchivadas'

function EntregasPage() {

    return (
        <MainPage
            useHook={useEntregas}
            useHookArchivadas={useEntregasArchivadas}
            create={createEntrega}
            update={updateEntrega}
            getPdf={getEntregaPdf}
            FormComponent={FormEntrega}
            tipo="entregas"
        />
    )
}

export default EntregasPage
