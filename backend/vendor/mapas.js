// Configurar la URL base de la API
const API_URL = 'https://triumphant-insight-motoconcho.up.railway.app';


// Actualizar todas las llamadas fetch para usar API_URL
function actualizarUbicacion(driverId, latitude, longitude) {
  fetch(`${API_URL}/update-location`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ driverId, latitude, longitude })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}

function obtenerUbicaciones() {
  fetch(`${API_URL}/get-all-locations`)
    .then(response => response.json())
    .then(data => {
      // Procesar datos de ubicación
      // ... código existente ...
    })
    .catch(error => console.error('Error:', error));
}

// ... resto del código ...