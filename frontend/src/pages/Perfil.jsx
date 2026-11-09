
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

function Perfil() {
  const { usuario, publicaciones, cerrarSesion } = useContext(GlobalContext)
  const navigate = useNavigate()

  const misPublicaciones = publicaciones.filter(
    (producto) => producto.usuario_id === usuario?.id
  )

  const handleLogout = () => {
    cerrarSesion()
    navigate('/login')
  }

  if (!usuario) {
    return (
      <>
        <Navbar />
        <main className="container py-5">
          <h1 className="h4">Debes iniciar sesión para ver tu perfil.</h1>
          <Link to="/login" className="btn btn-dark mt-3">
            Iniciar sesión
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="container py-5">
        <h1 className="h3 mb-4">Mi perfil</h1>

        <section className="border rounded-4 p-4 mb-5">
          <h2 className="h5 mb-3">Información personal</h2>

          <p className="mb-2">
            <strong>Nombre:</strong> {usuario.nombre}
          </p>

          <p className="mb-3">
            <strong>Correo electrónico:</strong> {usuario.email}
          </p>

          <button
            className="btn btn-outline-dark btn-sm"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </section>

        <section>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 mb-0">Mis publicaciones</h2>

            <Link to="/publicaciones/crear" className="btn btn-dark btn-sm">
              Crear publicación
            </Link>
          </div>

          <div className="row g-4">
            {misPublicaciones.length > 0 ? (
              misPublicaciones.map((producto) => (
                <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
                  <ProductCard producto={producto} />
                </div>
              ))
            ) : (
              <p className="text-secondary">
                Todavía no tienes publicaciones.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default Perfil
