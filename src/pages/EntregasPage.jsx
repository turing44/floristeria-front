import React, { useEffect, useState } from 'react'
import { useEntregas } from '../hooks/useEntregas'
import EntregaCard from './../components/entregas/EntregaCard'
import "./EntregaPage.css"
import FormEntrega, { defaultEntrega } from '../components/entregas/FormEntrega'
import { createEntrega, deleteEntrega, getEntrega, updateEntrega } from '../api/services/entregasApi'
import EntregasSidebar from '../components/entregas/EntregasSidebar'
import Swal from 'sweetalert2'
import { getEntregaPdf } from '../api/services/imprimirApi'

function EntregasPage() {

    const [sort, setSort] = useState("fecha_desc")
    const [editId, setEditId] = useState(null)
    
    // vista o form 
    const [modo, setModo] = useState("vista")

    const { entregas, remove, refetch } = useEntregas({ sort })

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

    const handleArchivarEntrega = (id) => {
        remove(id)
        .then(res => {
            Swal.fire({
            icon: "success",
            title: "Entrega archivada"
            })
        })
        .catch(err => Swal.fire({
            icon: "error",
            title: "Error al archivar la entrega"
        }))
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
                    <EntregaCard
                        key={entrega.id}
                        entrega={entrega}
                        setModo={setModo}
                        handleEditar={handleEditarEntrega}
                        handleArchivar={handleArchivarEntrega}
                        handleImprimir={handleImprimir}
                    />
                ))}
            </div>
        </div>
    )
}

export default EntregasPage
