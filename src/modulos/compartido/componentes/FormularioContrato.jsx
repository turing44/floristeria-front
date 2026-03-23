import { CampoContrato } from "@/modulos/compartido/componentes/CampoContrato";
import "./FormularioContrato.css";

function CampoVisible({ campo, valores, alCambiar, error }) {
  const idCampo = `campo-${campo.clave}`;

  return (
    <div key={campo.clave} className="formulario-contrato__campo">
      <label htmlFor={idCampo}>
        {campo.etiqueta}
        {campo.requerido && <span className="formulario-contrato__obligatorio"> *</span>}
      </label>

      <CampoContrato
        campo={campo}
        valor={valores[campo.clave]}
        valores={valores}
        alCambiar={alCambiar}
        error={error}
      />
    </div>
  );
}

export default function FormularioContrato({
  titulo,
  contrato,
  valores,
  errores,
  enviando,
  sucio,
  alCambiar,
  alGuardar,
  alGuardarEImprimir,
  alCancelar,
}) {
  const deshabilitarGuardado =
    enviando || (contrato.operacion === "actualizar" && !sucio);

  return (
    <div className="formulario-contrato">
      <div className="formulario-contrato__cabecera">
        <div>
          <p className="formulario-contrato__eyebrow">{titulo}</p>
          <h2>{contrato.operacion === "actualizar" ? "Editar pedido" : "Nuevo pedido"}</h2>
        </div>

        <div className="formulario-contrato__estado">
          {sucio ? (
            <span className="formulario-contrato__badge formulario-contrato__badge--aviso">
              Cambios sin guardar
            </span>
          ) : (
            <span className="formulario-contrato__badge">Sin cambios</span>
          )}
        </div>
      </div>

      {Object.keys(errores).length > 0 && (
        <div className="formulario-contrato__errores">
          Revisa los campos marcados antes de continuar.
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          alGuardar();
        }}
      >
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
                  error={errores[campo.clave]}
                />
              ))}
            </div>
          </fieldset>
        ))}

        <div className="formulario-contrato__acciones">
          <button type="button" className="boton-secundario" onClick={alCancelar}>
            Cancelar
          </button>

          <button type="submit" className="boton-principal" disabled={deshabilitarGuardado}>
            {enviando ? "Guardando..." : "Guardar"}
          </button>

          <button
            type="button"
            className="boton-accion"
            onClick={alGuardarEImprimir}
            disabled={deshabilitarGuardado}
          >
            {enviando ? "Guardando..." : "Guardar e imprimir"}
          </button>
        </div>
      </form>
    </div>
  );
}
