import './App.css'
import { Route, Routes } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import PaginaEntregas from './modulos/entregas/paginas/PaginaEntregas'
import PaginaReservas from './modulos/reservas/paginas/PaginaReservas'
import PaginaMensajes from './modulos/mensajes/paginas/PaginaMensajes'

function App() {
  return (
    <div id='app'>
      <HeaderComponent id='app-header'/>
      <div id='app-body'>
        <Routes>
          <Route path='/' element={<PaginaEntregas />}/>
          <Route path='/reservas' element={<PaginaReservas />}/>
          <Route path='/crear-mensaje' element={<PaginaMensajes />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
