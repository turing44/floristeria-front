import { useEffect, useState } from "react";
import { deleteEntrega, listEntregas } from "../api/services/entregasApi";


export function useEntregas({sort, dir}) {
    const [entregas, setEntregas] = useState([])
    
    function refetch() {
        return listEntregas({sort, dir}).then(setEntregas)
    }

    useEffect(() => {
        refetch()
    }, [sort, dir])


    function remove(id) {
        return deleteEntrega(id).then(refetch)
    }


    return { entregas, remove, refetch }
    
}