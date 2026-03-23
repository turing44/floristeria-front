export function CampoContrato({ campo, valor, valores, alCambiar, error }) {
  const restricciones = campo.restricciones ?? {};
  const maxDinamico =
    restricciones.maximoCampo && valores[restricciones.maximoCampo] !== ""
      ? valores[restricciones.maximoCampo]
      : restricciones.max;
  const idCampo = `campo-${campo.clave}`;
  const contadorId = `${idCampo}-contador`;
  const errorId = `${idCampo}-error`;
  const descripcion = error
    ? errorId
    : restricciones.maxLength
      ? contadorId
      : undefined;

  const propsComunes = {
    id: idCampo,
    name: campo.clave,
    value: valor ?? "",
    required: campo.requerido,
    maxLength: restricciones.maxLength,
    min: restricciones.min,
    max: maxDinamico,
    step: restricciones.step,
    inputMode: restricciones.inputMode,
    pattern: restricciones.pattern,
    autoComplete: restricciones.autoComplete,
    placeholder: restricciones.placeholder,
    "aria-invalid": Boolean(error),
    "aria-describedby": descripcion,
    onChange: alCambiar,
  };

  if (campo.entrada === "hidden") {
    return <input type="hidden" {...propsComunes} />;
  }

  const contador = restricciones.maxLength ? (
    <span id={contadorId} className="campo-contrato__contador">
      {String(valor ?? "").length} / {restricciones.maxLength}
    </span>
  ) : null;

  const mensajeError = error ? (
    <p id={errorId} className="campo-contrato__error">
      {Array.isArray(error) ? error[0] : error}
    </p>
  ) : null;

  if (campo.entrada === "textarea") {
    return (
      <div className="campo-contrato">
        <textarea {...propsComunes} rows={restricciones.rows ?? 4} />
        {contador}
        {mensajeError}
      </div>
    );
  }

  if (campo.entrada === "select") {
    return (
      <div className="campo-contrato">
        <select {...propsComunes}>
          <option value="">Seleccione...</option>
          {(restricciones.options ?? []).map((opcion) => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
        </select>
        {mensajeError}
      </div>
    );
  }

  return (
    <div className="campo-contrato">
      <input {...propsComunes} type={campo.entrada} />
      {contador}
      {mensajeError}
    </div>
  );
}
