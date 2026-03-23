import { NavLink } from "react-router-dom";
import "./Header.css";

function HeaderComponent() {
  return (
    <header className="app-header">
      <nav className="app-header__nav">
        <NavLink to="/" className="app-header__marca">
          <img src="/logoFloristeria.png" alt="logo floristería" />
          <div>
            <strong>Floristería Antonia Bueno</strong>
          </div>
        </NavLink>

        <div className="app-header__links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `app-header__link ${isActive ? "app-header__link--activo" : ""}`
            }
          >
            Entregas
          </NavLink>

          <NavLink
            to="/reservas"
            className={({ isActive }) =>
              `app-header__link ${isActive ? "app-header__link--activo" : ""}`
            }
          >
            Reservas
          </NavLink>

          <NavLink
            to="/crear-mensaje"
            className={({ isActive }) =>
              `app-header__link ${isActive ? "app-header__link--activo" : ""}`
            }
          >
            Crear mensaje
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;
