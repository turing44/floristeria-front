import React, { useEffect, useState } from 'react'
import { useEntregas } from '../hooks/useEntregas'

function EntregasPage() {

    const [sort, setSort] = useState("fecha")
    const [dir, setDir] = useState("desc")
    
    const { entregas } = useEntregas({sort, dir})


    console.log(entregas)
    return (
        <div>

        </div>

    )
}

export default EntregasPage