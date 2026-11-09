
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'

function Navbar() {
  const { usuario, cerrarSesion } = useContext(GlobalContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    cerrarSesion()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg sonus-navbar">
      <div className="container">
        <Link className="navbar-brand sonus-brand" to="/">
          <span className="brand-icon">S</span>
          SonusMarket
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link className="nav-link sonus-nav-link" to="/">
            Inicio
          </Link>

          <Link className="nav-link sonus-nav-link" to="/publicaciones">
            Explorar
          </Link>

          {usuario ? (
            <>
              <Link className="nav-link sonus-nav-link" to="/perfil">
                Mi perfil
              </Link>

              <button
                className="btn sonus-btn-outline btn-sm"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link sonus-nav-link" to="/login">
                Iniciar sesión
              </Link>

              <Link className="btn sonus-btn-primary btn-sm" to="/registro">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
