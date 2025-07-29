import { obtenerProductos } from './storage.js';
function cargarEjemploSiNoHayProductos() {
  const productos = JSON.parse(localStorage.getItem("productos"));
  if (!productos || productos.length === 0) {
    const ejemplo = [
      {
        id: crypto.randomUUID(),
        nombre: 'Chaqueta Matrix',
        descripcion: 'Chaqueta oversize con cuello',
        precio: 129.99,
        imagen: 'img/producto3.png'
      },
      {
        id: crypto.randomUUID(),
        nombre: 'Zapatillas Null',
        descripcion: 'Diseño unisex',
        precio: 159.99,
        imagen: 'img/producto4.png'
      }
    ];
    localStorage.setItem("productos", JSON.stringify(ejemplo));
  }
}
document.addEventListener('DOMContentLoaded', () => {
  cargarEjemploSiNoHayProductos(); // 👈 Cargar ejemplos si está vacío

  const contenedor = document.getElementById('contenedor-productos');
  const mensajeVacio = document.getElementById('mensaje-vacio');
  const totalProductos = document.getElementById('total-productos');
  const totalPrecio = document.getElementById('total-precio');
  const inputBusqueda = document.getElementById('busqueda-productos');

  const productos = obtenerProductos(); // 👈 Esto debe ir después de cargar los ejemplos

  // ... resto del código igual ...


  // Renderizado de productos filtrados
  function renderProductos(lista) {
    contenedor.innerHTML = '';

    if (lista.length === 0) {
      mensajeVacio.style.display = 'block';
    } else {
      mensajeVacio.style.display = 'none';

      lista.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img"/>
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <span class="precio">${producto.precio} €</span>
          <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
        `;
        contenedor.appendChild(card);
      });
    }

    totalProductos.textContent = lista.length;
    const total = lista.reduce((acc, p) => acc + (parseFloat(p.precio) || 0), 0);
    totalPrecio.textContent = total.toFixed(2) + ' €';
  }

  //  Filtrar productos al escribir
  inputBusqueda.addEventListener('input', () => {
    const texto = inputBusqueda.value.toLowerCase();
    const filtrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto)
    );
    renderProductos(filtrados);
  });

  // Carga inicial
  renderProductos(productos);
});