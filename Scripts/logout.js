document.getElementById('logoutButton').addEventListener('click', function() {
    // Elimina el token de localStorage
    localStorage.removeItem('authToken');

    // Redirige a la página de inicio de sesión
    window.location.href = '/HTML/login.html';
});
