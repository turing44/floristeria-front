/**
 * ef- siginifica Entrega Form
 */

import { useState, useEffect } from "react";
import { getReserva } from "../api/services/reservasApi";
import FormularioDinamico from "./FormularioDinamico";
import { ReservaFormConfig } from "../forms/ReservaFormConfig";

const hoy = () => new Date().toISOString().slice(0, 10)

export const defaultReserva = {
    fuente: "",
    producto: "",
    precio: "",
    fecha_entrega: hoy(),
    cliente: "",
    telf_cliente: "",
    horario: "INDIFERENTE",
    observaciones: "",
    destinatario: "",
    mensaje: "",
    dinero_pendiente: 0,
};

export default function FormReserva({
    initialValue = defaultReserva,
    editId = null,
    onSubmit,
}) {

    const [form, setForm] = useState(initialValue);

    const setField = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form)
    };


    useEffect(() => {
        if (!editId) {
            setForm(initialValue);
        } else {
            getReserva(editId).then(setForm);

        }
    }, [initialValue, editId])

    if (!initialValue) {
        return <p>Cargando formulario...</p>
    }

    return (
        <div className="form-container">
            <h1>Reservas</h1>

            <FormularioDinamico 
                esquema={ReservaFormConfig}
                values={form}
                handleSubmit={handleSubmit}
                handleChange={setField}  />
            
        </div>
    );
}
