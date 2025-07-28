import {
  obtenerCarrito,
  guardarCarrito,
  obtenerProductos
} from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const miniCart = document.getElementById('mini-cart');
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');

  let carrito = obtenerCarrito();

  // Agregar producto al carrito
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
      const id = e.target.dataset.id;
      const productos = obtenerProductos();
      const producto = productos.find(p => p.id === id);

      if (producto) {
        const existente = carrito.find(item => item.id === id);
        if (existente) {
          existente.cantidad += 1;
        } else {
          carrito.push({ ...producto, cantidad: 1 });
        }

        guardarCarrito(carrito);
        renderMiniCarrito();
        actualizarContadorCarrito();
      }
    }
  });

  // Mostrar/ocultar el mini carrito
  cartIcon?.addEventListener('click', () => {
    miniCart?.classList.toggle('visible');
  });

  // Contador visual de productos en el carrito
  function actualizarContadorCarrito() {
    if (!cartCount) return;
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.textContent = total;
  }

  // Mostrar resumen del carrito
  function renderMiniCarrito() {
    miniCart.innerHTML = '<h4>Carrito</h4>';

    if (carrito.length === 0) {
      miniCart.innerHTML += '<p>Tu carrito está vacío.</p>';
      return;
    }

    carrito.forEach(p => {
      miniCart.innerHTML += `
        <div class="item-carrito">
          <span>${p.nombre}</span> x${p.cantidad}
          <span>${(p.precio * p.cantidad).toFixed(2)} €</span>
        </div>
      `;
    });

    const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    miniCart.innerHTML += `<p><strong>Total: ${total.toFixed(2)} €</strong></p>`;
    miniCart.innerHTML += `<a href="carrito.html" class="btn-ver-carrito">Ver carrito completo</a>`;
  }

  renderMiniCarrito();
  actualizarContadorCarrito();
});
