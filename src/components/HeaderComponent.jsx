import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function HeaderComponent() {

  const navigate = useNavigate()

  return (
    <header className='w-100 mb-3'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <label onClick={() => window.location.reload()} className="navbar-brand"><img width={80} src="/logoFloristeria.png" alt="logo floristería" /></label>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink
                  to="/reservas"
                  className={({ isActive }) =>
                    `btn nav-link ${isActive ? 'active fw-bold text-primary' : 'text-dark'}`
                  }
                >
                  Reservas
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `btn nav-link ${isActive ? 'active fw-bold text-primary' : 'text-dark'}`
                  }
                >
                  Entregas
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/crear-mensaje"
                  className={({ isActive }) =>
                    `btn nav-link ${isActive ? 'active fw-bold text-primary' : 'text-dark'}`
                  }
                >
                  Crear Mensaje
                </NavLink>
              </li>

        
            </ul>

          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderComponent