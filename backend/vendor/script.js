// Configurar la URL base de la API
const API_URL = 'https://triumphant-insight-motoconcho.up.railway.app';

// Actualizar todas las llamadas fetch para usar API_URL
function verificarToken() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    window.location.href = 'login.html';
    return;
  }
  
  fetch(`${API_URL}/api/verificar-token`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  });
}

// ... resto del código ...