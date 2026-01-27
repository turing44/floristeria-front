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
        name: "dinero_dejado_a_cuenta",
        label: "Dinero que ya ha pagado",
        type: "number",
        required: false,
        autoComplete: "off",
      },
    ]
  }
]