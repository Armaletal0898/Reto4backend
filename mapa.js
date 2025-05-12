feather.replace();

const map = L.map('map').setView([18.4861, -69.9312], 12); // Santo Domingo

const boundsCristoRey = L.latLngBounds(
  [18.4936, -69.9322],  // Suroeste aproximado del polígono
  [18.5078, -69.9149]   // Noreste aproximado del polígono
);
map.setMaxBounds(boundsCristoRey);
map.fitBounds(boundsCristoRey);
map.setZoom(15);

const cristoReyPolygon = L.polygon([
  [18.5056771, -69.9156817],
  [18.5078238, -69.9189003],
  [18.5057076, -69.922591],
  [18.5075186, -69.9275263],
  [18.5055651, -69.9321826],
  [18.5036728, -69.9299081],
  [18.5030623, -69.9322899],
  [18.4972222, -69.9315174],
  [18.4991757, -69.9253591],
  [18.4954315, -69.9250801],
  [18.4954925, -69.9240072],
  [18.4936204, -69.9238785],
  [18.4939968, -69.914995],
  [18.5056771, -69.9156817]
], {
  color: 'red',
  fillOpacity: 0.1
}).addTo(map).bindPopup("Cristo Rey");


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

let puntoInicio = null, puntoDestino = null;
let marcadorInicio = null, marcadorDestino = null;
let lineaRuta = null;

function geocode(direccion, callback) {
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        const latlng = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        callback(latlng);
      } else {
        alert("Dirección no encontrada: " + direccion);
      }
    });
}

document.getElementById('calculateBtn').addEventListener('click', function() {
  const direccionInicio = document.getElementById('startLocation').value;
  const direccionDestino = document.getElementById('endLocation').value;

  if (!direccionInicio || !direccionDestino) {
    alert("Por favor, escriba ambas direcciones.");
    return;
  }

  geocode(direccionInicio, function(latlngInicio) {
    geocode(direccionDestino, function(latlngDestino) {
      if (marcadorInicio) map.removeLayer(marcadorInicio);
      if (marcadorDestino) map.removeLayer(marcadorDestino);
      if (lineaRuta) map.removeLayer(lineaRuta);

      puntoInicio = latlngInicio;
      puntoDestino = latlngDestino;

      marcadorInicio = L.marker(puntoInicio).addTo(map).bindPopup("Punto de Inicio").openPopup();
      marcadorDestino = L.marker(puntoDestino).addTo(map).bindPopup("Punto de Destino").openPopup();

      // Aquí se construye la URL para el proxy PHP
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${puntoInicio.lng},${puntoInicio.lat};${puntoDestino.lng},${puntoDestino.lat}?geometries=geojson&steps=true`;

      fetch(osrmUrl)
        .then(response => response.json())
        .then(data => {
          if (data.routes && data.routes.length > 0) {
            const routeGeoJSON = data.routes[0].geometry;
            lineaRuta = L.geoJSON(routeGeoJSON, { color: 'blue', weight: 4 }).addTo(map);

            const distancia = data.routes[0].legs[0].distance / 1000;
            const tiempo = (data.routes[0].legs[0].duration / 60).toFixed(0);

            document.getElementById('routeDistance').innerText = `${distancia.toFixed(2)} km`;
            document.getElementById('routeTime').innerText = `${tiempo} min`;

            const tarifaBase = 50;
            const costoPorKm = 25;
            const precio = tarifaBase + (costoPorKm * distancia);
            document.getElementById('routePrice').innerText = `RD$${precio.toFixed(2)}`;

            document.getElementById('routeResults').style.display = 'block';
            map.fitBounds(lineaRuta.getBounds());
          }
        });
    });
  });
});

//backen
let driverMarkers = {};

async function mostrarMotoristas() {
  try {
    const res = await fetch('https://triumphant-insight-motoconcho.up.railway.app/get-all-locations');
    const data = await res.json();

    // Eliminar marcadores anteriores
    for (const marker of Object.values(driverMarkers)) {
      map.removeLayer(marker);
    }
    driverMarkers = {};

    // Crear nuevos marcadores
    for (const [id, { latitude, longitude }] of Object.entries(data)) {
      const marker = L.marker([latitude, longitude], {
        icon: L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        })
      }).addTo(map).bindPopup(`Motociclista: ${id}`);
      driverMarkers[id] = marker;
    }

  } catch (err) {
    console.error("Error cargando motoristas:", err);
  }
}

setInterval(mostrarMotoristas, 10000);
mostrarMotoristas();


document.getElementById('resetRouteBtn').addEventListener('click', function() {
  document.getElementById('startLocation').value = '';
  document.getElementById('endLocation').value = '';
  document.getElementById('routeResults').style.display = 'none';

  if (marcadorInicio) map.removeLayer(marcadorInicio);
  if (marcadorDestino) map.removeLayer(marcadorDestino);
  if (lineaRuta) map.removeLayer(lineaRuta);
});
