import { PedidoFormConfig } from "./PedidoFormConfig";

export const entregaFormConfig = [
  ...PedidoFormConfig,

  {
    section: "Fecha",
    fields: [
      {
        name: "fecha_entrega",
        label: "Fecha (Mes/Dia/Año)",
        type: "date",
        required: true
      },
      {
        name: "horario",
        label: "Horario",
        type: "select",
        required: true,
        options: [
          { value: "INDIFERENTE", label: "INDIFERENTE" },
          { value: "MAÑANA", label: "MAÑANA" },
          { value: "TARDE", label: "TARDE" }
        ]
      }
    ]
  },

  
  {
    section: "Envio",
    fields: [
      {
        name: "destinatario",
        label: "Nombre del Destinatario (este nombre irá en la tarjeta)",
        type: "text",
        required: true,
        autoComplete: "off",
        maxLength: 30,
        regex: '^(?:Mª\s)?[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{1,13}(?:\s(?:de|del|la|los|las))?(?:\s[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{1,13}){1,4}$',
      },
      {
        name: "telf_destinatario",
        label: "Teléfono del Destinatario",
        type: "tel",
        required: true,
        autoComplete: "off",
        inputMode: "tel",
        maxLength: 20
      },
      {
        name: "direccion",
        label: "Dirección",
        type: "text",
        required: true,
        maxLength: 60
      },
      {
        name: "codigo_postal",
        label: "Codigo Postal",
        type: "text",
        required: true,
        inputMode: "number",
        maxLength: 5,
      },
    ]
  },

  {
    section: "Texto Mensaje",
    fields: [
        {
            name: "mensaje",
            label: "Mensaje (opcional)",
            type: "textarea",
            rows: 4,
            required: false,
            maxLength: 255,
            

        }
    ]
  }
]