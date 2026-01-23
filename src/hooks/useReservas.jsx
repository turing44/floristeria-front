import { useEffect, useState } from "react";
import { listReservas } from "../api/services/reservasApi";


export function useReservas({ sort }) {
    const [reservas, setReservas] = useState([])

    function refetch() {
        return listReservas({ sort }).then(setReservas)
    }

    useEffect(() => {
        refetch()
    }, [sort])


    function remove(id) {
        return deleteReserva(id).then(refetch)
    }


    return { reservas, remove, refetch }
}