
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import Navbar from '../components/Navbar'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { iniciarSesion } = useContext(GlobalContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const usuario = iniciarSesion(email)

    if (usuario) {
      navigate('/perfil')
    } else {
      alert('Correo electrónico no registrado.')
    }
  }

  return (
    <>
      <Navbar />

      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-5 col-lg-4">
            <div className="border rounded-4 p-4">
              <h1 className="h3 text-center mb-4">
                Iniciar sesión
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Ingresar
                </button>
              </form>

              <p className="text-center small mt-4 mb-0">
                ¿No tienes una cuenta?{' '}
                <Link to="/registro">Regístrate aquí</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Login
