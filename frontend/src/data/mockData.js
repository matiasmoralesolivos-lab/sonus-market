
export const usuariosMock = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@email.com"
  },
  {
    id: 2,
    nombre: "María González",
    email: "maria@email.com"
  }
];

export const publicacionesMock = [
  {
    id: 1,
    usuario_id: 1,
    nombre: "Guitarra eléctrica",
    descripcion: "Guitarra en buen estado.",
    precio: 250000,
    categoria: "Instrumentos",
    stock: 1,
    imagen_url: "https://ejemplo.com/guitarra.jpg"
  },
  {
    id: 2,
    usuario_id: 2,
    nombre: "Teclado musical",
    descripcion: "Teclado musical de 61 teclas.",
    precio: 180000,
    categoria: "Instrumentos",
    stock: 2,
    imagen_url: "https://ejemplo.com/teclado.jpg"
  },
  {
    id: 3,
    usuario_id: 1,
    nombre: "Consola de sonido",
    descripcion: "Consola de sonido en buen estado.",
    precio: 320000,
    categoria: "Equipos de sonido",
    stock: 1,
    imagen_url: "https://ejemplo.com/consola.jpg"
  }
];
