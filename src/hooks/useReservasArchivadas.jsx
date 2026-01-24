import { useEffect, useState } from "react";
import { listReservasArchivadas } from "../api/services/reservasApi";


export function useReservasArchivadas({ sort }) {
    const [reservasArchivadas, setReservasArchivadas] = useState([])

    function refetchArchivadas() {
        return listReservasArchivadas(sort).then(setReservasArchivadas)
    }

    useEffect(() => {
        refetchArchivadas()
        console.log(reservasArchivadas);
        
    }, [sort])
    return { reservasArchivadas, refetchArchivadas }
}