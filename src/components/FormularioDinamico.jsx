import React from 'react'
import { CampoFormulario } from './CampoFormulario';
import "@/styles/Formulario.css"

function FormularioDinamico({handleSubmit, values, esquema, handleChange}) {
    console.log(esquema);
    
    return (
        <form onSubmit={handleSubmit}>
            {esquema.map((seccion) => (

                <fieldset key={seccion.section}>
                    <legend>{seccion.section}</legend>

                    <div className='campos'>
                        
                    {seccion.fields.map((campo) => (
                        <div key={campo.name}>
                            <label>
                                {campo.label}
                                {campo.required && <span style={{color: "red"}}> *</span>}
                            </label>

                            <CampoFormulario
                                campo={campo}
                                value={values[campo.name] ?? ""}
                                onChange={handleChange}
                            />

                        
                        </div>
                    ))}
                    
                    </div>

                </fieldset>
            ))}

            <button type="submit" className="">
                Guardar
            </button>
        </form>
  )
}

export default FormularioDinamico