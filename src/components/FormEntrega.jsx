import { useState, useEffect } from "react";
import { getEntrega } from "../api/services/entregasApi";
import FormularioDinamico from "./FormularioDinamico";
import { entregaFormConfig } from "../forms/EntregaFormConfig";

const hoy = () => new Date().toISOString().slice(0, 10)

export const defaultEntrega = {
  cliente: "",
  telf_cliente: "",
  destinatario: "",
  telf_destinatario: "",
  direccion: "",
  codigo_postal: "",
  producto: "",
  precio: "",
  fecha_entrega: hoy(),
  horario: "INDIFERENTE",
  observaciones: "",
  mensaje: "",
  fuente: "local"
};

export default function FormEntrega({
  initialValue = defaultEntrega,
  editId = null,
  onSubmit,
  title = "Entrega",
}) {

  const [form, setForm] = useState(initialValue);

  const setField = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(form);

    onSubmit(form)
  };


  useEffect(() => {
          if (!editId) {
              setForm(initialValue);
          } else {
              getEntrega(editId).then(setForm);
          }
      }, [initialValue, editId])


  if (!initialValue) {
    return <p>Cargando formulario...</p>
  }

  console.log(form);
  return (
    <div className="form-container">
      <h1>Entregas</h1>
      <FormularioDinamico 
        esquema={entregaFormConfig} 
        handleSubmit={handleSubmit}
        handleChange={setField}
        values={form}
         />
    </div>
  );
}
