
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import { usuariosMock } from '../data/mockData'
import Navbar from '../components/Navbar'

function DetallePublicacion() {
  const { id } = useParams()
  const { publicaciones } = useContext(GlobalContext)

  const producto = publicaciones.find(
    (publicacion) => publicacion.id === Number(id)
  )

  if (!producto) {
    return (
      <>
        <Navbar />
        <main className="container py-5">
          <h1 className="h4">Publicación no encontrada</h1>
          <Link to="/publicaciones" className="btn btn-outline-dark mt-3">
            Volver a publicaciones
          </Link>
        </main>
      </>
    )
  }

  const vendedor = usuariosMock.find(
    (usuario) => usuario.id === producto.usuario_id
  )

  return (
    <>
      <Navbar />

      <main className="container py-5">
        <Link
          to="/publicaciones"
          className="text-secondary text-decoration-none small"
        >
          ← Volver a publicaciones
        </Link>

        <div className="row g-5 mt-2">
          <div className="col-12 col-md-6">
          
<div
  className="bg-light border rounded-4 d-flex align-items-center justify-content-center overflow-hidden"
  style={{ minHeight: '350px' }}
>
  {producto.imagen_url ? (
    <img
      src={producto.imagen_url}
      alt={producto.nombre}
      className="img-fluid"
      style={{ maxHeight: '350px', objectFit: 'contain' }}
    />
  ) : (
    <span className="text-secondary">IMAGEN</span>
  )}
</div>

          </div>

          <div className="col-12 col-md-6">
            <h1 className="h3 mb-3">{producto.nombre}</h1>

            <p className="text-secondary">
              {producto.descripcion}
            </p>

            <h2 className="h4 my-4">
              ${producto.precio.toLocaleString('es-CL')}
            </h2>

            <p>
              <strong>Categoría:</strong> {producto.categoria}
            </p>

            <p>
              <strong>Stock disponible:</strong> {producto.stock}
            </p>

            <hr />

            <h2 className="h5 mb-3">Información del vendedor</h2>

            {vendedor ? (
              <>
                <p className="mb-1">{vendedor.nombre}</p>
                <p className="text-secondary">{vendedor.email}</p>
              </>
            ) : (
              <p className="text-secondary">
                Información del vendedor no disponible.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default DetallePublicacion
