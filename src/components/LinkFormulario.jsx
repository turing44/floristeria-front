import { useFormulario } from "../hooks/useFormulario";
import { useState, useEffect } from "react";

function LinkFormulario() {
    const { link, obtenerLink } = useFormulario();
    const [linkAnterior, setLinkAnterior] = useState("");

    useEffect(() => {
        obtenerLink();
    }, []);

    async function copiarAlPortapapeles() {
        if (!link) return;
        await navigator.clipboard.writeText(link);
        setLinkAnterior(link);
        await obtenerLink();
    }

    return (
        <>
            {link === linkAnterior ? (
                <p>Generando enlace...</p>
            ) : (
                <button onClick={copiarAlPortapapeles}>
                    Copiar enlace
                </button>
            )}
        </>
    );
}

export default LinkFormulario;
