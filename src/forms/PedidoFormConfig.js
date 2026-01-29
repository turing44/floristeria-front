export const PedidoFormConfig = [
  {
    section: "Cliente",
    fields: [
      {
        name: "cliente",
        label: "Cliente",
        type: "text",
        required: true,
        autoComplete: "off",
        maxLength: 40
      },
      {
        name: "telf_cliente",
        label: "Teléfono cliente",
        type: "tel",
        required: true,
        autoComplete: "off",
        inputMode: "tel",
        maxLength: 20
      }
    ]
  },

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
    section: "Producto",
    fields: [
      {
        name: "producto",
        label: "Producto",
        type: "textarea",
        rows: 2,
        required: true,
        maxLength: 150
      },
      {
        name: "precio",
        label: "Precio €",
        type: "number",
        min: 0,
        step: 0.01,
        required: true,
        inputMode: "decimal",
        placeholder: ""
      }
    ]
  },

  {
    section: "Observaciones",
    fields: [
      {
        name: "observaciones",
        label: "Observaciones (opcional)",
        type: "textarea",
        rows: 4,
        required: false,
        maxLength: 300
      }
    ]
  }
]
