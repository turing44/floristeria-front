/**
 * ef- siginifica Entrega Form
 */

import { useState, useEffect } from "react";
import "@/styles/FormPedido.css";
import { getReserva } from "../../api/services/reservasApi";
import FormPedidos from "../genericos/FormPedidos";


export const defaultReserva = {
    fuente: "",
    producto: "",
    precio: "",
    fecha_entrega: "",
    cliente: "",
    telf_cliente: "",
    horario: "",
    observaciones: "",
    destinatario: "",
    mensaje: "",
    dinero_dejado_a_cuenta: "",
    estado_pago: "PENDIENTE",
};

export default function FormReserva({
    initialValue = defaultReserva,
    editId = null,
    onSubmit,
    onCancel,
    title = "Reserva",
}) {

    const [form, setForm] = useState(initialValue);

    const setField = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
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
        <form className="ef-form" onSubmit={handleSubmit}>
            <FormPedidos
                form={form}
                setField={setField}
                title={title}
            />

            <section className="ef-section">
                <h2 className="ef-sectionTitle">Estado Reserva</h2>
                <div className="ef-grid">
                    <div className="ef-field">
                        <label className="ef-label" htmlFor="estado_pago">
                            Estado del Pago
                        </label>
                        <select
                            id="estado_pago"
                            className="ef-input"
                            value={form.estado_pago}
                            onChange={(e) => setField("estado_pago", e.target.value)}
                        >
                            <option value="PAGADO">PAGADO</option>
                            <option value="PENDIENTE">PENDIENTE</option>
                        </select>
                    </div>

                    <div className="ef-field">
                        <label className="ef-label" htmlFor="dinero_dejado_a_cuenta">
                            Dinero a Cuenta (€)
                        </label>
                        <input
                            id="dinero_dejado_a_cuenta"
                            className="ef-input"
                            type="text"
                            value={form.dinero_dejado_a_cuenta}
                            onChange={(e) => setField("dinero_dejado_a_cuenta", e.target.value)}
                            inputMode="decimal"
                            placeholder="0.00"
                            max={form.precio}
                        />
                    </div>
                </div>
            </section>

            <section className="ef-section">
                <h2 className="ef-sectionTitle">Mensaje Personalizado</h2>
                <div className="ef-grid">
                    <div className="ef-field ef-field--full">
                        <label className="ef-label" htmlFor="observaciones">
                            Nombre Destinatario
                        </label>
                        <textarea
                            id="nombre_destinatario"
                            className="ef-input ef-textarea"
                            value={form.destinatario ?? ""}
                            onChange={(e) => setField("destinatario", e.target.value)}
                            rows={4}
                        />
                    </div>

                    <div className="ef-field ef-field--full">
                        <label className="ef-label" htmlFor="mensaje">
                            Texto Mensaje
                        </label>
                        <textarea
                            id="mensaje"
                            className="ef-input ef-textarea"
                            value={form.mensaje ?? ""}
                            onChange={(e) => setField("mensaje", e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>
            </section>

            <footer className="ef-actions ef-actions--bottom">
                {typeof onCancel === "function" && (
                    <button type="button" className="ef-btn ef-btn--ghost" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
                <button type="submit" className="ef-btn ef-btn--primary">
                    Guardar
                </button>
            </footer>
        </form>
    );
}
