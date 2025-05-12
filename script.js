
// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa los iconos de Feather
    feather.replace();
    
    // Fecha actual para el pie de página
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Menú móvil
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Cambia el icono del botón
      const icon = menuToggle.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('data-feather', 'x');
      } else {
        icon.setAttribute('data-feather', 'menu');
      }
      feather.replace();
    });
    
    // Cierra el menú móvil al hacer clic en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        menuToggle.querySelector('i').setAttribute('data-feather', 'menu');
        feather.replace();
      });
    });
    
    // Simulación de carga del mapa
    setTimeout(function() {
      const mapPlaceholder = document.getElementById('mapPlaceholder');
      const map = document.getElementById('map');
      
      if (mapPlaceholder && map) {
        mapPlaceholder.style.display = 'none';
        map.classList.add('active');
      }
    }, 1500);
    
    // Generación de tarjetas de conductores
    const drivers = [
      {
        id: "1",
        name: "José Pérez",
        rating: 4.8,
        trips: 358,
        waitTime: "3 min",
        imageUrl: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3",
        distance: "0.8 km",
        price: "RD$80",
        vehicleType: "Honda CG 150"
      },
      {
        id: "2",
        name: "Miguel Rodríguez",
        rating: 4.5,
        trips: 215,
        waitTime: "5 min",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
        distance: "1.2 km",
        price: "RD$100",
        vehicleType: "Yamaha FZ 150"
      },
      {
        id: "3",
        name: "Carlos Díaz",
        rating: 4.9,
        trips: 542,
        waitTime: "4 min",
        imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3",
        distance: "0.5 km",
        price: "RD$60",
        vehicleType: "Bajaj Pulsar 180"
      }
    ];
    
    const driversGrid = document.getElementById('driversGrid');
    
    if (driversGrid) {
      drivers.forEach(driver => {
        const driverCard = document.createElement('div');
        driverCard.className = 'driver-card';
        driverCard.innerHTML = `
          <div class="driver-header">
            <img src="${driver.imageUrl}" alt="${driver.name}" class="driver-image">
            <div class="driver-rating">
              <i data-feather="star"></i>
              <span>${driver.rating.toFixed(1)}</span>
              <span class="mx-2">•</span>
              <span>${driver.trips} viajes</span>
            </div>
          </div>
          <div class="driver-content">
            <div class="driver-name-time">
              <h3 class="driver-name">${driver.name}</h3>
              <div class="driver-time">
                <i data-feather="clock"></i>
                <span>${driver.waitTime}</span>
              </div>
            </div>
            <div class="driver-info">
              <span class="driver-vehicle">${driver.vehicleType}</span>
              <span>${driver.distance} - Aprox. ${driver.price}</span>
            </div>
            <div class="driver-recommend">
              <i data-feather="thumbs-up"></i>
              <span>Recomendado por usuarios cercanos</span>
            </div>
          </div>
          <div class="driver-footer">
            <button class="btn btn-primary btn-full">Solicitar Viaje</button>
            <button class="btn btn-outline btn-full">
              <i data-feather="phone"></i>
              Contactar
            </button>
          </div>
        `;
        
        driversGrid.appendChild(driverCard);
      });
      
      // Reemplaza los iconos después de agregar las tarjetas
      feather.replace();
    }
    
    // Calculadora de rutas
    const calculateBtn = document.getElementById('calculateBtn');
    const routeResults = document.getElementById('routeResults');
    const startLocationInput = document.getElementById('startLocation');
    const endLocationInput = document.getElementById('endLocation');
    const resetRouteBtn = document.getElementById('resetRouteBtn');
    
    if (calculateBtn && routeResults) {
      calculateBtn.addEventListener('click', function() {
        if (!startLocationInput.value || !endLocationInput.value) {
          alert('Por favor ingresa los puntos de origen y destino');
          return;
        }
        
        // Simulación de cálculo
        calculateBtn.textContent = 'Calculando...';
        
        setTimeout(function() {
          routeResults.classList.add('active');
          calculateBtn.textContent = 'Calcular Ruta';
        }, 1500);
      });
      
      if (resetRouteBtn) {
        resetRouteBtn.addEventListener('click', function() {
          startLocationInput.value = '';
          endLocationInput.value = '';
          routeResults.classList.remove('active');
        });
      }
    }
    
    // Sistema de calificación con estrellas
    const starButtons = document.querySelectorAll('.star-btn');
    const ratingMessage = document.getElementById('ratingMessage');
    const commentBtn = document.getElementById('commentBtn');
    const commentForm = document.getElementById('commentForm');
    
    // Función para verificar si el usuario ha iniciado sesión para mostrar el formulario de reseñas
    function checkUserLogin() {
      // Verificar si existe un token en localStorage
      const userToken = localStorage.getItem('token');
      const reviewForm = document.querySelector('.review-form-container');
      
      if (reviewForm) {
        console.log("Formulario encontrado, verificando token:", userToken ? "Existe token" : "No hay token");
        
        if (!userToken) {
          // Si no hay token, ocultar el formulario
          reviewForm.style.display = 'none'; // Cambiado de classList.add('hidden') a style.display
          
          // Mostrar mensaje para iniciar sesión
          const reviewsContainer = document.querySelector('.reviews-container');
          if (reviewsContainer) {
            // Verificar si el mensaje ya existe para evitar duplicados
            if (!document.querySelector('.login-message')) {
              const loginMessage = document.createElement('div');
              loginMessage.className = 'login-message';
              loginMessage.innerHTML = `
                <p>Para dejar una reseña, por favor <a href="login.html">inicia sesión</a> o <a href="registro.html">regístrate</a>.</p>
              `;
              
              // Insertar el mensaje antes del contenedor de reseñas
              reviewsContainer.parentNode.insertBefore(loginMessage, reviewsContainer);
            }
          }
        } else {
          // Si hay token, asegurarse de que el formulario sea visible
          reviewForm.style.display = 'block'; // Cambiado de classList.remove('hidden') a style.display
          
          // Eliminar el mensaje de login si existe
          const loginMessage = document.querySelector('.login-message');
          if (loginMessage) {
            loginMessage.remove();
          }
        }
      } else {
        console.log("No se encontró el formulario de reseñas en esta página");
      }
    }
    
    // Ejecutar la verificación de login cuando el DOM esté completamente cargado
    checkUserLogin();
    
    if (starButtons.length > 0 && ratingMessage) {
      let selectedRating = 0;
      
      starButtons.forEach((button, index) => {
        // Maneja el hover
        button.addEventListener('mouseenter', function() {
          for (let i = 0; i <= index; i++) {
            starButtons[i].classList.add('active');
          }
        });
        
        button.addEventListener('mouseleave', function() {
          starButtons.forEach(btn => {
            if (!btn.dataset.active) {
              btn.classList.remove('active');
            }
          });
        });
        
        // Maneja el clic
        button.addEventListener('click', function() {
          // Limpia selecciones anteriores
          starButtons.forEach(btn => {
            btn.classList.remove('active');
            delete btn.dataset.active;
          });
          
          // Activa las estrellas hasta la seleccionada
          for (let i = 0; i <= index; i++) {
            starButtons[i].classList.add('active');
            starButtons[i].dataset.active = true;
          }
          
          // Guarda la calificación seleccionada
          selectedRating = index + 1;
          
          // Actualiza el mensaje
          ratingMessage.textContent = `Has calificado con ${selectedRating} ${selectedRating === 1 ? 'estrella' : 'estrellas'}`;
          
          // Si existe el botón de comentario, lo habilitamos
          if (commentBtn) {
            commentBtn.disabled = false;
          }
        });
      });
      
      // Manejo del botón de comentario
      if (commentBtn && commentForm) {
        commentBtn.addEventListener('click', function() {
          commentForm.style.display = 'block';
          document.getElementById('ratingValue').value = selectedRating;
        });
        
        // Manejo del envío del formulario
        commentForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Verificar si el usuario ha iniciado sesión
          const userToken = localStorage.getItem('token');
          const userId = localStorage.getItem('userId'); // Obtener el ID del usuario
          
          if (!userToken) {
            alert('Debes iniciar sesión para enviar una calificación');
            window.location.href = 'login.html';
            return;
          }
          
          if (selectedRating === 0) {
            alert('Por favor, selecciona una calificación antes de enviar.');
            return;
          }
          
          const formData = new FormData(commentForm);
          formData.append('userId', userId); // Añadir el ID del usuario al formulario
          
          // Mostrar indicador de carga
          const submitBtn = commentForm.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Enviando...';
          submitBtn.disabled = true;
          
          // Enviar datos al servidor PHP
          fetch('enviar-calificacion.php', {
            method: 'POST',
            body: formData
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error en el servidor');
            }
            return response.text();
          })
          .then(data => {
            alert('¡Gracias por tu calificación! Tu opinión es muy importante para nosotros.');
            commentForm.reset();
            commentForm.style.display = 'none';
            
            // Opcional: redirigir al usuario
            window.location.href = 'index.html';
          })
          .catch(error => {
            alert('Hubo un error al enviar la calificación: ' + error.message);
          })
          .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          });
        });
      }
    }
    
    // Simulación de búsqueda de ubicación
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('locationInput');
    
    if (searchBtn && locationInput) {
      searchBtn.addEventListener('click', function() {
        if (!locationInput.value) {
          alert('Por favor ingresa una dirección válida');
          return;
        }
        
        alert(`Buscando motoristas cerca de ${locationInput.value}...`);
      });
    }
  });