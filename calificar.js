// Función para enviar la calificación por correo electrónico
const submitRating = (rating, comment = '') => {
  // Crear un objeto FormData para enviar los datos
  const formData = new FormData();
  formData.append('rating', rating);
  formData.append('comment', comment);
  
  // Enviar los datos al script PHP
  fetch('enviar-calificacion.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      alert('¡Gracias por tu calificación! Tu opinión es muy importante para nosotros.');
      // Opcional: redirigir al usuario
      window.location.href = 'index.html';
    } else {
      throw new Error('Error al procesar la calificación');
    }
  })
  .catch(error => {
    // Manejar errores
    alert('Hubo un error al enviar la calificación: ' + error.message);
  });
};

// Inicializar variables para el sistema de calificación
let currentRating = 0;
const stars = document.querySelectorAll('.star');
const commentBtn = document.getElementById('commentBtn');
const commentSection = document.getElementById('commentSection');
const ratingForm = document.getElementById('ratingForm');

// Manejar clics en las estrellas
stars.forEach(star => {
  star.addEventListener('click', () => {
    currentRating = parseInt(star.getAttribute('data-value'));
    document.getElementById('ratingValue').value = currentRating;
    
    // Actualizar visualización de estrellas
    stars.forEach(s => {
      const sValue = parseInt(s.getAttribute('data-value'));
      if (sValue <= currentRating) {
        s.classList.remove('far');
        s.classList.add('fas');
      } else {
        s.classList.remove('fas');
        s.classList.add('far');
      }
    });
  });
});

// Mostrar sección de comentarios
if (commentBtn) {
  commentBtn.addEventListener('click', () => {
    commentSection.style.display = 'block';
  });
}

// Manejar envío del formulario
if (ratingForm) {
  ratingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (currentRating === 0) {
      alert('Por favor, selecciona una calificación de estrellas antes de enviar.');
      return;
    }
    
    const comment = document.getElementById('commentText').value;
    submitRating(currentRating, comment);
  });
}
  