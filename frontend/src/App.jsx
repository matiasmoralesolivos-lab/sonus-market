
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Galeria from './pages/Galeria'
import DetallePublicacion from './pages/DetallePublicacion'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Perfil from './pages/Perfil'
import CrearPublicacion from './pages/CrearPublicacion'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publicaciones" element={<Galeria />} />
      <Route path="/publicaciones/crear" element={<CrearPublicacion />} />
      <Route path="/publicaciones/:id" element={<DetallePublicacion />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  )
}

export default App
