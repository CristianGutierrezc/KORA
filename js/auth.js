// Control de visibilidad según sesión activa y rol del usuario
document.addEventListener('DOMContentLoaded', () => {
  const sesion = JSON.parse(localStorage.getItem('sesionActiva'));
  const adminLink = document.getElementById('admin-link');
  const userIcon = document.getElementById('user-icon');
  const cerrarSesionIcon = document.getElementById('cerrar-sesion-icon'); // Nuevo icono junto al carrito
  const adminLinkMobile = document.getElementById('admin-link-mobile');

  // Si hay sesión activa...
  if (sesion) {
    // Mostrar acceso al panel admin si el usuario es administrador
    if (sesion.rol === 'admin' && adminLink) {
      adminLink.style.display = 'inline-block';
    }
    if (sesion.rol === 'admin' && adminLinkMobile) {
      adminLinkMobile.style.display = 'block';
    }

    // Cambiar ícono de usuario por "Cerrar sesión"
    if (userIcon) {
      userIcon.textContent = 'Cerrar sesión';
      userIcon.style.cursor = 'pointer';
      userIcon.addEventListener('click', () => {
        if (confirm('¿Deseas cerrar sesión?')) {
          localStorage.removeItem('sesionActiva');
          window.location.reload();
        }
      });
    }

    // Mostrar botón de cerrar sesión en móvil (junto al carrito)
    if (cerrarSesionIcon) {
      cerrarSesionIcon.style.display = 'inline-block';
      cerrarSesionIcon.style.cursor = 'pointer';
      cerrarSesionIcon.addEventListener('click', () => {
        if (confirm('¿Deseas cerrar sesión?')) {
          localStorage.removeItem('sesionActiva');
          window.location.reload();
        }
      });
    }

  } else {
    // Si no hay sesión, mostrar botón de login en userIcon
    if (userIcon) {
      userIcon.innerHTML = `
        <a href="login.html" class="btn-login-link">👤 Iniciar sesión</a>
      `;
    }

    // Ocultar icono de cerrar sesión móvil
    if (cerrarSesionIcon) {
      cerrarSesionIcon.style.display = 'none';
    }
  }
});
