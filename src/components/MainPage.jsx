import React, { useState } from 'react'
import "@/styles/MainPage.css"
import Swal from 'sweetalert2'
import PedidoCard from '@/components/PedidoCard'
import SideBar from '@/components/SideBar'

function MainPage({
    useHook,
    create,
    update,
    handleMasInfo,
    getPdf,
    FormComponent,
    tipo
}) {
    const [editId, setEditId] = useState(null)
    const [sort, setSort] = useState("fecha")
    const [modo, setModo] = useState("vista")
    //Necesito hacer esto porque la API devuelve un objeto y necesito decirle lo que tiene que destructurar de forma personalizada (entrega o reserva)
    const hookItems = useHook({sort});
    const { remove, refetch } = hookItems;
    const items = hookItems[tipo] || []

    const enviarFormulario = async (formulario) => {
        try {
            if (editId !== null) {
                await update(editId, formulario)
            } else {
                await create(formulario)
            }
            setEditId(null)
            setModo("vista")
            refetch()
        } catch (error) {
            console.log("Error al enviar el formulario:", error)
        }
    }

    const handleEditar = (id) => {
        setEditId(id)
        setModo("form")
    }

    const handleArchivar = async (id) => {
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
            const blob = await getPdf(id)
            const url = URL.createObjectURL(blob)
            window.open(url)
        } catch (error) {
            console.log(error);

        }
    }

    if (modo !== "vista") {
        return (
            <FormComponent
                modo={modo}
                editId={editId}
                onSubmit={enviarFormulario}
            />
        )
    }

    return (
        <div id='main-page'>
            <SideBar
                sort={sort}
                setSort={setSort}
                setModo={setModo}
            />
            <div id='main-grid'>
                {items.map(pedido => (
                    <PedidoCard
                        key={pedido.id}
                        pedido={pedido}
                        handleEditar={handleEditar}
                        handleArchivar={handleArchivar}
                        handleImprimir={handleImprimir}
                        handleMasInfo={handleMasInfo}
                    />
                ))}
            </div>
        </div>
    )
}

export default MainPage