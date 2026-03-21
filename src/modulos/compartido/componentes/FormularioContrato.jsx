import { CampoContrato } from "@/modulos/compartido/componentes/CampoContrato";
import "@/styles/Formulario.css";

function CampoVisible({ campo, valores, alCambiar }) {
  return (
    <div key={campo.clave}>
      <label>
        {campo.etiqueta}
        {campo.requerido && <span style={{ color: "red" }}> *</span>}
      </label>

      <CampoContrato
        campo={campo}
        valor={valores[campo.clave]}
        valores={valores}
        alCambiar={alCambiar}
      />
    </div>
  );
}

export default function FormularioContrato({
  titulo,
  contrato,
  valores,
  alCambiar,
  alEnviar,
}) {
  return (
    <div className="form-container">
      <h1>{titulo}</h1>

      <form onSubmit={alEnviar}>
        {(contrato.campos_ocultos ?? []).map((campo) => (
          <CampoContrato
            key={campo.clave}
            campo={campo}
            valor={valores[campo.clave]}
            valores={valores}
            alCambiar={alCambiar}
          />
        ))}

        {contrato.secciones.map((seccion) => (
          <fieldset key={seccion.id}>
            <legend>{seccion.titulo}</legend>

            <div className="campos">
              {seccion.campos.map((campo) => (
                <CampoVisible
                  key={campo.clave}
                  campo={campo}
                  valores={valores}
                  alCambiar={alCambiar}
                />
              ))}
            </div>
          </fieldset>
        ))}

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
