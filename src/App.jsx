import { useState } from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import EntregasPage from './pages/EntregasPage'
import HeaderComponent from './components/HeaderComponent'
import ReservasPage from './pages/ReservasPage'
import CrearMensajePage from './pages/CrearMensajePage'

function App() {


  return (
    <div id='app'>

      <HeaderComponent id='app-header'/>


      <div id='app-body'>
        <Routes>
          <Route path='/' element={<EntregasPage />}/>
          <Route path='/reservas' element={<ReservasPage />}/>
          <Route path='/crear-mensaje' element={<CrearMensajePage />}/>
          <Route path='/formulario-reserva' element={<></>}/>
        </Routes>
      </div>

    </div>
  )
}

export default App
