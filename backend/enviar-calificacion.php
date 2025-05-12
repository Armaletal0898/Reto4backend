<?php
header("Access-Control-Allow-Origin: https://motoruta.netlify.app");
header("Access-Control-Allow-Origin: https://triumphant-insight-motoconcho.up.railway.app");

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
?>

<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuración de la base de datos
$servername = "mysql-oy64.railway.internal"; // El servidor donde está alojada la base de datos 
$username = "root";        // El nombre de usuario de MySQL 
$password = "toHDqZyAJGGMrXlxYpNGrwNBjiatyTcY";    // La contraseña de MySQL 
$dbname = "railway";    // El nombre de la base de datos
$port = 44894;    // El puerto de MySQL
// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname ,$port) ;

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $rating = isset($_POST['rating']) ? intval($_POST['rating']) : 0;
    $comment = isset($_POST['comment']) ? $_POST['comment'] : '';
    $recommend = isset($_POST['recommend']) ? intval($_POST['recommend']) : 1;
  
    // Validar datos - asegurarnos que el rating sea un número entre 1 y 5
    if (empty($rating) || !is_numeric($rating) || $rating < 1 || $rating > 5) {
        echo "<script>alert('Por favor, selecciona una calificación válida (1-5 estrellas).');window.location.href='calificar.html';</script>";
        exit;
    }

    // Escapar el comentario para evitar problemas de seguridad
    $comment_safe = $conn->real_escape_string($comment);

    try {
        // Preparar y ejecutar la consulta SQL
        $sql = "INSERT INTO calificaciones (estrellas, comentario, fecha) VALUES (?, ?, NOW())";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            throw new Exception("Error en la preparación de la consulta.");
        }

        $stmt->bind_param("is", $rating, $comment);

        if ($stmt->execute()) {
            // Redirigir a la página principal con un mensaje de éxito
            echo "<script>
                alert('¡Gracias por tu calificación! Tu opinión es muy importante para nosotros.');
                window.location.href='calificar.html?success=1';
            </script>";
        } else {
            // Mensaje genérico para el usuario
            echo "<script>
                alert('Ocurrió un error al guardar tu calificación. Intenta nuevamente.');
                window.location.href='calificar.html';
            </script>";
        }

        $stmt->close();
    } catch (Exception $e) {
        // Mensaje genérico para el usuario
        echo "<script>
            alert('Ocurrió un error al guardar tu calificación. Intenta nuevamente.');
            window.location.href='calificar.html';
        </script>";
    }
} else {
    header("Location: calificar.html");
    exit();
}

$conn->close();
?>

