import React, { useState } from 'react'
import "@/styles/MainPage.css"
import Swal from 'sweetalert2'
import PedidoCard from '@/components/PedidoCard'
import SideBar from '@/components/SideBar'

function MainPage({
    useHook,
    useHookArchivadas,
    create,
    update,
    getPdf,
    FormComponent,
    tipo
}) {
    const [editId, setEditId] = useState(null)
    const [sort, setSort] = useState("fecha")
    const [modo, setModo] = useState("vista")
    const [mostrarArchivadas, setMostrarArchivadas] = useState(false);
    //Necesito hacer esto porque la API devuelve un objeto y necesito decirle lo que tiene que destructurar de forma personalizada (entrega o reserva)
    const hookItems = useHook({ sort });
    //Aquí se usa el objeto que viene del hook para destucturar lo que necesitamos, si se usan dos hook da error porque utiliza el último usado.
    const { remove, refetch, restaurar } = hookItems;
    const items = hookItems[tipo] || []

    const hookItemsArchivados = useHookArchivadas({ sort })
    const { refetchArchivadas } = hookItemsArchivados;
    const itemsArchivados = hookItemsArchivados[tipo + "Archivadas"] || []

    const itemsToShow = mostrarArchivadas ? itemsArchivados : items;
    const textoBotonArchivadas = mostrarArchivadas ? "Mostrar Activas" : "Mostrar Archivadas"


    const enviarFormulario = async (formulario) => {
        try {
            if (editId !== null) {
                await update(editId, formulario)
            } else {
                const item = await create(formulario)
                handleMostrarPdf(item.id)
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
            refetchArchivadas()
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

    const handleMostrarPdf = async (id) => {
        try {
            const blob = await getPdf(id)
            const url = URL.createObjectURL(blob)
            window.open(url)
        } catch (error) {
            console.log(error);

        }
    }

    const handleMostrarArchivadas = async () => {
        setMostrarArchivadas(prev => !prev);
        refetch();
        refetchArchivadas();
    }

    const handleRestaurar = async (id) => {
        try {
            await restaurar(id);
            refetch();
            refetchArchivadas();
            Swal.fire({
                icon: "success",
                title: "Elemento restaurado",
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al restaurar el elemento",
                text: error.message,
            })
        }
    }

    if (modo !== "vista") {
        return (
            <FormComponent
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
                handleMostrarPdf={handleMostrarPdf}
                tipo={tipo}
                handleMostrarArchivadas={handleMostrarArchivadas}
                textoBotonArchivadas={textoBotonArchivadas}
            />
            <div id='main-grid'>
                {itemsToShow.map(pedido => (
                    <PedidoCard
                        key={pedido.id}
                        pedido={pedido}
                        tipo={tipo}
                        handleEditar={handleEditar}
                        handleArchivar={handleArchivar}
                        handleMostrarPdf={handleMostrarPdf}
                        handleRestaurar={handleRestaurar}
                        mostrarArchivadas={mostrarArchivadas}
                    />
                ))}
            </div>
        </div>
    )
}

export default MainPage