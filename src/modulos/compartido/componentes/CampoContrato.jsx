export function CampoContrato({ campo, valor, valores, alCambiar }) {
  const restricciones = campo.restricciones ?? {};
  const maxDinamico =
    restricciones.maximoCampo && valores[restricciones.maximoCampo] !== ""
      ? valores[restricciones.maximoCampo]
      : restricciones.max;

  const propsComunes = {
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
    onChange: alCambiar,
  };

  if (campo.entrada === "hidden") {
    return <input type="hidden" {...propsComunes} />;
  }

  if (campo.entrada === "textarea") {
    return (
      <div>
        <textarea {...propsComunes} rows={restricciones.rows ?? 4} />
        {restricciones.maxLength && (
          <span>{String(valor ?? "").length} / {restricciones.maxLength}</span>
        )}
      </div>
    );
  }

  if (campo.entrada === "select") {
    return (
      <select {...propsComunes}>
        <option value="">Seleccione...</option>
        {(restricciones.options ?? []).map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div>
      <input {...propsComunes} type={campo.entrada} />
      {restricciones.maxLength && (
        <span>{String(valor ?? "").length} / {restricciones.maxLength}</span>
      )}
    </div>
  );
}
