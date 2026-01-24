import { useEffect, useState } from "react";
import { deleteEntrega, listEntregas, restaurarEntrega } from "../api/services/entregasApi";


export function useEntregas({sort}) {
    const [entregas, setEntregas] = useState([])
    
    function refetch() {
        return listEntregas({sort}).then(setEntregas)
    }

    useEffect(() => {
        refetch()
    }, [sort])


    async function remove(id) {
        await deleteEntrega(id);
        refetch();
    }

    async function restaurar(id) {
        await restaurarEntrega(id);
        refetch();
    }

    return { entregas, remove, restaurar, refetch }
    
}