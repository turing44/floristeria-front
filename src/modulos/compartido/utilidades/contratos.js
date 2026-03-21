function obtenerTodosLosCampos(contrato) {
  const visibles = (contrato?.secciones ?? []).flatMap((seccion) => seccion.campos);
  const ocultos = contrato?.campos_ocultos ?? [];

  return [...ocultos, ...visibles];
}

export function construirValoresIniciales(contrato, valoresActuales = {}) {
  const valores = {};

  for (const campo of obtenerTodosLosCampos(contrato)) {
    valores[campo.clave] = valoresActuales[campo.clave] ?? campo.valor_inicial ?? "";
  }

  return valores;
}
