
import { Link } from 'react-router-dom'

function ProductCard({ producto }) {
  return (
    <div className="card h-100 border rounded-4 p-1">
      <div
        className="bg-light border rounded-3 d-flex align-items-center justify-content-center overflow-hidden"
        style={{ height: '160px' }}
      >
        {producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="w-100 h-100"
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <span className="text-secondary small">IMAGEN</span>
        )}
      </div>

      <div className="card-body p-2">
        <h5 className="card-title fs-6 mb-1">
          {producto.nombre}
        </h5>

        <p className="small text-secondary mb-1">
          ${producto.precio.toLocaleString('es-CL')}
        </p>

        <Link
          to={`/publicaciones/${producto.id}`}
          className="btn btn-outline-secondary btn-sm w-100"
        >
          Ver publicación
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
