<?php
header("Access-Control-Allow-Origin: https://motoruta.netlify.app");
header("Access-Control-Allow-Origin: https://triumphant-insight-motoconcho.up.railway.app");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
?>

<?php
$conn = new mysqli(
    "mysql-oy64.railway.internal", // host de Railway
    "root",                        // usuario de Railway
    "toHDqZyAJGGMrXlxYpNGrwNBjiatyTcY", // contraseña de Railway
    "railway",                     // nombre de la base de datos en Railway
    44894                          // puerto de Railway
);
if ($conn->connect_error) {
    echo 0;
    exit;
}
$sql = "SELECT COUNT(*) as total FROM calificaciones";
$result = $conn->query($sql);
if ($result && $row = $result->fetch_assoc()) {
    echo $row['total'];
} else {
    echo 0;
}
$conn->close();
?>