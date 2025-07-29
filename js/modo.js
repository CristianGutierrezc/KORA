// Aplica modo oscuro automáticamente si está activado por cookie
document.addEventListener("DOMContentLoaded", () => {
  if (document.cookie.includes("modo=oscuro")) {
    document.body.classList.add("modo-oscuro");
  }
});
