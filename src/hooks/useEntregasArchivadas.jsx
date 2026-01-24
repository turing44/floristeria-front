import { useEffect, useState } from "react";
import { listEntregasArchivadas } from "../api/services/entregasApi";


export function useEntregasArchivadas({ sort }) {
    const [entregasArchivadas, setEntregasArchivadas] = useState([])

    function refetchArchivadas() {
        return listEntregasArchivadas(sort).then(setEntregasArchivadas)
    }

    useEffect(() => {
        refetchArchivadas()
        console.log(entregasArchivadas);
        
    }, [sort])
    return { entregasArchivadas, refetchArchivadas }
}