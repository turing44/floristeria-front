export function CampoFormulario({ campo, value, onChange, error }) {
  const commonProps = {
    name: campo.name,
    value,
    required: campo.required,
    maxLength: campo.maxLength,
    autoComplete: campo.autoComplete,
    inputMode: campo.inputMode,
    default: campo.default,
    onChange: (e) => onChange(e),
  };

  switch (campo.type) {
    case "textarea":
      return (
        <div>
            <textarea
            {...commonProps}
            rows={campo.rows ?? 4}
              />

            {commonProps.maxLength && 
            <span>{(commonProps.value).length} / {commonProps.maxLength}</span>
            }
        </div>
      );

    case "select":
      return (
        <select
          {...commonProps}
        >
          <option value="">Seleccione...</option>
          {campo.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    default:
      return (
        <div>

            <input
            {...commonProps}
            type={campo.type}
            />

            {commonProps.maxLength && 
            <span>{(commonProps.value).length} / {commonProps.maxLength}</span>
            }
            
        </div>
      );
  }
}
