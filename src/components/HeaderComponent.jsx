import React from 'react'
import { useNavigate } from 'react-router-dom'

function HeaderComponent() {

  const navigate = useNavigate()

  return (
    <header className='w-100 mb-3'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <label onClick={() => window.location.reload()} className="navbar-brand">SGFAB</label>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <button className='btn' onClick={() => navigate("/reservas")}>Reservas</button>
              </li>
              
              <li className="nav-item">
                <button className='btn' onClick={() => navigate("/")}>Entregas</button>
              </li>
              
              <li className="nav-item">
                <button className='btn' onClick={() => navigate("/crear-mensaje")}>Crear Mensaje</button>
              </li>

            </ul>
            
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderComponent