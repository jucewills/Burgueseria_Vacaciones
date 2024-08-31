document.getElementById('vacation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const startDate = document.getElementById('start').value;
    const endDate = document.getElementById('end').value;
    const returnDate = document.getElementById('return').value;
    
    if (startDate && endDate && returnDate) {
        // Mostrar la solicitud y su estado
        const requestSummary = document.getElementById('request-summary');
        requestSummary.innerHTML = `
            <h2>Solicitud Creada</h2>
            <p><strong>Fecha Inicio:</strong> ${startDate}</p>
            <p><strong>Fecha Fin:</strong> ${endDate}</p>
            <p><strong>Fecha Regreso:</strong> ${returnDate}</p>
            <p><strong>Estado:</strong> Creada</p>
        `;

        // Simulación de cambio de estado (esto debe ser manejado por el backend en un entorno real)
        setTimeout(() => {
            requestSummary.innerHTML = requestSummary.innerHTML.replace('Creada', 'Pendiente');
        }, 3000); // Cambia el estado a 'Pendiente' después de 3 segundos
    } else {
        alert('Por favor, selecciona un rango de fechas válido.');
    }
});
