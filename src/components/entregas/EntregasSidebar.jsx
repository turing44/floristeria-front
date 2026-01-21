import React from 'react'
import "./css/EntregasSidebar.css"

function EntregasSidebar({sort, setSort, dir, setDir, setModo}) {
  return (
    <aside id='entregas-aside'>
      <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          id="sort"
      >
          <option value="fecha">Fecha</option>
          <option value="codigo-postal">Codigo Postal</option>
      </select>

      <select
          value={dir}
          onChange={e => setDir(e.target.value)}
          id="dir"
      >
          <option value="desc">Descendente</option>
          <option value="asc">Ascendente</option>
      </select>

      <button
          onClick={() => {
              setModo("form")
          }}
      >
          Crear Nuevo
      </button>
  </aside>
  )
}

export default EntregasSidebar