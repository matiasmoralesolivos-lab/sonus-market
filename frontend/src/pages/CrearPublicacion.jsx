
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import Navbar from '../components/Navbar'

function CrearPublicacion() {
  const { usuario, agregarPublicacion } = useContext(GlobalContext)
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [categoria, setCategoria] = useState('Instrumentos')
  const [stock, setStock] = useState('1')
  const [imagenUrl, setImagenUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevaPublicacion = {
      id: Date.now(),
      usuario_id: usuario.id,
      nombre,
      descripcion,
      precio: Number(precio),
      categoria,
      stock: Number(stock),
      imagen_url: imagenUrl
    }

    agregarPublicacion(nuevaPublicacion)
    alert('Publicación creada correctamente.')
    navigate('/perfil')
  }

  if (!usuario) {
    return (
      <>
        <Navbar />
        <main className="container py-5">
          <h1 className="h4">Debes iniciar sesión para crear una publicación.</h1>
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
        <h1 className="h3 mb-4">Crear publicación</h1>

        <div className="row g-5">
          <div className="col-12 col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre del producto</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Categoría</label>
                <select
                  className="form-select"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="Instrumentos">Instrumentos</option>
                  <option value="Equipos de sonido">Equipos de sonido</option>
                  <option value="Accesorios">Accesorios</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">URL de imagen</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={imagenUrl}
                  onChange={(e) => setImagenUrl(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark">
                Publicar producto
              </button>
            </form>
          </div>

          <div className="col-12 col-md-6">
            <h2 className="h5 mb-3">Vista previa de imagen</h2>

            <div
              className="bg-light border rounded-4 d-flex align-items-center justify-content-center"
              style={{ minHeight: '350px' }}
            >
              {imagenUrl ? (
                <img
                  src={imagenUrl}
                  alt="Vista previa del producto"
                  className="img-fluid rounded-4"
                  style={{ maxHeight: '350px' }}
                />
              ) : (
                <span className="text-secondary">IMAGEN</span>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default CrearPublicacion
