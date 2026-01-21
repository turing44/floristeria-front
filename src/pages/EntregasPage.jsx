import React, { useEffect, useState } from 'react'
import { useEntregas } from '../hooks/useEntregas'
import EntregaCard from './../components/entregas/EntregaCard'
import "./EntregaPage.css"
import FormEntrega, { defaultEntrega } from '../components/entregas/FormEntrega'
import { createEntrega, deleteEntrega, getEntrega } from '../api/services/entregasApi'
import EntregasSidebar from '../components/entregas/EntregasSidebar'
import Swal from 'sweetalert2'
import { getPdf } from '../api/services/imprimirApi'

function EntregasPage() {
    const [sort, setSort] = useState("fecha")
    const [dir, setDir] = useState("desc")
    const [editId, setEditId] = useState(null)
    
    // vista o form 
    const [modo, setModo] = useState("vista")

    const { entregas } = useEntregas({ sort, dir })

    const enviarFormulario = async (formulario) => {
        await createEntrega(formulario)
        setEditId(null)
        setModo("vista")
    }

    const handleEditarEntrega = (id) => {
        setEditId(id)
        setModo("form")
    }

    const handleArchivarEntrega = (id) => {
        deleteEntrega(id)
        .then(Swal.fire({
            icon: "success",
            title: "Entrega archivada"
        }))
        .catch(Swal.fire({
            icon: "error",
            title: "Error al archivar la entrega"
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
                dir={dir}
                setDir={setDir}
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
