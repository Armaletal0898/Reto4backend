// Configurar la URL base de la API
const API_URL = 'https://triumphant-insight-motoconcho.up.railway.app';

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Guardar token en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('nombre', data.nombre);
      
      // Redirigir a la página principal
      window.location.href = 'index.html';
    } else {
      alert(data.error || 'Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión al servidor');
  }
});