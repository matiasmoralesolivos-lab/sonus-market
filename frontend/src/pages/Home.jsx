
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import './Home.css'

const categorias = [
  {
    nombre: 'Audio profesional',
    descripcion: 'Monitores y amplificación'
  },
  {
    nombre: 'Instrumentos',
    descripcion: 'Guitarras, bajos y teclados'
  },
  {
    nombre: 'Accesorios',
    descripcion: 'Cables, atriles y otros'
  },
  {
    nombre: 'Otros',
    descripcion: 'Productos variados'
  }
]

function Home() {
  const { publicaciones } = useContext(GlobalContext)

  return (
    <>
      <Navbar />

      <main className="container home-container">

        <section className="home-hero">
          <h1>Audio profesional y música</h1>

          <p>
            Encuentra equipos, accesorios e instrumentos musicales.
          </p>

          <Link to="/publicaciones" className="btn btn-outline-dark btn-sm">
            Explorar productos
          </Link>
        </section>

        <section className="home-categories">
          <h2>Categorías destacadas</h2>

          <div className="row g-3">
            {categorias.map((categoria) => (
              <div className="col-6 col-lg-3" key={categoria.nombre}>
                <Link
                  to="/publicaciones"
                  className="category-card"
                >
                  <h3>{categoria.nombre}</h3>
                  <p>{categoria.descripcion}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="home-products">
          <h2>Publicaciones recientes</h2>

          <div className="row g-4">
            {publicaciones.slice(0, 3).map((producto) => (
              <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  )
}

export default Home
