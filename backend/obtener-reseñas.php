<?php
header("Access-Control-Allow-Origin: https://motoruta.netlify.app");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
?>

<?php
$conn = new mysqli(
    "switchyard.proxy.rlwy.net", // host de Railway
    "root",                      // usuario de Railway
    "toHDqZyAJGGMrXlxYpNGrwNBjiatyTcY", // contraseña de Railway
    "railway",                   // nombre de la base de datos
    44894                        // puerto de Railway
);
if ($conn->connect_error) {
    echo "<p>Error de conexión a la base de datos.</p>";
    exit;
}

// Obtener offset y limit de la URL, con valores por defecto
$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 5;

// Contar total de reseñas
$totalResult = $conn->query("SELECT COUNT(*) as total FROM calificaciones");
$totalRow = $totalResult->fetch_assoc();
$total = $totalRow['total'];

// Obtener reseñas con paginación
$sql = "SELECT estrellas, comentario, fecha FROM calificaciones ORDER BY fecha DESC LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo '<div class="review-card">';
        echo '<div class="review-header">';
        echo '<img src="https://via.placeholder.com/50" alt="Usuario" class="user-avatar">';
        echo '<div class="review-user-info">';
        echo '<h4>Usuario Anónimo</h4>';
        echo '</div></div>';
        echo '<div class="review-content">';
        echo '<div class="review-rating">';
        for ($i = 0; $i < 5; $i++) {
            if ($i < $row["estrellas"]) {
                echo '<i class="fas fa-star"></i>';
            } else {
                echo '<i class="far fa-star"></i>';
            }
        }
        echo '</div>';
        echo '<div class="review-text"><p>' . htmlspecialchars($row["comentario"]) . '</p></div>';
        echo '<div class="review-date"><small>' . $row["fecha"] . '</small></div>';
        echo '</div></div>';
    }
    // Mostrar el botón "Ver más reseñas" si hay más reseñas por mostrar
    if ($offset + $limit < $total) {
        echo '<button id="ver-mas-reseñas" class="btn btn-primary" style="display:block;margin:0 auto 2rem auto;">Ver más reseñas</button>';
    }
} else {
    echo "<p>No hay reseñas aún.</p>";
}
$conn->close();
?>