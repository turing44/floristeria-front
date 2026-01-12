import React, { useEffect, useState } from 'react'
import { useEntregas } from '../hooks/useEntregas'
import EntregaCard from './../components/entregas/EntregaCard'
import "./EntregaPage.css"
import FormEntrega from '../components/entregas/FormEntrega'
import { createEntrega, getEntrega } from '../api/services/entregasApi'

function EntregasPage() {

    const [sort, setSort] = useState("fecha")
    const [dir, setDir] = useState("desc")
    const [editId, setEditId] = useState(null)
    const [entregaEditando, setEntregaEditando] = useState(null)

    const { entregas } = useEntregas({ sort, dir })

    const enviarFormulario = async (formulario) => {
        await createEntrega(formulario)
        setEditId(null)
        setEntregaEditando(null)
    }

    useEffect(() => {
        if (editId && editId !== 'new') {
            getEntrega(editId).then(res => {
                setEntregaEditando(res)
            })
        }
    }, [editId])

    if (editId !== null) {

        if (editId !== 'new' && !entregaEditando) {
            return <p>Cargando...</p>
        }

        return (
            <FormEntrega
                onSubmit={enviarFormulario}
                initialValue={editId === 'new' ? null : entregaEditando}
                onCancel={() => {
                    setEditId(null)
                    setEntregaEditando(null)
                }}
            />
        )
    }

    return (
        <div id='entregas-page'>
            <aside>
                <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    id="sort"
                >
                    <option value="fecha">Fecha</option>
                    <option value="codigo-postal">Codigo Postal</option>
                </select>

                <select
                    value={dir}
                    onChange={e => setDir(e.target.value)}
                    id="dir"
                >
                    <option value="desc">Descendente</option>
                    <option value="asc">Ascendente</option>
                </select>

                <button
                    onClick={() => {
                        setEditId('new')
                        setEntregaEditando(null)
                    }}
                >
                    Crear Nuevo
                </button>
            </aside>

            <div id='entregas-grid'>
                {entregas.map(entrega => (
                    <EntregaCard
                        key={entrega.id}
                        entrega={entrega}
                        handleEditar={setEditId}
                    />
                ))}
            </div>
        </div>
    )
}

export default EntregasPage
