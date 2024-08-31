document.getElementById('vacation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const startDate = new Date(document.getElementById('start').value);
    const endDate = new Date(document.getElementById('end').value);
    const returnDate = document.getElementById('return').value;
    
    if (startDate && endDate && returnDate) {
        if (endDate >= startDate) {
            // Mostrar la solicitud y su estado
            const requestSummary = document.getElementById('request-summary');
            requestSummary.innerHTML = `
                <h2>Solicitud Creada</h2>
                <p><strong>Fecha Inicio:</strong> ${startDate.toISOString().split('T')[0]}</p>
                <p><strong>Fecha Fin:</strong> ${endDate.toISOString().split('T')[0]}</p>
                <p><strong>Fecha Regreso:</strong> ${returnDate}</p>
                <p><strong>Estado:</strong> Creada</p>
            `;

            // Simulación de cambio de estado (esto debe ser manejado por el backend en un entorno real)
            setTimeout(() => {
                requestSummary.innerHTML = requestSummary.innerHTML.replace('Creada', 'Pendiente');
            }, 3000); // Cambia el estado a 'Pendiente' después de 5 segundos
        } else {
            alert('La fecha de fin debe ser posterior a la fecha de inicio.');
        }
    } else {
        alert('Por favor, selecciona un rango de fechas válido.');
    }
});
