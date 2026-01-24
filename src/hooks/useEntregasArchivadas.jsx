import { useEffect, useState } from "react";
import { listEntregasArchivadas } from "../api/services/entregasApi";


export function useEntregasArchivadas({ sort }) {
    const [entregasArchivadas, setEntregasArchivadas] = useState([])

    function refetch() {
        return listEntregasArchivadas(sort).then(setEntregasArchivadas)
    }

    useEffect(() => {
        refetch()
        console.log(entregasArchivadas);
        
    }, [sort])
    return { entregasArchivadas, refetch }
}