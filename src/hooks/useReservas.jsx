import { useEffect, useState } from "react";
import { listReservas, deleteReserva, restaurarReserva } from "../api/services/reservasApi";


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
        await deleteReserva(id)
        refetch();

    }

    async function restaurar(id) {
        await restaurarReserva(id);
        refetch();
    }   


    return { reservas, remove, restaurar, refetch }
}