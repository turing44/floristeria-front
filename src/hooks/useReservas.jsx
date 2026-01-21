import { useEffect, useState } from "react";
import { listReservas } from "../api/services/reservasApi";


export function useReservas({ sort, dir }) {
    const [reservas, setReservas] = useState([])

    function refetch() {
        return listReservas({ sort, dir }).then(setReservas)
    }

    useEffect(() => {
        refetch()
    }, [sort, dir])


    function remove(id) {
        return deleteReserva(id).then(refetch)
    }


    return { reservas, remove, refetch }
}