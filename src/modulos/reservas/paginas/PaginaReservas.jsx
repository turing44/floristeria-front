import { useEffect, useState } from "react";
import {
  actualizarReserva,
  archivarReserva,
  crearReserva,
  listarReservas,
  listarReservasArchivadas,
  obtenerPdfReserva,
  restaurarReserva,
} from "@/modulos/reservas/api/reservasApi";
import FormularioReserva from "@/modulos/reservas/componentes/FormularioReserva";
import TarjetaReserva from "@/modulos/reservas/componentes/TarjetaReserva";
import PanelPedidos from "@/modulos/compartido/componentes/PanelPedidos";
import { abrirPdfEnNuevaVentana } from "@/modulos/compartido/utilidades/pdf";
import {
  cerrarAlerta,
  mostrarCargandoPdf,
  mostrarError,
  mostrarExito,
} from "@/modulos/compartido/utilidades/alertas";
import "@/styles/MainPage.css";
import "@/styles/EntregaPage.css";

const OPCIONES_ORDEN = [
  { value: "fecha_desc", label: "Fecha descendente" },
  { value: "fecha_asc", label: "Fecha ascendente" },
];

export default function PaginaReservas() {
  const [modo, setModo] = useState("vista");
  const [idEditar, setIdEditar] = useState(null);
  const [orden, setOrden] = useState("fecha_desc");
  const [mostrarArchivadas, setMostrarArchivadas] = useState(false);
  const [recargaClave, setRecargaClave] = useState(0);
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let cancelado = false;

    async function cargar() {
      setCargando(true);

      try {
        const datos = mostrarArchivadas
          ? await listarReservasArchivadas()
          : await listarReservas(orden);

        if (!cancelado) {
          setReservas(datos);
        }
      } catch (error) {
        if (!cancelado) {
          mostrarError(error, "No se pudieron cargar las reservas");
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargar();

    return () => {
      cancelado = true;
    };
  }, [mostrarArchivadas, orden, recargaClave]);

  async function mostrarPdf(id) {
    try {
      mostrarCargandoPdf();
      const blob = await obtenerPdfReserva(id);
      cerrarAlerta();
      abrirPdfEnNuevaVentana(blob);
    } catch (error) {
      cerrarAlerta();
      mostrarError(error, "No se pudo generar el PDF");
    }
  }

  async function guardarReserva(valores) {
    if (idEditar) {
      await actualizarReserva(idEditar, valores);
    } else {
      const reserva = await crearReserva(valores);
      await mostrarPdf(reserva.id);
    }

    setModo("vista");
    setIdEditar(null);
    setRecargaClave((previo) => previo + 1);
  }

  async function handleArchivar(id) {
    try {
      await archivarReserva(id);
      mostrarExito("Reserva archivada");
      setRecargaClave((previo) => previo + 1);
    } catch (error) {
      mostrarError(error, "No se pudo archivar la reserva");
    }
  }

  async function handleRestaurar(id) {
    try {
      await restaurarReserva(id);
      mostrarExito("Reserva restaurada");
      setRecargaClave((previo) => previo + 1);
    } catch (error) {
      mostrarError(error, "No se pudo restaurar la reserva");
    }
  }

  if (modo !== "vista") {
    return <FormularioReserva idEditar={idEditar} alGuardar={guardarReserva} />;
  }

  return (
    <div id="main-page">
      <PanelPedidos
        opcionesOrden={OPCIONES_ORDEN}
        ordenSeleccionado={orden}
        alCambiarOrden={setOrden}
        alCrear={() => {
          setIdEditar(null);
          setModo("crear");
        }}
        alAlternarArchivadas={() => setMostrarArchivadas((previo) => !previo)}
        textoArchivadas={mostrarArchivadas ? "Mostrar Activas" : "Mostrar Archivadas"}
        alImprimirPorId={mostrarPdf}
      />

      <div id="main-grid">
        {cargando && <p>Cargando reservas...</p>}

        {!cargando &&
          reservas.map((reserva) => (
            <TarjetaReserva
              key={reserva.id}
              reserva={reserva}
              mostrarArchivadas={mostrarArchivadas}
              alEditar={(id) => {
                setIdEditar(id);
                setModo("editar");
              }}
              alArchivar={handleArchivar}
              alRestaurar={handleRestaurar}
              alImprimir={mostrarPdf}
            />
          ))}
      </div>
    </div>
  );
}
