import React from 'react'
import "./css/EntregasSidebar.css"
import { useState } from 'react'

function ReservasSideBar({ setModo }) {

    return (
        <aside id='entregas-aside'>
            <form className="es-form">
                <h2>PENDIENTE IMPLEMENTAR FILTROS SI CORRESPONDE.</h2>
                <button
                    onClick={() => {
                        setModo("form")
                    }}
                >
                    Crear Reserva
                </button>
            </form>
        </aside>
    )
}

export default ReservasSideBar