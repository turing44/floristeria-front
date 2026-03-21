import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  actualizarEntrega,
  archivarEntrega,
  crearEntrega,
  listarEntregas,
  listarEntregasArchivadas,
  obtenerPdfEntrega,
  restaurarEntrega,
} from "@/modulos/entregas/api/entregasApi";
import FormularioEntrega from "@/modulos/entregas/componentes/FormularioEntrega";
import TarjetaEntrega from "@/modulos/entregas/componentes/TarjetaEntrega";
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
  { value: "cp", label: "Codigo Postal" },
];

export default function PaginaEntregas() {
  const [modo, setModo] = useState("vista");
  const [idEditar, setIdEditar] = useState(null);
  const [orden, setOrden] = useState("fecha_desc");
  const [mostrarArchivadas, setMostrarArchivadas] = useState(false);
  const [recargaClave, setRecargaClave] = useState(0);
  const [entregas, setEntregas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let cancelado = false;

    async function cargar() {
      setCargando(true);

      try {
        const datos = mostrarArchivadas
          ? await listarEntregasArchivadas()
          : await listarEntregas(orden);

        if (!cancelado) {
          setEntregas(datos);
        }
      } catch (error) {
        if (!cancelado) {
          mostrarError(error, "No se pudieron cargar las entregas");
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
      const blob = await obtenerPdfEntrega(id);
      cerrarAlerta();
      abrirPdfEnNuevaVentana(blob);
    } catch (error) {
      cerrarAlerta();
      mostrarError(error, "No se pudo generar el PDF");
    }
  }

  async function guardarEntrega(valores) {
    if (idEditar) {
      await actualizarEntrega(idEditar, valores);
    } else {
      const entrega = await crearEntrega(valores);
      await mostrarPdf(entrega.id);
    }

    setModo("vista");
    setIdEditar(null);
    setRecargaClave((previo) => previo + 1);
  }

  async function handleArchivar(id) {
    try {
      await archivarEntrega(id);
      mostrarExito("Entrega archivada");
      setRecargaClave((previo) => previo + 1);
    } catch (error) {
      mostrarError(error, "No se pudo archivar la entrega");
    }
  }

  async function handleRestaurar(id) {
    try {
      await restaurarEntrega(id);
      mostrarExito("Entrega restaurada");
      setRecargaClave((previo) => previo + 1);
    } catch (error) {
      mostrarError(error, "No se pudo restaurar la entrega");
    }
  }

  if (modo !== "vista") {
    return <FormularioEntrega idEditar={idEditar} alGuardar={guardarEntrega} />;
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
        {cargando && <p>Cargando entregas...</p>}

        {!cargando &&
          entregas.map((entrega) => (
            <TarjetaEntrega
              key={entrega.id}
              entrega={entrega}
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
