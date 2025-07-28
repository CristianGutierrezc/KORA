import { obtenerProductos } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor-productos');
  const mensajeVacio = document.getElementById('mensaje-vacio');
  const totalProductos = document.getElementById('total-productos');
  const totalPrecio = document.getElementById('total-precio');
  const inputBusqueda = document.getElementById('busqueda-productos');

  const productos = obtenerProductos();

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