fetch('login.php', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(response => {
  if (response.success) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('userId', response.userId); // Guardar el ID del usuario
    window.location.href = "index.html";
  } else {
    // Manejar error de login
    alert('Usuario o contraseña incorrectos');
  }
});