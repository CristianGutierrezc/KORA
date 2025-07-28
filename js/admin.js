import {
  obtenerSesion,
  obtenerAdminProductos,
  guardarAdminProductos,
  guardarProductos
} from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Validación de sesión
  const sesion = obtenerSesion();
  if (!sesion || sesion.rol !== 'admin') {
    alert('Acceso denegado. Solo administradores pueden ingresar aquí.');
    window.location.href = 'tienda.html';
    return;
  }

  // DOM elements
  const lista = document.getElementById('lista-admin');
  const form = document.getElementById('form-producto');
  const nombre = document.getElementById('nombre');
  const descripcion = document.getElementById('descripcion');
  const precio = document.getElementById('precio');
  const imagen = document.getElementById('imagen');
  const idField = document.getElementById('producto-id');
  const btnCargar = document.getElementById('cargar-ejemplo');
  const btnVaciar = document.getElementById('vaciar-lista');
  const btnPublicar = document.getElementById('publicar-tienda');

  let adminProductos = obtenerAdminProductos();

  function renderLista() {
    lista.innerHTML = '';
    if (adminProductos.length === 0) {
      lista.innerHTML = '<p style="text-align:center;">No hay productos cargados.</p>';
      return;
    }

    adminProductos.forEach(p => {
      const div = document.createElement('div');
      div.className = 'producto-card';
      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" class="producto-img" />
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p><strong>${p.precio} €</strong></p>
        <button class="editar" data-id="${p.id}">Editar</button>
        <button class="eliminar" data-id="${p.id}">Eliminar</button>
      `;
      lista.appendChild(div);
    });
  }

  // Función reutilizable para validar campos
  function camposValidos(p) {
    if (!p.nombre || !p.descripcion || !p.precio || !p.imagen) {
      alert('Todos los campos son obligatorios.');
      return false;
    }

    if (p.descripcion.length > 150) {
      alert('La descripción no puede superar los 150 caracteres.');
      return false;
    }

    const urlRegex = /\.(jpeg|jpg|png|webp|gif)$/i;
    if (!urlRegex.test(p.imagen)) {
      alert('La URL debe ser válida y apuntar a una imagen.');
      return false;
    }

    const duplicado = adminProductos.some(prod => prod.nombre === p.nombre && prod.id !== p.id);
    if (duplicado) {
      alert('Ya existe un producto con ese nombre.');
      return false;
    }

    return true;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nuevoProducto = {
      id: idField.value || crypto.randomUUID(),
      nombre: nombre.value.trim(),
      descripcion: descripcion.value.trim(),
      precio: parseFloat(precio.value),
      imagen: imagen.value.trim()
    };

    if (!camposValidos(nuevoProducto)) return;

    if (idField.value) {
      // Editar producto existente
      adminProductos = adminProductos.map(p => (p.id === nuevoProducto.id ? nuevoProducto : p));
    } else {
      adminProductos.push(nuevoProducto);
    }

    guardarAdminProductos(adminProductos);
    form.reset();
    renderLista();
  });

  lista.addEventListener('click', e => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('editar')) {
      const p = adminProductos.find(p => p.id === id);
      if (!p) return;
      nombre.value = p.nombre;
      descripcion.value = p.descripcion;
      precio.value = p.precio;
      imagen.value = p.imagen;
      idField.value = p.id;
    }

    if (e.target.classList.contains('eliminar')) {
      if (!confirm('¿Estás seguro de eliminar este producto?')) return;
      adminProductos = adminProductos.filter(p => p.id !== id);
      guardarAdminProductos(adminProductos);
      renderLista();
    }
  });

  btnCargar.addEventListener('click', () => {
    if (adminProductos.length > 0) {
      alert('Ya tienes productos cargados.');
      return;
    }

    adminProductos = [
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
    guardarAdminProductos(adminProductos);
    renderLista();
  });

  btnVaciar.addEventListener('click', () => {
    if (confirm('¿Vaciar todos los productos del panel admin?')) {
      adminProductos = [];
      guardarAdminProductos(adminProductos);
      renderLista();
    }
  });

  btnPublicar.addEventListener('click', () => {
    if (adminProductos.length === 0) {
      alert('No hay productos para publicar.');
      return;
    }

    if (confirm('¿Deseas publicar todos los productos en la tienda?')) {
      guardarProductos(adminProductos);
      alert('Productos publicados en tienda.');
    }
  });

  renderLista();
});