import { useEffect, useState } from "react";
import { listReservasArchivadas } from "../api/services/reservasApi";


export function useReservasArchivadas({ sort }) {
    const [reservasArchivadas, setReservasArchivadas] = useState([])

    function refetch() {
        return listReservasArchivadas(sort).then(setReservasArchivadas)
    }

    useEffect(() => {
        refetch()
        console.log(reservasArchivadas);
        
    }, [sort])
    return { reservasArchivadas, refetch }
}