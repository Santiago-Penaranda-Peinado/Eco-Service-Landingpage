<?php
// Muestra errores para depuración. 
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir las clases de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
// No necesitamos SMTP, así que no incluimos esa clase.

// --- Obtener Datos del Formulario ---
// Usamos htmlspecialchars para prevenir ataques XSS
$nombre   = htmlspecialchars(trim($_POST['nombre'] ?? ''));
$email    = htmlspecialchars(trim($_POST['email'] ?? ''));
$telefono = htmlspecialchars(trim($_POST['telefono'] ?? 'No proporcionado'));
$mensaje  = htmlspecialchars(trim($_POST['mensaje'] ?? ''));

// --- Validación Sencilla ---
if (empty($nombre) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($mensaje)) {
    // Si falla la validación, detenemos el script.
    die('Error: Por favor, complete todos los campos requeridos del formulario.');
}

// --- Construir Cuerpo del Correo ---
$cuerpoCorreo = "
    <h2>Nuevo Contacto desde la Página Web</h2>
    <p><strong>Nombre:</strong> {$nombre}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Teléfono:</strong> {$telefono}</p>
    <hr>
    <p><strong>Mensaje:</strong></p>
    <p>" . nl2br($mensaje) . "</p>
";

// --- Configuración de PHPMailer ---
$mail = new PHPMailer(true);
$correoDestino = 'contacto@ecoservicemexiquense.com.mx';

try {
    // --- Configuración del envío ---
    // ¡No configuramos SMTP! PHPMailer usará la función mail() de PHP por defecto,
    // que a su vez utilizará el sistema de correo del servidor (Plesk).
    
    $mail->CharSet = 'UTF-8';
    
    // Remitente y Destinatario
    $mail->setFrom('no-reply@ecoservicemexiquense.com.mx', 'Formulario Web');
    $mail->addAddress($correoDestino, 'Contacto Eco Service');
    
    // Dirección para que al darle "Responder", se responda al cliente
    $mail->addReplyTo($email, $nombre);

    // Contenido del Correo
    $mail->isHTML(true);
    $mail->Subject = "Nuevo Mensaje de Contacto de: {$nombre}";
    $mail->Body    = $cuerpoCorreo;
    $mail->AltBody = strip_tags($cuerpoCorreo); // Versión de texto plano

    // Enviar el correo
    $mail->send();
    
    header('Location: /gracias.html');
    exit();

} catch (Exception $e) {
    echo "El mensaje no pudo ser enviado. Error de PHPMailer: {$mail->ErrorInfo}";
}

?>