import React, { useState } from 'react'
import "@/styles/SideBar.css"

function SideBar({sort, setSort, setModo, tipo, handleMostrarPdf, handleMostrarArchivadas, textoBotonArchivadas}) {

    const [idBuscar, setIdBuscar] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        if (tipo === "reservas") {
            handleMostrarPdf(idBuscar);
        } else {
            handleMostrarPdf(idBuscar);
        }

    }

    return (
        <aside id='sidebar-aside'>

            <form onSubmit={onSubmit} className='cuadro-busqueda-id'>
                <input 
                    type="number" 
                    placeholder='Introduce el ID' 
                    required
                    value={idBuscar}
                    min={1}
                    onChange={(e) => setIdBuscar(e.target.value)}
                />

                <button type='submit'><i className='fa-solid fa-search'></i></button>
            </form>

        <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            id="sort"
        >
            <option value="fecha_desc">Fecha descendente</option>
            <option value="fecha_asc">Fecha ascendente</option>
            <option value="cp">Codigo Postal</option>
        </select>

        <button
            onClick={() => {
                setModo("crear")
            }}
        >
            Crear Nuevo
        </button>

        <button
            onClick={() => {
                handleMostrarArchivadas()
            }}
        >
            {textoBotonArchivadas}
        </button>

    </aside>
    )
}

export default SideBar