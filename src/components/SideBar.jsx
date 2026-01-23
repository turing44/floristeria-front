import React from 'react'
import "@/styles/SideBar.css"

function SideBar({sort, setSort, setModo}) {
  return (
    <aside id='sidebar-aside'>
      <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          id="sort"
      >
          <option value="fecha_desc">Fecha descendente</option>
          <option value="fecha_asc">Fecha ascendente</option>
          <option value="codigo-postal">Codigo Postal</option>
      </select>

      <button
          onClick={() => {
              setModo("crear")
          }}
      >
          Crear Nuevo
      </button>
  </aside>
  )
}

export default SideBar