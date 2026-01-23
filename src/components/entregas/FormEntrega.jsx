/**
 * ef- siginifica Entrega Form
 */

import { useState, useEffect } from "react";
import "./css/FormEntrega.css";
import { getEntrega } from "../../api/services/entregasApi";
import FormPedidos from "../genericos/FormPedidos";

export const defaultEntrega = {
  cliente: "",
  telf_cliente: "",
  destinatario: "",
  telf_destinatario: "",
  direccion: "",
  codigo_postal: "",
  producto: "",
  precio: "",
  fecha_entrega: "",
  horario: "INDIFERENTE",
  observaciones: "",
  mensaje: "",
  fuente: "local"
};

export default function FormEntrega({
  initialValue = defaultEntrega,
  editId = null,
  modo,
  onSubmit,
  onCancel,
  title = "Entrega",
}) {

  const [form, setForm] = useState(initialValue);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(form);

    onSubmit(form)
  };


  useEffect(() => {
    if (modo === "crear") {
      setForm(initialValue)
    } else {
      getEntrega(editId).then(setForm)
    }
  }, [initialValue, modo, editId])


  if (!initialValue) {
    return <p>Cargando formulario...</p>
  }

  return (
    <form className="ef-form" onSubmit={handleSubmit}>
      <FormPedidos
        form={form}
        setField={setField}
        title={title}
        campoMensaje={true}
      />

      <section className="ef-section">
        <h2 className="ef-sectionTitle">Destinatario</h2>

        <div className="ef-grid">
          <div className="ef-field">
            <label className="ef-label" htmlFor="destinatario">
              Destinatario <span className="ef-req">*</span>
            </label>
            <input
              id="destinatario"
              className="ef-input"
              type="text"
              value={form.destinatario}
              onChange={(e) => setField("destinatario", e.target.value)}
              required
            />
          </div>

          <div className="ef-field">
            <label className="ef-label" htmlFor="telf_destinatario">
              Teléfono destinatario <span className="ef-req">*</span>
            </label>
            <input
              id="telf_destinatario"
              className="ef-input"
              type="tel"
              value={form.telf_destinatario}
              onChange={(e) => setField("telf_destinatario", e.target.value)}
              inputMode="tel"
              required
            />
          </div>
        </div>
      </section>

      <section className="ef-section">
        <h2 className="ef-sectionTitle">Dirección</h2>

        <div className="ef-grid">
          <div className="ef-field ef-field--full">
            <label className="ef-label" htmlFor="direccion">
              Dirección <span className="ef-req">*</span>
            </label>
            <input
              id="direccion"
              className="ef-input"
              type="text"
              value={form.direccion}
              onChange={(e) => setField("direccion", e.target.value)}
              required
              autoComplete="street-address"
            />
          </div>

          <div className="ef-field">
            <label className="ef-label" htmlFor="codigo_postal">
              Código postal <span className="ef-req">*</span>
            </label>
            <input
              id="codigo_postal"
              className="ef-input"
              type="text"
              value={form.codigo_postal}
              onChange={(e) => setField("codigo_postal", e.target.value)}
              required
              inputMode="numeric"
              autoComplete="postal-code"
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
