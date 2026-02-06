import { linkFormulario } from "../api/services/formularioAPI";
import { useState } from "react";

export function useFormulario() {
    const [link, setLink] = useState("");

    async function obtenerLink() {
        const link = await linkFormulario();
        setLink(link);
    }

    return { link, obtenerLink }
}