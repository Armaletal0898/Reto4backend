<?php
header("Access-Control-Allow-Origin: https://motoruta.netlify.app");
header("Access-Control-Allow-Origin: https://triumphant-insight-motoconcho.up.railway.app");

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
?>

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Si usas Composer:
require 'vendor/autoload.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['name']);
    $correo = htmlspecialchars($_POST['email']);
    $asunto = htmlspecialchars($_POST['subject']);
    $mensaje = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP para Gmail
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'techpulse934@gmail.com'; // Tu correo de Gmail
        $mail->Password = 'egyu ytax cowe hqfq'; // Tu contraseña de aplicación de Gmail
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Remitente y destinatario
        $mail->setFrom('techpulse934@gmail.com', 'MotoRuta Web'); // El remitente debe ser tu cuenta de Gmail
        $mail->addReplyTo($correo, $nombre); // Para poder responder al usuario
        $mail->addAddress('josevillar406@gmail.com'); // El correo donde quieres recibir los mensajes

        // Contenido
        $mail->isHTML(false);
        $mail->Subject = "Nuevo mensaje de contacto: $asunto";
        $mail->Body    = "Nombre: $nombre\nCorreo: $correo\nAsunto: $asunto\nMensaje:\n$mensaje";

        $mail->send();
        echo "<script>alert('Mensaje enviado correctamente.');window.location.href='contacto.html';</script>";
    } catch (Exception $e) {
        echo "<script>alert('Error al enviar el mensaje: {$mail->ErrorInfo}');window.location.href='contacto.html';</script>";
    }
} else {
    header("Location: contacto.html");
    exit();
}
?>