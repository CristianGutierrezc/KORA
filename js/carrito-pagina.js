import { obtenerCarrito, guardarCarrito } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('carrito-contenido');
  const totalFinal = document.getElementById('total-final');

  let carrito = obtenerCarrito();

  function renderCarrito() {
    contenedor.innerHTML = '';

    if (carrito.length === 0) {
      contenedor.innerHTML = '<p style="text-align:center;">Tu carrito está vacío.</p>';
      totalFinal.textContent = '0 €';
      return;
    }

    carrito.forEach(p => {
      const div = document.createElement('div');
      div.className = 'producto-card';
      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" class="producto-img"/>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p>Precio unidad: ${p.precio} €</p>
        <p>Cantidad: ${p.cantidad}</p>
        <p>Subtotal: ${(p.precio * p.cantidad).toFixed(2)} €</p>
        <button class="btn-eliminar" data-id="${p.id}">Eliminar</button>
      `;
      contenedor.appendChild(div);
    });

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    totalFinal.textContent = total.toFixed(2) + ' €';
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
      const id = e.target.dataset.id;
      carrito = carrito.filter(p => p.id !== id);
      guardarCarrito(carrito);
      renderCarrito();
    }
  });

  renderCarrito();
});
