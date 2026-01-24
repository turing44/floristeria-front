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
    const handleMasInfo = (entrega) => {
        Swal.fire({
            title: entrega.id,
            html: `
                <p>${entrega.precio} €</p> 
                <br />
                <p>Cliente: ${entrega.cliente}</p>
                <p>Cliente Telf: <a href="tel:${entrega.telf_cliente}">${entrega.telf_cliente}</a></p> 
                <br />
                <p>Destinatario: ${entrega.destinatario}</p>
                <p>Destinatario Telf: <a href="tel:${entrega.telf_destinatario}">${entrega.telf_destinatario}</a></p>  
                ${entrega.mensaje !== null ? "<br /><p>Mensaje: " + entrega.mensaje + " </p>" : ""}
                ${entrega.observaciones !== null ? "<br /><p>Observaciones: " + entrega.observaciones + " </p>" : ""}
              `,
        });
    }

    return (
        <MainPage
            useHook={useEntregas}
            useHookArchivadas={useEntregasArchivadas}
            create={createEntrega}
            update={updateEntrega}
            getPdf={getEntregaPdf}
            FormComponent={FormEntrega}
            handleMasInfo={handleMasInfo}
            tipo="entregas"
        />
    )
}

export default EntregasPage
