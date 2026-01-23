import { useEffect, useState } from "react";
import { listReservas, deleteReserva } from "../api/services/reservasApi";


export function useReservas({ sort }) {
    const [reservas, setReservas] = useState([])

    function refetch() {
        return listReservas(sort).then(setReservas)
    }

    useEffect(() => {
        refetch()
        console.log(reservas);
        
    }, [sort])


    async function remove(id) {
        refetch();
        return await deleteReserva(id)
    }


    return { reservas, remove, refetch }
}