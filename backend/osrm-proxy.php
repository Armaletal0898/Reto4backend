<?php
header('Access-Control-Allow-Origin: *'); 
header('X-Content-Type-Options: nosniff'); 

if (!isset($_GET['start']) || !isset($_GET['end'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing parameters']);
    exit;
}

$start = $_GET['start'];
$end = $_GET['end'];

$url = "https://router.project-osrm.org/route/v1/driving/$start;$end?geometries=geojson&steps=true";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
$curl_error = curl_error($ch);
curl_close($ch);

header('Content-Type: application/json');
if ($response === false) {
    echo json_encode([
        'error' => 'Error al conectar con OSRM',
        'details' => $curl_error
    ]);
    exit;
}
echo $response;