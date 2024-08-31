// Verifica si hay un token de sesión almacenado en localStorage
function checkAuth() {
    if (!localStorage.getItem('authToken')) {
        // Si no hay token, redirige a la página de inicio de sesión
        window.location.href = '/HTML/login.html';
    }
}

// Ejecuta la función de verificación cuando la página se carga
document.addEventListener('DOMContentLoaded', checkAuth);
