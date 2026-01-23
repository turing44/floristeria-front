import React, { useEffect, useState } from 'react'
import { useEntregas } from '../hooks/useEntregas'
import "./EntregaPage.css"
import FormEntrega, { defaultEntrega } from '../components/entregas/FormEntrega'
import { createEntrega, deleteEntrega, getEntrega, updateEntrega } from '../api/services/entregasApi'
import EntregasSidebar from '../components/entregas/EntregasSidebar'
import Swal from 'sweetalert2'
import { getEntregaPdf } from '../api/services/imprimirApi'
import PedidoCard from '../components/genericos/PedidoCard'

function EntregasPage() {

    const [sort, setSort] = useState("fecha_desc")
    const [editId, setEditId] = useState(null)
    
    // vista o form 
    const [modo, setModo] = useState("vista")

    const { entregas, remove, refetch } = useEntregas({ sort })
    console.log(entregas);
    const enviarFormulario = async (formulario) => {

        try {
            if (editId !== null) {
                await updateEntrega(editId, formulario)
            } else {
                await createEntrega(formulario)
            }

            setEditId(null)
            setModo("vista")
            refetch()
            

        } catch (error) {   
            console.log("Error al enviar el formulario:", error)
        }


        
    }

    const handleEditarEntrega = (id) => {
        setEditId(id)
        setModo("form")
    }

    const handleArchivarEntrega = async (id) => {
        try {
            remove(id)
            Swal.fire({
                icon: "success",
                title: "Entrega archivada",
            })

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al archivar la entrega",
                text: error.message,
            })
        }
    }

    const handleImprimir = async (id) => {
        try {
            const blob = await getEntregaPdf(id)
            const url = URL.createObjectURL(blob)
            window.open(url)
        } catch (error) {
            console.log(error);
            
        }

    }

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

    if (modo === "form" || modo === "crear") {
        return (
            <FormEntrega 
                modo={modo}
                editId={editId}
                onSubmit={enviarFormulario}
            />
        )
    }

    return (

        <div id='entregas-page'>
            
            <EntregasSidebar
                sort={sort}
                setSort={setSort}
                setModo={setModo}
            />

            <div id='entregas-grid'>
                {entregas.map(entrega => (
                    <PedidoCard
                        key={entrega.id}
                        pedido={entrega}
                        handleEditar={handleEditarEntrega}
                        handleArchivar={handleArchivarEntrega}
                        handleImprimir={handleImprimir}
                        handleMasInfo={handleMasInfo}
                    />
                ))}
            </div>
        </div>
    )
}

export default EntregasPage
