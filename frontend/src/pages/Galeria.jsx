
import { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

function Galeria() {
  const { publicaciones } = useContext(GlobalContext)
  const [categoria, setCategoria] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')

  const publicacionesFiltradas = publicaciones.filter((producto) => {
    const coincideCategoria =
      categoria === 'Todas' || producto.categoria === categoria

    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    return coincideCategoria && coincideBusqueda
  })

  return (
    <>
      <Navbar />

      <main className="container py-5">
        <h1 className="h3 mb-4">Explorar publicaciones</h1>

        <div className="row g-4">
          {/* Filtros */}
          <aside className="col-12 col-md-3">
            <div className="border rounded-3 p-3">
              <h2 className="h5 mb-3">Filtros</h2>

              <label className="form-label">Buscar producto</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Nombre del producto"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Todas">Todas</option>
                <option value="Instrumentos">Instrumentos</option>
                <option value="Equipos de sonido">Equipos de sonido</option>
              </select>
            </div>
          </aside>

          {/* Productos */}
          <section className="col-12 col-md-9">
            <div className="row g-4">
              {publicacionesFiltradas.length > 0 ? (
                publicacionesFiltradas.map((producto) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={producto.id}>
                    <ProductCard producto={producto} />
                  </div>
                ))
              ) : (
                <p className="text-secondary">
                  No se encontraron publicaciones.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Galeria
