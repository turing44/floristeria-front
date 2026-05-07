import './App.css'
import { Route, Routes } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import PaginaEntregas from './modulos/entregas/paginas/PaginaEntregas'
import PaginaFormularioEntrega from './modulos/entregas/paginas/PaginaFormularioEntrega'
import PaginaReservas from './modulos/reservas/paginas/PaginaReservas'
import PaginaFormularioReserva from './modulos/reservas/paginas/PaginaFormularioReserva'
import PaginaMensajes from './modulos/mensajes/paginas/PaginaMensajes'

function App() {
  return (
    <div id='app'>
      <HeaderComponent id='app-header'/>
      <div id='app-body'>
        <Routes>
          <Route path='/' element={<PaginaEntregas />}/>
          <Route path='/entregas/nueva' element={<PaginaFormularioEntrega />}/>
          <Route path='/entregas/:id/editar' element={<PaginaFormularioEntrega />}/>
          <Route path='/reservas' element={<PaginaReservas />}/>
          <Route path='/reservas/nueva' element={<PaginaFormularioReserva />}/>
          <Route path='/reservas/:id/editar' element={<PaginaFormularioReserva />}/>
          <Route path='/crear-mensaje' element={<PaginaMensajes />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
