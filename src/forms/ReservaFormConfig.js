import { PedidoFormConfig } from "./PedidoFormConfig";

export const ReservaFormConfig = [
  ...PedidoFormConfig,
  
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