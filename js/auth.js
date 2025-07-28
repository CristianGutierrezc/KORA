// 🔐 Control de visibilidad según sesión activa y rol del usuario
document.addEventListener('DOMContentLoaded', () => {
  const sesion = JSON.parse(localStorage.getItem('sesionActiva'));
  const adminLink = document.getElementById('admin-link');
  const userIcon = document.getElementById('user-icon');

  // Si hay sesión activa...
  if (sesion) {
    //  Mostrar acceso al panel admin si el usuario es administrador
    if (sesion.rol === 'admin' && adminLink) {
      adminLink.style.display = 'inline-block';
    }

    //  Cambiar ícono de usuario a "Cerrar sesión"
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

  } else {
    //  Si no hay sesión, mostrar opción de iniciar sesión/registro
    if (userIcon) {
      userIcon.innerHTML = '<a href="login.html">Iniciar sesión / Registrarse</a>';
    }
  }
});