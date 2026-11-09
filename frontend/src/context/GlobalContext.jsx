
import { createContext, useState } from "react";
import { usuariosMock, publicacionesMock } from "../data/mockData";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [publicaciones, setPublicaciones] = useState(publicacionesMock);

  const iniciarSesion = (email) => {
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.email === email
    );

    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado);
      return usuarioEncontrado;
    }

    return null;
  };

  const registrarUsuario = (nombre, email) => {
    const correoExiste = usuarios.some(
      (usuario) => usuario.email === email
    );

    if (correoExiste) {
      return false;
    }

    const nuevoUsuario = {
      id: Math.max(0, ...usuarios.map((usuario) => usuario.id)) + 1,
      nombre,
      email
    };

    setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);

    return true;
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  const agregarPublicacion = (nuevaPublicacion) => {
    setPublicaciones((prevPublicaciones) => [
      ...prevPublicaciones,
      nuevaPublicacion
    ]);
  };

  return (
    <GlobalContext.Provider
      value={{
        usuario,
        usuarios,
        publicaciones,
        iniciarSesion,
        registrarUsuario,
        cerrarSesion,
        agregarPublicacion
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
