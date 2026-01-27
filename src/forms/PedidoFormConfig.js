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
        maxLength: 15
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
        required: true,
        default: () => new Date().toISOString().slice(0, 10)
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
        maxLength: 120
      },
      {
        name: "precio",
        label: "Precio €",
        type: "decimal",
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
