import { PedidoFormConfig } from "./PedidoFormConfig";

export const ReservaFormConfig = [
  ...PedidoFormConfig,

  {
    section: "Fecha",
    fields: [
      {
        name: "fecha_entrega",
        label: "Fecha de recogida (Mes/Dia/Año)",
        type: "date",
        required: true
      },
      {
        name: "hora_recogida",
        label: "Hora de recogida",
        type: "number",
        min: 0,
        max: 23,
        step: 1,
        required: false,
        inputMode: "numeric",
      }
    ]
  },
  
  {
    section: "Pago",
    fields: [
        {
        name: "estado_pago",
        label: "Estado del pago",
        type: "select",
        required: true,
        options: [
          { value: "PENDIENTE", label: "PENDIENTE" },
          { value: "PAGADO", label: "PAGADO" },
        ]
      },
      {
        name: "dinero_pendiente",
        label: "Dinero Pendiente",
        type: "number",
        required: false,
        autoComplete: "off",
      },
    ]
  }
]