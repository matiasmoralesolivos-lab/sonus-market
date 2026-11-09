
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import Navbar from '../components/Navbar'

function Registro() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { registrarUsuario } = useContext(GlobalContext)
  const navigate = useNavigate()

  
const handleSubmit = (e) => {
  e.preventDefault()

  if (password.length < 8 || password.length > 64) {
    alert('La contraseña debe tener entre 8 y 64 caracteres.')
    return
  }

  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    alert('La contraseña debe contener al menos una letra y un número.')
    return
  }

  if (/\s/.test(password)) {
    alert('La contraseña no puede contener espacios.')
    return
  }

  const registrado = registrarUsuario(nombre, email)

  if (registrado) {
    alert('Usuario registrado correctamente.')
    navigate('/login')
  } else {
    alert('Este correo electrónico ya está registrado.')
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
                Crear cuenta
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
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
                  <label className="form-label">Contraseña</label>
                  
<input
  type="password"
  className="form-control"
  placeholder="Mínimo 8 caracteres"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  minLength={8}
  maxLength={64}
  required
/>

                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Registrarse
                </button>
              </form>

              <p className="text-center small mt-4 mb-0">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login">Inicia sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Registro
